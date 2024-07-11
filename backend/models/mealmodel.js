import mongoose from "mongoose";

const mealmodel = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    starter: {
        type: String,
        required: true,
    },
    desert: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    labels: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Label" }]
    },
    img: {
        type: String,
        required: true,
    },
    drinks: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Drink" }]
    }
},
    {
        timestamps: true
    }
)

export default mongoose.model("Meal", mealmodel);