import Note from "../models/Note.js"

export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({createAt: -1});
        res.status(200).json(notes);
    } catch(error) {
        res.status(500).json({message: "Internal server error"});
    }
}

export async function getNoteById(req, res) {
    try {
        const noteId = await Note.findById(req.params.id);
        res.status(200).json(noteId);
        if (!noteId) {
            return res.status(404).json({message: "Note not found!"});
        }
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
}

export async function createNote(req, res) {
    try {
        const{title, content} = req.body;
        const newNote = new Note({title:title, content: content});

        await newNote.save();
        res.status(201).json({message: "Note created successfully!"});
    } catch(error) {
        res.status(500).json({message: "Internal server error."});
    }
}

export async function updateNote(req, res) {
    try {
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true,});
        if (!updatedNote) {
            return res.status(404).json({message: "Note not found!"});
        }
        res.status(200).json({message: "Note updated successfully!"});
    } catch (error) {
        res.status(500).json({message: "Internal server error."});
    }
}

export async function deleteNote (req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            res.status(404).json({message: "Node not found!"});
        }
        res.status(200).json({message: "Note deleted successfully!"});
    } catch (error) {
        res.status(500).json({message: "Internal server error."});
    }
}