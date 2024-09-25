import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Alert from "./Alert"; // Import the Alert component

export default function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/");
      setNotes(res.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    const newNote = { title, content };
    try {
      await axios.post("http://localhost:5000/api/addNotes", newNote);
      setAlertMessage("Note added successfully!");
      setShowAlert(true);
      fetchNotes();
      resetForm();
      hideAlertAfterDelay();
    } catch (error) {
      setAlertMessage("Error adding note.");
      setShowAlert(true);
      hideAlertAfterDelay();
    }
  };

  const handleEditNoteSubmit = async (e) => {
    e.preventDefault();
    const updatedNote = { title, content };
    try {
      if (selectedNote) {
        await axios.put(
          `http://localhost:5000/api/editNotes/${selectedNote._id}`,
          updatedNote
        );
        setAlertMessage("Note updated successfully!");
        setShowAlert(true);
        hideAlertAfterDelay();
      }
      fetchNotes();
      resetForm();
    } catch (error) {
      setAlertMessage("Error updating note.");
      setShowAlert(true);
      hideAlertAfterDelay();
    }
  };

  const handleEditNoteClick = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete/${noteId}`);
      setAlertMessage("Note deleted successfully!");
      setShowAlert(true);
      fetchNotes();
      hideAlertAfterDelay();
      resetForm();
    } catch (error) {
      setAlertMessage("Error deleting note.");
      setShowAlert(true);
      hideAlertAfterDelay();
    }
  };

  const handleCancelEdit = () => {
    resetForm();
    setAlertMessage("Edit canceled.");
    setShowAlert(true);
    hideAlertAfterDelay();
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const hideAlertAfterDelay = () => {
    setTimeout(() => {
      setShowAlert(false);
    }, 5000); // 5000 ms = 5 seconds
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="app-container">
      {showAlert && (
        <Alert message={alertMessage} onClose={() => setShowAlert(false)} />
      )}
      <form
        className="note-form"
        onSubmit={selectedNote ? handleEditNoteSubmit : handleAddNote}
      >
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <div className="form-buttons">
          <button type="submit">{selectedNote ? "Save" : "Add Note"}</button>
          {selectedNote && (
            <button type="button" onClick={handleCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="notes-grid">
        {notes.map((note) => (
          <div
            className="note-item"
            key={note._id}
            onClick={() => handleEditNoteClick(note)}
          >
            <div className="notes-header">
              <button onClick={() => handleDeleteNote(note._id)}>x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
