const router = require('express').Router();
const notepad = require('../db/notepad');

router.get('/notes', (req, res) => {
    notepad
        .getNotes()
        .then((data) => {
        //     console.log(data); //this works
        res.json(data)
        })
        .catch((err) => res.status(500).json(err));
});

router.post('/notes', (req, res) => {
    notepad
        .addNote(req.body)
        .then((note) => res.send(note))
        .catch((err) => res.status(500).json(err));
        console.log("Item added!")
});

router.delete('/notes/:id', (req, res) => {
    notepad
        .delNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch((err) => res.status(500).json(err));
})

module.exports = router;