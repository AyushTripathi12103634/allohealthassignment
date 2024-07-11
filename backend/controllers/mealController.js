import mealmodel from "../models/mealmodel.js";
import drinkmodel from "../models/drinkmodel.js";
import labelmodel from "../models/labelmodel.js";
import { trace } from "mathjs";

export  const mealController = async (req, res) => {
  try {
    const page = parseInt(req.params.page);
    const limit = 3;

    const skip = (page - 1) * limit;

    const meals = await mealmodel.find()
      .skip(skip)
      .limit(limit)
      .populate("labels")
      .populate("drinks");

    res.status(200).json({
      meals,
    });
  } catch (error) {
    res.status(500).json({ 
        success: false,
        message: "Error in meal api", 
        error: error 
    });
  }
};

export const getmealbyIdController = async(req,res) => {
  try {
    const meal = await mealmodel.findById(req.params.id);
    return res.status(200).send({
      success:true,
      message:"Meal fetched successfully",
      meal: meal
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in get meal by id api",
      error: error
    })
  }
}