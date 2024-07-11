import mongoose from "mongoose";

const drinkmodel = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
},
    {
        timestamps: true
    }
)

export default mongoose.model("Drink", drinkmodel);