import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  DB_URL: string;
}

const loadEnvVariables = (): EnvConfig => {
  const requiredVariables: string[] = ["PORT", "DB_URL"];

  requiredVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error("Missing required environment variable");
    }
  });

  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL!,
  };
};

export const envVars = loadEnvVariables();
