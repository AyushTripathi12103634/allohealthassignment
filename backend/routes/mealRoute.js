import {Router} from "express";
import { getmealbyIdController, mealController } from "../controllers/mealController.js";
import {requireSignIn} from "../middleware/authmiddleware.js";

const router = Router();
router.get("/get-meal/:page",requireSignIn,mealController);
router.get("/get-meal-id/:id",requireSignIn,getmealbyIdController);

export default router;