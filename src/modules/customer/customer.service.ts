import { DataResponse, PaginateDto, PaginateRecord } from "../../common/interfaces"
// import { CreateUserDto, UpdateUserDto } from "./customer.dto"
import { getPaginatedRecords } from "../../common/helpers"
import { Customer } from "../../schemas"

const FetchCustomers = async (query: PaginateDto) => {
	try {
		const { limit, page } = query
		let response: DataResponse
		const paginate: PaginateRecord = {
			model: Customer,
			limit: Number(limit),
			page: Number(page),
			selectedFields: ["-_v"],
		}
		const customers = await getPaginatedRecords(paginate, { specifiedLimit: Number(limit) })
		response = {
			error: false,
			message: "Customers retrieved!",
			data: customers,
		}
		return response
	} catch (error: any) {
		console.log(error)
		const response: DataResponse = {
			error: true,
			message: error.message || "Unable to fetch customers!",
		}
		return response
	}
}

const FetchCustomer = async (id: string) => {
	try {
		let response: DataResponse
		const customer = await Customer.findById(id)
		if (!customer) {
			response = {
				error: true,
				message: "Customer does not exist!",
			}
			return response
		}
		response = {
			error: false,
			message: "Customer found!",
			data: customer,
		}
		return response
	} catch (error: any) {
		console.log(error)
		const response: DataResponse = {
			error: true,
			message: error.message || "Unable to fetch customer!",
		}
		return response
	}
}

export { FetchCustomer, FetchCustomers }
