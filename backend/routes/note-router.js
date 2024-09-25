import express from "express";

import notes from "../models/notes-model.js";
const route = express.Router();

//get all notes
route.get("/", async (req, res) => {
  try {
    const allNotes = await notes.find({});
    res.status(200).json(allNotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//add notes
route.post("/addNotes", async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    throw new Error({ message: "Please provide all fileds" });
  }
  try {
    const newNote = await notes.create({ title, content });
    res.status(201).json({ message: "Note added successfully", note: newNote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default route;

//delete notes
route.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNote = await notes.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//edit notes
route.put("/editNotes/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res
      .status(400)
      .json({ message: "Please provide title and content." });
  }

  try {
    const updatedNote = await notes.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found." });
    }

    res
      .status(200)
      .json({ message: "Note updated successfully", note: updatedNote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
