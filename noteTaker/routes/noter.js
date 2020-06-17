const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const notes = require('../models/notes');

//To view all the notes that are saved 
router.get('/', (req, res, next) => {
    notes.find()
        .select('-__v')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                notes: docs.map(doc => {
                    return {
                        _id: doc._id,
                        Title: doc.Title,
                        Body: doc.Body,
                        Preference: doc.Preference,
                        Created: doc.Created,
                        Updated: doc.Updated
                    }
                })
            }
            console.log(docs);
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err),
                res.status(500).json({ error: err })
        });
});

router.post('/', (req, res, next) => {
    const note = new notes({
        _id: new mongoose.Types.ObjectId,
        Title: req.body.Title,
        Body: req.body.Body,
        Preference: req.body.Preference,
        Created: req.body.Created,
        Updated: req.body.Updated
    })
    note
        .save()
        .then(result => {
            res.status(200).json(result);
            console.log(result);
        })
        .catch(err => 
            {console.log(err),
            res.send(err)});
});

router.patch('/:noteid', (req, res, next) => {
    const id = req.params.noteid
    const updateops = {};
    for (const ops of req.body) {
        updateops[ops.propName] = ops.value;
        ///updateops[ops.Updated] = Date.now();
    }

    notes.updateOne({ _id: id }, {
        $set: updateops,
        Updated: Date.now()
    })
        .exec()
        .then(result => {
            console.log(result);
            var output;
            if (result.n == 0) output = "No entries have been modified because the given id does not match any note in the database";
            if (result.n > 0) output = result.n + " entry(entries) have been modified";
            res.status(200).json({
                message: output,
                link:"https://note-me-api.herokuapp.com/"+id,
                request:"GET"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: "This ID does not exist"
            })
        });
});

router.get('/:noteid', (req, res, next) => {
    const id = req.params.noteid;
    notes.findById(id)
        .select('-__v')
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ Message: "No valid entry found for the given ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "This ID doesn't exist" });
        });
});

router.delete('/:noteid', (req, res, next) => {
    const id = req.params.noteid;
    notes.remove({ _id: id })
        .exec()
        .then(result => {
            var output;
            if (result.n == 0) output = "No entries have been deleted because the entered element does not match any note in the database";
            if (result.n > 0) output = result.n + " entry(entries) have been deleted";
            res.status(200).json({
                message: output
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: "This ID doesn't exist"
            });
        });
});


module.exports = router;
