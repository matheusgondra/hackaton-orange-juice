export interface Encrypter {
	encrypt(value: string): Promise<Encrypter.Result>;
}

export namespace Encrypter {
	export type Result = string;
}
