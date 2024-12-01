import bcrypt from 'bcrypt'

export interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
}

export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password,saltRounds);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}