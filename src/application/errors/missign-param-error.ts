export class MissignParamError extends Error {
	constructor(paramName: string) {
		super(`Missing param: ${paramName}`);
		this.name = "MissignParamError";
	}
}
