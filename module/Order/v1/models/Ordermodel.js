import abstractQuery from "../../../../library/abstractQuery"
export class Ordermodel extends abstractQuery {
	constructor() {
		super()
		this.sql = ""
		this.escape = ""
	}
	/**INSERT DATA ORDERS */
	insertOrders(name,taxCode,price,callback){
		this.sql    = "INSERT INTO orders SET name = ? , tax_code = ? , price = ? "
		this.escape = [name,taxCode,price]
		this.queryEscape(this.sql, this.escape, (result) => {
			callback(result)
		})
	}

	/**GET ALL ORDERS */
	dataOrders(callback){
		this.sql    = "SELECT orders.id,orders.name,tax.id as tax_code ,tax.name as type, if(tax_code =1,'YES','NO')as Refundable,orders.price    FROM orders JOIN tax on tax.id = orders.tax_code order by orders.id desc "
		this.escape = []
		this.queryEscape(this.sql, [], (result) => {
			callback(result)
		})
	}
}