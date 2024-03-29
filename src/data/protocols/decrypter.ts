export interface Decrypter {
	decrypt(cipherText: string): Promise<Decrypter.Result>;
}

export namespace Decrypter {
	export type Result = {
		id: string;
	} | null;
}
