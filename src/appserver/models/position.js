const bookshelf = require('../bookshelf');


var position = bookshelf.Model.extend({
    tableName: 'positions'
});


module.exports =  position;