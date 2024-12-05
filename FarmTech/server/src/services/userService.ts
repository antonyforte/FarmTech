import 'dotenv/config'
import { drizzle } from 'drizzle-orm/libsql'
import { users } from '../db/schema';
import { User, hashPassword } from '../models/user';
import { password } from 'bun';
import { sql } from 'drizzle-orm'

const db = drizzle({ 
    connection: { 
      url: process.env.TURSO_DATABASE_URL!, 
      authToken: process.env.TURSO_AUTH_TOKEN!
    }
  });

export async function createUser(userData: User) {
    const hashedPassword = await hashPassword(userData.password);
    const userWithHashedPassword = {...userData, password: hashedPassword };

    await db.insert(users).values(userWithHashedPassword);
}

export async function findUserByEmail(email: string): Promise<User | null> {
    const user = await db.select().from(users).where(sql`${users.email} = ${email}`).get();
    return user ? user as User : null;
}