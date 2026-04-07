import { Router } from "express";
const router: Router = Router();
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../models/events.model.mts";

router.get("/", async (req, res) => {
  try {
    const events = await getAllEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const event = await getEventById(req.params.id);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching event", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const newEvent = await createEvent(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedEvent = await updateEvent(req.params.id, req.body);
    if (updatedEvent.modifiedCount > 0) {
      res.json({ message: "Event updated successfully" });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedEvent = await deleteEvent(req.params.id);
    if (deletedEvent.deletedCount > 0) {
      res.json({ message: "Event deleted successfully" });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
});

export default router;
