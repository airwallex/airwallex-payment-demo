/**
 * app.ts
 * Airwallex Payments Demo. Created by Shirly.Chen
 *
 * This is the main file starting the Express server for the demo.
 */

import express from "express";
import intentRouter from "./controller/intent";

const app = express();

// Server port.
const port = 3002;
const entryRouter = express.Router();

// Define routes.
app.use("/apis/v1", entryRouter);
// create or retrieve a paymentIntent 
entryRouter.use("/intent", intentRouter);


// Start the server.
app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
