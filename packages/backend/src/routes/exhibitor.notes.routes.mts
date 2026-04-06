import { Router } from "express";
export const exhibitorNotesRouter: Router = Router();
import {
  getNoteByPigId,
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../models/notes.model.mts";

exhibitorNotesRouter.get("/:pigId", async (req, res) => {
  try {
    const note = await getNoteByPigId(req.params.pigId);

    if (note) {
      res.json(note);
    } else {
      res.status(404).json({ message: "Note not found for this pig" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching note", error });
  }
});

exhibitorNotesRouter.get("/", async (req, res) => {
  try {
    const notes = await getAllNotes();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error });
  }
});

exhibitorNotesRouter.post("/", async (req, res) => {
  try {
    const newNote = await createNote(req.body);
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Error creating note", error });
  }
});

exhibitorNotesRouter.put("/:pigId", async (req, res) => {
  try {
    const updatedNote = await updateNote(req.params.pigId, req.body);
    if (updatedNote.modifiedCount > 0) {
      res.json({ message: "Note updated successfully" });
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating note", error });
  }
});

exhibitorNotesRouter.delete("/:pigId", async (req, res) => {
  try {
    const deletedNote = await deleteNote(req.params.pigId);
    if (deletedNote.deletedCount > 0) {
      res.json({ message: "Note deleted successfully" });
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting note", error });
  }
});

export default exhibitorNotesRouter;
