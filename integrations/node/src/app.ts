/**
 * app.ts
 * Airwallex Payments Demo. Created by Shirly.Chen
 *
 * This is the main file starting the Express server for the demo.
 */

import express from "express";
//@ts-ignore
import intentRouter from "./controller/intent.ts";
import cors from 'cors';
const app = express();
app.use(express.json());

// Server port.
const port = 3002;
const entryRouter = express.Router();
app.use(cors())
// Define routes.
app.use("/api/v1", entryRouter);
// create or retrieve a paymentIntent 
entryRouter.use("/intent", intentRouter);


// Start the server.
app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
