import mongoose from "mongoose";

export const task = mongoose.Schema({
    task: {
        type: String,
        required: true   
    },
    desc: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    pic: {
        type: String
    }
})

export const taskSchema = mongoose.model("tasks", task)