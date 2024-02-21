import mongoose from "mongoose";

const userCollection = "users"

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    cart: {
        type: {
            cartID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "carts"
            }
        }
    },
    role: {
        type: String,
        default: "user"
    },
    password: {
        type: String,
        required: true
    }
})

export const userModel = mongoose.model(userCollection, userSchema)