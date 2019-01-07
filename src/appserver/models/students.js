const bookshelf = require('../bookshelf');

var students = bookshelf.Model.extend({
    tableName: 'resumes'
});

module.exports =  students;