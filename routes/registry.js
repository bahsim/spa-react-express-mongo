
const ObjectID = require('mongodb').ObjectID
const path = require('path');

let db

module.exports = (app, dbLink) => {
	db = dbLink
  app.get("/", (req, res) => {
		res.sendFile(path.join(__dirname, '..','frontend/user.html'));
  });
	app.post('/registry', (req, res) => {
		getRequestBody(req, (body) => {
			db.collection('registry').save(body, (err, result) => {
				if (err) return console.log(err)
				db.collection('registry').find().toArray((err, result) => {
					if (err) return console.log(err)
					res.json(result)
				})
			})
		})
	})
	app.get('/registry', (req, res) => {
		db.collection('registry').find().toArray((err, result) => {
			if (err) return console.log(err)
			res.json(result)
		})
	})
	app.get('/registry/:record_id', (req, res) => {
		let record = db.collection('registry').findOne({ 
			"_id": ObjectID(req.params.record_id)
		}).then(
			(record) => res.json(record)
		)
	})
	app.put('/registry/:record_id', (req, res) => {
		getRequestBody(req, (body) => {
			const record = body;
			const { name, value1, value2, value3, value4 } = record
			db.collection('registry')
			.findOneAndUpdate({
				_id: ObjectID(req.params.record_id
			)}, {
				$set: { 
					name: 	name, 
					value1: value1, 
					value2: value2, 
					value3: value3, 
					value4: value4 
				}
			}, {
				sort: {_id: -1},
				upsert: true
			}, (err, result) => {
				if (err) return res.send(err)
				db.collection('registry').find().toArray((err, result) => {
					if (err) return console.log(err)
					res.json(result)
				})
			})
		})
	})
	app.delete('/registry/:record_id', (req, res) => {
		db.collection('registry').findOneAndDelete({
			_id: ObjectID(req.params.record_id)
		}, (err, result) => {
			if (err) return res.send(500, err)
			db.collection('registry').find().toArray((err, result) => {
				if (err) return console.log(err)
				res.json(result)
			})
		})
	})
}

function getRequestBody(req, callback) {
	let body = '';
	req.on('data', (data) => {
		body += data;
		if (body.length > 1e6) { 
			req.connection.destroy()
		}
	});
	req.on('end', () => {
		if (isValidJson(body)) {
			return callback(JSON.parse(body))
		} else {
			return '';
		}
	});	
	function isValidJson(json) {
		try {
			JSON.parse(json);
			return true;
		} catch (e) {
			return false;
		}
	}
}

