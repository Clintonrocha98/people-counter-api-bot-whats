import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { mongoConnect, mongoDisconnect } from './database/mongoose/config.js';
import { router } from './api/routes.js';
import client from './automation/whatsappBot.js';

await mongoConnect();

await client.initialize();

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use("/api", router);

const start = () =>
  app
    .listen(Number(process.env.PORT) || 3000)
    .on("listening", () =>
      console.log(
        `Server running on http://localhost:${process.env.PORT || 3000}`
      )
    )
    .on("error", async (err) => {
      await mongoDisconnect();
      process.exit(1);
    });

start();

process.on("SIGINT", async () => {
  console.log("SIGINT signal received: closing MongoDB connection");
  await mongoDisconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM signal received: closing MongoDB connection");
  await mongoDisconnect();
  process.exit(0);
});