import { Router } from "express";
export const exhibitorNotesRouter: Router = Router();
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from "../models/notes.model.mts";

exhibitorNotesRouter.get("/:id", async (req, res) => {
    try {
        const note = await getNoteById(req.params["id"]);
        if (note) {
            res.json(note);
        } else {            
            res.status(404).json({ message: "Note not found" });
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

exhibitorNotesRouter.post("/id", async (req, res) => {
    try {
        const newNote = await createNote(req.body);
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ message: "Error creating note", error });
    }
});

exhibitorNotesRouter.put("/:id", async (req, res) => {
    try {
        const updatedNote = await updateNote(req.params["id"], req.body);
        if (updatedNote.modifiedCount > 0) {
            res.json({ message: "Note updated successfully" });
            res.redirect(`/pigs/${req.params["id"]}`);
        } else {
            res.status(404).json({ message: "Note not found" });
            res.redirect(`/pigs/${req.params["id"]}`);
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating note", error });
    }
});

exhibitorNotesRouter.delete("/:id", async (req, res) => {
    try {
        const deletedNote = await deleteNote(req.params["id"]);
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