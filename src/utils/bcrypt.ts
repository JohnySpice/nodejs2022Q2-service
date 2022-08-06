import { hash, compare as bcCompare } from 'bcrypt';


export function createHash(password: string): Promise<string> {
  const saltOrRounds = parseInt(process.env.CRYPT_SALT);
  return hash(password, saltOrRounds);
}

export function compare(password: string, hash: string): Promise<boolean> {
  return bcCompare(password, hash);
}