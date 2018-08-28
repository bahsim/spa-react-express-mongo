/*globals module */
/*
    Module to define all the Configurations required
*/
let Config = function () {
	return {
		dbName:	"myDb",
		dbPath: "mongodb://172.16.12.221:27017", 
	};
};

module.exports = new Config();