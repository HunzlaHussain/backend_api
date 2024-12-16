import { configDotenv } from "dotenv";
import { User } from "../entities/User"; // Adjust path as needed
import { DataSource } from "typeorm";

configDotenv();
console.log(process.env.DATABASE_HOST);
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
  database: process.env.DATABASE_Name,
  username: process.env.DATABASE_USER,
  synchronize: true,
  logging: true,
  entities: [User],
  migrations: [],
  subscribers: [],
});

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database Connection Done");
  } catch (error) {
    console.error("Database Connection Failed:", error);
    process.exit(1); // Exit on failure
  }
};
