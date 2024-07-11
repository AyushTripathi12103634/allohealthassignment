import mongoose from "mongoose";

const labelmodel = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    label: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true
    }
)

export default mongoose.model("Label", labelmodel);