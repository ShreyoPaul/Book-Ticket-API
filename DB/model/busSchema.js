import mongoose from "mongoose";

export const bus = mongoose.Schema({
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
            type: Boolean,
            required: true
        }
    ]
})

export const busSchema = mongoose.model("buses", bus)