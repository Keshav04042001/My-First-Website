const express = require('express');
const nameRoutes = express.Router();
const mongoose = require('mongoose');
const notes = require('../models/notes');

nameRoutes.get('/:name', (req, res, next) => {
    const name = req.params.name.toUpperCase();
    notes.find()
        .select('-__v')
        .exec()
        .then(docs => {
            const result = [];
            docs.map(doc => {
                var title = doc.Title.toUpperCase();
                if (title.search(name) > -1) {
                    result.push(
                        {
                            _id: doc._id,
                            Title: doc.Title,
                            Body: doc.Body,
                            Preference: doc.Preference,
                            Created: doc.Created,
                            Updated: doc.Updated
                        }
                    )
                }
            })
            res.status(200).json(result);
        })
        .catch(err => {
            error: err
        })
});

nameRoutes.delete('/:name', (req, res, next) => {
    var name = req.params.name.toUpperCase();
    notes.find()
        .exec()
        .then(docs => {
            var output = 0;
            var length = docs.length;
            docs.map(doc => {
                var name = req.params.name.toUpperCase();
                var title = doc.Title.toUpperCase();
                if (title.search(name) > -1) {
                    notes.remove({ _id: doc._id })
                        .exec()
                        .then(result => {
                            if (result.n > 0) output+=result.n;
                            console.log(result);
                            console.log(output);
                            res.status(200).json(result.n+"Notes have been deleted successfully");
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json(err)
                        })
                }
            })
            length-=docs.length;
            //res.status(200).json({message: "All the notes with this word included in the title have been deleted"+length});
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                message: "The name entered does not correspond to any note in the database.",
                error:err
            })
        })
});

module.exports = nameRoutes;
