import {
	abstractResponse
} from "./abstractResponse"

export default class abstractController extends abstractResponse {
	
	/**
	 * @description Validate Email
	 */
	validateEmail(email){
		let filter  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		let isValid = false
		if(filter.test(email) == true){
			isValid = true
		}
		console.log(filter.test(email))
		return isValid
	}

	/**
	 * @description Validate String Empty
	 */
	isStringEmpty(value){
		return (!value || value == undefined || value == "" || value.length == 0)
	}



}