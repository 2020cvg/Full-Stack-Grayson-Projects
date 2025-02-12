const express = require('express');
const router = express.Router();
const Project = require('./models/project');

router.get('/users', (req, res, next) => {   
    // define an empty query document
    const query = {};
    // sort in descending (-1) order by length
    const sort = { title: 1 };
    Project.find(query).sort(sort).then(projects => {
        if(!projects) {
            res.status(404).json({message: 'No users Found'});
        }
        res.status(200).json(projects);
    }).catch(error => {
        console.log(error);
    });
});

router.get('/users/:tag', (req, res, next) => {
    // sort in descending (-1) order by length
    const sort = { title: 1 };
    if (req.params.tag === "Java" || req.params.tag === "C-Sharp") {
        Project.find({tag:req.params.tag}).sort(sort).then(projects => {
            if(!projects) {
                res.status(404).json({message: 'No users Found'});
            }
            res.status(200).json(projects);
        }).catch(error => {
            console.log(error);
        });
    } else {
        Project.find({ 'content': { '$regex': req.params.tag, '$options': 'i' }}).sort(sort).then(projects => {
            if(!projects) {
                res.status(404).json({message: 'No users Found'});
            }
            res.status(200).json(projects);
        }).catch(error => {
            console.log(error);
        });
    }
});

module.exports = router;



