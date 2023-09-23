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

export const serverError = (error: Error): HttpResponse => ({
	statusCode: 500,
	body: error
});
