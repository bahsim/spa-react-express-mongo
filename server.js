
const express = require('express');
const app = express();
const routes = require("./routes/registry.js");

const port = process.env.PORT || 8080;
const appMode = (process.env.NODE_ENV !== undefined ? process.env.NODE_ENV : 'production')

const MongoClient = require('mongodb').MongoClient
const config = require('./config/config')
const dbPath = process.env.MONGO_URI || config.dbPath
const dbName = process.env.MONGO_DB || config.dbName

let db

if (appMode !== 'production') {
	const webpack = require('webpack')
	const webpackDevMiddleware = require('webpack-dev-middleware')
	const webpackHotMiddleware = require('webpack-hot-middleware')
	const config = require('./webpack.config')
	const compiler = webpack(config);
	app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
	app.use(webpackHotMiddleware(compiler));
}

const bodyParser = require('body-parser');

app.use(bodyParser.json());       
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('frontend/dist'))

MongoClient.connect(dbPath, { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err)
  db = client.db(dbName)
	routes(app, db);
	app.listen(port, (error) => { 
		if (error) { 
			console.error(error) 
		} else {
			console.log("Server started on port", port) 
		}
	});
	//client.close()
})
