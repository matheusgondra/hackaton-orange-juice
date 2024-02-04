import { Decrypter, Encrypter } from "../../data";
import jwt from "jsonwebtoken";

export class JwtAdapter implements Encrypter, Decrypter {
	constructor(private readonly secret: string) {}

	async encrypt(value: string): Promise<string> {
		return jwt.sign({ id: value }, this.secret);
	}

	async decrypt(cipherText: string): Promise<Decrypter.Result> {
		try {
			return jwt.verify(cipherText, this.secret) as any;
		} catch (error) {
			return null;
		}
	}
}
