import {
	Ordermodel
} from "../models/Ordermodel"
import abstractController from "../../../../library/abstractController"

export default class Authcontroller extends abstractController {
	constructor(router) {
		super()
		this.router = router
		this.registerRoutes()
	}

	registerRoutes() {
		this.router.post("/orders", this.order.bind(this))
		this.router.get("/orders", this.orderDetail.bind(this))
	}

	/**
	 * @description ORDERS
	 * @param {JSON} req 
	 */
	order(req, res) {
		let validation = []
		let errors = []
		let name = req.body.name  ? req.body.name  : ""
		let taxCode = req.body.tax_code  ? req.body.tax_code  : ""
		let price = req.body.price  ? req.body.price  : ""
		validation.push(this.isStringEmpty (name) == false  ? true : "name is required")
		validation.push(this.isStringEmpty (taxCode)  == false ? true : "tax_code is required")
		validation.push(this.isStringEmpty (price)  == false ? true : "price is required")
		validation.forEach(element => {
			if (element != true) {
				errors.push(element)
			}
		})
		if (errors.length > 0) {
			this.responseValidation(errors, (responseErrors) => {
				res.json(responseErrors)
			})
		} else {
			this.getModelOrder().insertOrders(name,taxCode,price,resultInsert=>{
				if(resultInsert.affectedRows > 0){
					this.responseSuccess("Success Insert Orders",{},response=>{res.json(response)})
				}else{
					this.responseError("Success Insert Orders",response=>{res.json(response)})
				}
			})

		}
	}


	/**
	 * @description ORDERS
	 * @param {JSON} req 
	 */
	orderDetail(req, res) {
		this.getModelOrder().dataOrders(listOrders=>{
			if(listOrders.length > 0){
				let ordersData = []
				let data  ={}
				let tax = 0
				let amount =  0
				let priceSubtotal = 0
				let taxSubtotal = 0
				let grandTotal = 0
				
				listOrders.forEach(element => {
					if(element.tax_code == 1){
						console.log(element.type)
						tax = 0.1 * element.price
					}
					else if(element.tax_code == 2){
						tax = 10 + ((2 /100) * element.price)
					}
					else if(element.tax_code == 3 && element.price >= 100){
						tax = (1 / 100) * (element.price - 100)
					}else{
						tax = 0
					}
					amount = element.price + tax
					data={
						"name": element.name,
						"tax_code": element.tax_code,
						"type": element.type,
						"Refundable": element.Refundable,
						"price": element.price,
						"tax":tax,
						"amount":amount
					}
					ordersData.push(data)
					priceSubtotal += element.price
					taxSubtotal += tax
					grandTotal += amount
				})
				let result ={
					"listOrders" : ordersData,
					"priceSubtotal" : priceSubtotal,
					"taxSubtotal" : taxSubtotal,
					"grandTotal" : grandTotal,
				}
				this.responseSuccess("Success get list orders",result,response=>{res.json(response)})
			}else{
				this.responseError("list order is empty",response=>{res.json(response)})
			}
		})

		
	}

	/**
	 * @description get model order
	 */
	getModelOrder() {
		return new(Ordermodel)
	}
}