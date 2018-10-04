import chai from "chai"
import chaiHttp from "chai-http"
import server from "../server.js"
chai.should()
chai.use(chaiHttp)

describe("Orders", () => {
	describe("Create Orders", () => {
		it("Post Orders", (done) => {
			chai.request(server)
				.post("/v1/orders")
				.set("Content-Type", "application/json")
				.send({
					name : "Big Mac",
					tax_code : 1,
					price : 1000
				})
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.a("object")
					res.body.should.have.property("status").to.be.true
					res.body.should.have.property("result").to.be.a("Object")
					done()
				})
		})
	})
	describe("GET Orders", () => {
		it("GET Orders", (done) => {
			chai.request(server)
				.get("/v1/orders")
				.set("Content-Type", "application/json")
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.a("object")
					res.body.should.have.property("status").to.be.true
					res.body.should.have.property("result").to.be.a("Object")
					done()
				})
		})
	})
})