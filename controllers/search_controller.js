var models = require('../models');
var express = require('express');
var router = express.Router();
var path = require('path');
var sequelize = require('sequelize');
var sequelizeConnection = models.sequelize;


//This is just a testing page with a simple form
router.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/../search_test.html'));
});

//The search terms are passed into this route
router.get('/results', function(req, res) {
	//start value is used for pagination, to offset the SQL query
	var start = req.query.start;

	//The terms they are searching for
	var searchString = req.query.q;
	var separatedSearchWords = searchString.split(' ');

	//mySQL query searching for recipes with name that contains search words
	//SQL_CALC_FOUND_ROWS is to count the total number of rows found because
	//LIMIT prevents getting total rows
	//SELECT FOUND_ROWS() needs to be called after to get row count
	queryString = 'SELECT SQL_CALC_FOUND_ROWS * FROM recipes WHERE ';
	separatedSearchWords.forEach(function(word, index) {
		if (index !== 0) {
			queryString += 'AND ';
		}

		queryString += 'name LIKE "%' + word + '%" ';
	});
	queryString += 'LIMIT 10';
	if (start !== 0) {
		//OFFSET will be used for pagination
		queryString += ' OFFSET ' + start;
	}
	queryString += ';';

	sequelizeConnection.query(queryString, { type: sequelize.QueryTypes.SELECT })
		.then(function(recipes) {
			sequelizeConnection.query('SELECT FOUND_ROWS();', { type: sequelize.QueryTypes.SELECT })
				.then(function(count) {
					console.log('count[0]["FOUND_ROWS()"] IT WORKED', count[0]['FOUND_ROWS()']);
					res.render('results', { arrayOfSearchResults: recipes });
				});
		});

	// var separatedSearchWordsWithPercentsBeforeAndAfter = [];
	// separatedSearchWords.forEach(function(word) {
	// 	separatedSearchWordsWithPercentsBeforeAndAfter.push('%' + word + '%');
	// });
	// console.log(separatedSearchWordsWithPercentsBeforeAndAfter);

	// models.Recipe.findAll({
	// 	attributes: ['id', 'name', 'description', 'image'],
	// 	where: {
	// 		name: {
	// 			$like: separatedSearchWordsWithPercentsBeforeAndAfter
	// 		}
	// 	},
	// 	raw: true,
	// 	limit: 10
	// }).then(function(recipes) {
	// 	console.log(recipes);
	// 	res.render('results', { arrayOfSearchResults: recipes });
	// });
});

router.get('/random', function(req, res) {
	// models.Recipe.findOne({
	// 	order: [
	// 		[sequelize.fn('RAND', '')]
	// 	]
	// })
	// 	.then(function(recipe) {
	// 		console.log(recipe)
	// 	})
	sequelizeConnection.query('SELECT id FROM recipes ORDER BY RAND() LIMIT 1', { type: sequelize.QueryTypes.SELECT })
		.then(function(recipe) {
			console.log(recipe[0].id);
		});
});

module.exports = router;