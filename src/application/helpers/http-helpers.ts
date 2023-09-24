import { UnauthorizedError } from "../errors";
import { HttpResponse } from "../protocols";

export const badRequest = (error: Error): HttpResponse => ({
	statusCode: 400,
	body: error
});

export const unauthorized = (): HttpResponse => ({
	statusCode: 401,
	body: new UnauthorizedError()
});

export const conflict = (): HttpResponse => ({
	statusCode: 409,
	body: new Error("The event already exists")
});

export const serverError = (error: Error): HttpResponse => ({
	statusCode: 500,
	body: error
});

export const success = (data: any): HttpResponse => ({
	statusCode: 200,
	body: data
});

export const created = (data: any): HttpResponse => ({
	statusCode: 201,
	body: data
});
