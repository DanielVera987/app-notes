const Note = require('../models/Note');

const notesController = {

  async index(req, res) {
    const notes = await Note.find({user: req.user.id})
      .sort({ date: "desc" })
      .lean();
    res.render('notes/all-notes', {notes});
  },

  create(req, res) {   
    res.render('notes/new-note');
  },

  async store(req, res) {
    const { title, description } = req.body;

    const newNote = new Note({title, description});
    newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg', 'Notes Added Successfully');
    res.redirect('/notes');
  },

  show(req, res) {
    res.send('controller show')
  },

  async edit(req, res) {
    const note = await Note.findById(req.params.id).lean();
    if (note.user != req.user.id) {
      req.flash('error_msg', 'Not Authorized');
      return res.redirect('/notes');
    }
    res.render('notes/edit', { note });
  },

  async update(req, res) {
    const { title, description } = req.body;

    await Note.findByIdAndUpdate(req.params.id, {
      title,
      description
    });
    req.flash('success_msg', 'Notes Updated Successfully');
    res.redirect('/notes');
  },

  async destroy(req, res) {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (note.user != req.user.id) {
      req.flash('error_msg', 'Not Authorized');
      return res.redirect('/notes');
    }
    req.flash('success_msg', 'Notes Deleted Successfully');
    res.redirect('/notes');
  },

}

module.exports = notesController;