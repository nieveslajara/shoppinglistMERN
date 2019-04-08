const express = require("express");
const router = express.Router();
const Todo = require('../models/todo');

router.get('/todos', (req, res, next) => {
	// return all data in the database
	// return only the id and action field to the client
	Todo.find({}, 'action').then(data => res.json(data)).catch(next)
});

router.post('/todos', (req, res, next) => {
	if(req.body.action){
		Todo.create(req.body).then(data => res.json(data)).catch(next);
	}
	else{
		res.json({
			error: "The input field is empty"
		});
	}
});

router.delete('/todos/:id', (req, res, next) => {
	Todo.findOneAndDelete({"_id" : req.params.id}).then(data => res.json(data)).catch(next);
});

// module.exports or exports is a special object which is included in every JS file in the Node.js application by default
module.exports = router;