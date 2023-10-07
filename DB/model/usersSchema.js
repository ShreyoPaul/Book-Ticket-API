import mongoose from "mongoose";

export const user = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    history: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            name: {
                type: String,
                required: true
            },
            seats: {
                type: Number,
                required: true
            },
            from: {
                type: String,
                required: true
            },
            to: {
                type: String,
                required: true
            },
            depart_time: {
                type: String,
                required: true
            }
            ,
            arrival_time: {
                type: String,
                required: true
            },
            seat: [
                {
                    type: Number,
                    required: true
                }
            ]
        }
    ]
})

export const usersSchema = mongoose.model("users", user)