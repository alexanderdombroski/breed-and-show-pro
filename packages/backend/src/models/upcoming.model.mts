import type {
  Event,
  TaskNote,
  Pig,
  BreedingNote,
  HeatNote,
} from "../../../shared/types/schemas.ts";
import { getDb } from "../db/index.mts";

export interface UpcomingDateItem {
  date: string;
  type:
    | "heat"
    | "farrowing"
    | "task"
    | "breed"
    | "weaning"
    | "vaccination"
    | "confirm";
  title: string;
  description?: string;
  pigId?: string;
  litterId?: string;
  isCompleted?: boolean;
}

export async function getAllUpcomingDates(): Promise<UpcomingDateItem[]> {
  const db = await getDb();
  const results: UpcomingDateItem[] = [];
  const now = new Date();

  console.info("📅 Fetching upcoming dates...");

  // Get upcoming tasks from notes collection
  const tasksCollection = db.collection<TaskNote>("notes");
  const tasks = await tasksCollection
    .find({
      _type: "task",
      isCompleted: false,
      dueDate: { $exists: true, $gte: now },
    })
    .toArray();

  console.info(`Found ${tasks.length} upcoming tasks`);

  // Add tasks to results
  tasks.forEach((task) => {
    if (task.dueDate) {
      results.push({
        date: task.dueDate.toISOString(),
        type: "task",
        title: task.title,
        description: task.notes,
        pigId: task.pigId,
        isCompleted: task.isCompleted,
      });
    }
  });

  // Get upcoming events from events collection
  const eventsCollection = db.collection<Event>("events");
  const events = await eventsCollection
    .find({
      date: { $gte: now },
    })
    .toArray();

  console.info(`Found ${events.length} upcoming events`);

  // Add events to results
  events.forEach((event) => {
    const baseItem = {
      date: event.date.toISOString(),
      type: event._type,
      title: event.label || `${event._type} event`,
      description: event.isEstimated ? "Estimated date" : undefined,
    };

    if ("pigId" in event) {
      results.push({
        ...baseItem,
        type: event._type as
          | "heat"
          | "farrowing"
          | "breed"
          | "vaccination"
          | "confirm",
        pigId: event.pigId,
      });
    } else if ("litterId" in event) {
      results.push({
        ...baseItem,
        type: event._type as "weaning",
        litterId: event.litterId,
      });
    }
  });

  // Get pigs and calculate upcoming dates based on status
  const pigsCollection = db.collection<Pig>("pigs");
  const pigs = await pigsCollection
    .find({
      isArchived: false,
      sex: { $in: ["sow", "gilt"] },
    })
    .toArray();

  console.info(`Found ${pigs.length} active sows/gilts`);

  const notesCollection = db.collection<BreedingNote | HeatNote>("notes");

  for (const pig of pigs) {
    // For open sows, estimate next heat date
    if (pig.status === "open") {
      // Find the most recent heat event or note
      const heatEvent = await eventsCollection
        .find({ pigId: pig._id, _type: "heat" })
        .sort({ date: -1 })
        .limit(1)
        .toArray();

      const heatNote = await notesCollection
        .find({ pigId: pig._id, _type: "heat" })
        .sort({ eventDate: -1 })
        .limit(1)
        .toArray();

      let lastHeatDate: Date | null = null;

      if (heatEvent.length > 0 && heatEvent[0] && "date" in heatEvent[0]) {
        lastHeatDate = heatEvent[0].date;
      }
      if (heatNote.length > 0 && heatNote[0] && heatNote[0].eventDate) {
        if (
          !lastHeatDate ||
          heatNote[0].eventDate.getTime() > lastHeatDate.getTime()
        ) {
          lastHeatDate = heatNote[0].eventDate;
        }
      }

      // If we found a heat date, calculate next heat (21-day cycle)
      if (lastHeatDate) {
        const nextHeatDate = new Date(lastHeatDate);
        nextHeatDate.setDate(nextHeatDate.getDate() + 21);

        if (nextHeatDate >= now) {
          results.push({
            date: nextHeatDate.toISOString(),
            type: "heat",
            title: `${pig.name} - Heat Expected`,
            description: `${pig.breed} sow (${pig.earNotch})`,
            pigId: pig._id,
          });
        }
      }
    }

    // For bred sows, calculate confirm date and farrowing date
    if (pig.status === "bred") {
      // Find the most recent breeding event or note
      const breedEvent = await eventsCollection
        .find({ pigId: pig._id, _type: "breed" })
        .sort({ date: -1 })
        .limit(1)
        .toArray();

      const breedNote = await notesCollection
        .find({ pigId: pig._id, _type: "breeding" })
        .sort({ eventDate: -1 })
        .limit(1)
        .toArray();

      let breedDate: Date | null = null;

      if (breedEvent.length > 0 && breedEvent[0] && "date" in breedEvent[0]) {
        breedDate = breedEvent[0].date;
      }
      if (breedNote.length > 0 && breedNote[0] && breedNote[0].eventDate) {
        if (
          !breedDate ||
          breedNote[0].eventDate.getTime() > breedDate.getTime()
        ) {
          breedDate = breedNote[0].eventDate;
        }
      }

      if (breedDate) {
        // Calculate confirm date (21 days after breeding)
        const confirmDate = new Date(breedDate);
        confirmDate.setDate(confirmDate.getDate() + 21);

        if (confirmDate >= now) {
          results.push({
            date: confirmDate.toISOString(),
            type: "confirm",
            title: `${pig.name} - Confirm Breeding`,
            description: `Check if breeding was successful (${pig.breed} ${pig.earNotch})`,
            pigId: pig._id,
          });
        }

        // Calculate expected farrowing date (114 days after breeding)
        // Check if there's already a farrowing event, otherwise calculate
        const farrowEvent = await eventsCollection
          .find({ pigId: pig._id, _type: "farrow" })
          .sort({ date: -1 })
          .limit(1)
          .toArray();

        let farrowDate: Date;
        let isEstimated = true;

        if (
          farrowEvent.length > 0 &&
          farrowEvent[0] &&
          "date" in farrowEvent[0]
        ) {
          farrowDate = farrowEvent[0].date;
          isEstimated = farrowEvent[0].isEstimated ?? false;
        } else {
          // Calculate estimated farrowing date
          farrowDate = new Date(breedDate);
          farrowDate.setDate(farrowDate.getDate() + 114);
        }

        if (farrowDate >= now) {
          // Only add if not already in results from events collection
          const alreadyExists = results.some(
            (r) =>
              r.pigId === pig._id &&
              r.type === "farrowing" &&
              new Date(r.date).getTime() === farrowDate.getTime(),
          );

          if (!alreadyExists) {
            results.push({
              date: farrowDate.toISOString(),
              type: "farrowing",
              title: `${pig.name} - Expected Farrowing`,
              description: isEstimated
                ? `Estimated date (${pig.breed} ${pig.earNotch})`
                : `${pig.breed} sow (${pig.earNotch})`,
              pigId: pig._id,
            });
          }
        }
      }
    }
  }

  // Sort by date (earliest first)
  results.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  console.info(`✅ Returning ${results.length} total upcoming dates`);

  return results;
}
