import 'dotenv/config'
import { drizzle } from "drizzle-orm/libsql";
import { farms } from "../db/schema";
import { Farm } from "../models/farm";
import { sql } from 'drizzle-orm'

const db = drizzle({ 
    connection: { 
      url: process.env.TURSO_DATABASE_URL!, 
      authToken: process.env.TURSO_AUTH_TOKEN!
    }
  });



  export async function createFarm(farmData: Omit<Farm, "id">): Promise<void> {
    await db.insert(farms).values(farmData);
  }

export async function getFarmsByUser(userId: number): Promise<Farm[]> {
    
    return await db.select().from(farms).where(sql`${userId} = ${userId}`).all()
}