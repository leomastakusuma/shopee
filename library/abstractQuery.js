import mysql from "mysql"
import config from "config"
let dbConfig = config.get("dbConfig")
let Connection = mysql.createPool({
	connectionLimit: 10,
	host: process.env.MYSQL,
	user: dbConfig.user,
	dateStrings: true,
	password: dbConfig.pass,
	database: dbConfig.dbName,
	port:dbConfig.port,
	debug: false
})

export default class abstractQuery {
	queryEscape(Query, Params, callback) {
		let Log = Connection.query(Query, Params, function (err, results) {
			let queryLog = config.queryLog
			console.log(queryLog)
			if(queryLog){
				console.log(Log.sql)
			}
			if(err){
				throw new Error(err)
			}
			else{
				callback(results)
			}
		})
	}
	
}


