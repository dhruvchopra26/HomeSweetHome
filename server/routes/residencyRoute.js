import express from "express";
import { createcar, getAllcars, getcar } from "../controllers/resdCntrl.js";
import jwtCheck from "../config/auth0Config.js";
const router = express.Router();

router.post("/create", jwtCheck, createcar)
router.get("/allresd", getAllcars)
router.get("/:id", getcar)
export {router as carRoute}