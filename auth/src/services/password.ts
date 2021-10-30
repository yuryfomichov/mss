import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

const getScryptBuffer = async (password: string, salt: string) => {
  return (await scryptAsync(password, salt, 64)) as Buffer;
};

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = await getScryptBuffer(password, salt);

    return `${buf.toString('hex')}.${salt}`;
  }
  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = await getScryptBuffer(suppliedPassword, salt);

    return hashedPassword === buf.toString('hex');
  }
}
