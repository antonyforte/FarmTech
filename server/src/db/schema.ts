import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users_table", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password")
});

export const farms = sqliteTable("farms_table", {
  id: int("id").primaryKey({ autoIncrement: true }),
  ownerName: text("owner_name").notNull(),
  address: text("address").notNull(),
  size: int("size").notNull(),
  climate: text("climate").notNull(),
  userId: int("userId").notNull().references(() => users.id)

})

