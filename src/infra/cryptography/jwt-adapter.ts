import { Decrypter, Encrypter } from "../../data";
import jwt from "jsonwebtoken";

export class JwtAdapter implements Encrypter, Decrypter {
	private readonly secret: string;

	constructor(secret: string) {
		this.secret = secret;
	}

	async encrypt(value: string): Promise<string> {
		return jwt.sign({ id: value }, this.secret);
	}

	async decrypt(cipherText: string): Promise<Decrypter.Result> {
		return jwt.verify(cipherText, this.secret) as any;
	}
}
