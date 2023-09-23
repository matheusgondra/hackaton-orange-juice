export interface Authentication {
	auth(credentials: Authentication.Params): Promise<Authentication.Result>;
}

export namespace Authentication {
	export interface Params {
		password: string;
	}
	export type Result = string;
}
