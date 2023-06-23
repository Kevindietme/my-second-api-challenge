/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import logger from "firebase-functions/logger";
import express from "express";
import cors from "cors";
import { retrieveAllClothes, addNewClothes, updateNewClothes } from "./src/clothes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => res.send("This is working"));

app.get("/clothes",retrieveAllClothes);
app.post("/clothes", addNewClothes);
app.patch("/clothes/:findNewClothes", updateNewClothes);

export const api = onRequest(app)

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
