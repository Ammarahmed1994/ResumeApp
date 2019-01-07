const express = require(`express`);
const router = express();
var knex = require('../bookshelf').bookshelf;

let position = require(`../models/position`);
let student = require(`../models/students`);
let manager = require(`../models/users`);

router.get('knex', (req,res,next) =>{
    knex('postgres')
    .select()
    .where('display', true)
    .then(resume => {
        res.json(resume);
    })
})

router.get('/positions', (req,res,err) => {
    position.fetchAll().then(position => {
        //console.log(position);
        res.json(position);
    })
});


router.get('/students', function (req, res, next) {
    student.fetchAll().then(student => {
        //console.log(student);
        res.json(student)
    });
});

router.get('/managers', function (req, res, next) {
    manager.fetchAll().then(manager => {
      // console.log(manager);
        res.json(manager)
    });
});

console.log('done');

module.exports = router;
