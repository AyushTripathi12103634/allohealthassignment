import mongoose from "mongoose";

const usermodel = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }
},
    {
        timestamps: true
    }
)

export default mongoose.model("User", usermodel);