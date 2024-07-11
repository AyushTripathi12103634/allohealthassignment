import {Router} from "express";
import { getmealbyIdController, mealController } from "../controllers/mealController.js";

const router = Router();
router.get("/get-meal/:page",mealController);
router.get("/get-meal-id/:id",getmealbyIdController);

export default router;