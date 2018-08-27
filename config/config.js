/*globals module */
/*
    Module to define all the Configurations required
*/
let Config = function () {
	return {
		dbName:	"sample-db",
		dbPath: "mongodb://localhost:27017", 
		//dbPath : "mongodb://bahsim:misha0326@ds261521.mlab.com:61521/statfir", 
	};
};

module.exports = new Config();