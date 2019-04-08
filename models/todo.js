const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema fot todo list
const TodoSchema = new Schema({
	action: {
		type: String,
		required: [true, 'The todo text field is mandatory']
	}
});

// create model for todo
const Todo = mongoose.model('todo', TodoSchema);

// module.exports or exports is a special object which is included in every JS file in the Node.js application by default
module.exports = Todo;