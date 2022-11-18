/**
 * app.ts
 * Airwallex Payments Demo. Created by Shirly.Chen
 *
 * This is the main file starting the Express server for the demo.
 */

import express from "express";
import cors from 'cors';
import intentRouter from "./controller/intent";

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
}))

// Server port.
const port = 3002;
const entryRouter = express.Router();

// Define routes.
app.use("/api/v1", entryRouter);
// create or retrieve a paymentIntent 
entryRouter.use("/intent", intentRouter);


// Start the server.
app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
