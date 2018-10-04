import express from "express"
import bodyParser from "body-parser"
import expressValidator from "express-validator"
import helmet from "helmet"
import config from "config"
let app = express()
let apiRouter = express.Router()

app.use(bodyParser.json())
app.use(expressValidator())

app.use(helmet())
function errorHandler(err, req, res, next) {
	res.status(500)
	let Response = {
		"status": "204",
		"message": "error",
		"display_message": "Opps something wrong with your input",
		"data": {}

	}
	res.json(Response)
	next()
}
app.use(errorHandler)


app.use("/v1", apiRouter)
/**
 * @description list controller
 */
import Ordercontroller from "./module/Order/v1/controller/Ordercontroller"


new Ordercontroller(apiRouter)




//Handling Not Found Url
app.use(function (req, res,next) {
	res.status(404)
	let Response = {
		"status": "false",
		"error_message": "Please Check URL",
		"result": {}
	}
	res.json(Response)
	next()
})

var port = config.port
try {
	app.listen(port, "0.0.0.0", function () {
		console.log("listening on *:"+port)
	})
	var env = app.get("env")
	console.log(env)
	console.log("API Start On PORT  " + port)
} catch (e) {
	console.log("Error :\n" + e)
	var port2 = port + 1
	app.listen(port2)
	console.log("API Start On PORT  " + port2)
}