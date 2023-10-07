import { usersSchema } from "../DB/model/usersSchema.js"

export const signup = async (req, res) => {
    try {
        const { email } = req.body
        if (await usersSchema.findOne({ email })) return res.status(500).json({ message: "User already exist!" })
        console.log("REQ BODY: ", req.body)
        const userInfo = new usersSchema(req.body)

        const result = await userInfo.save()

        if (result) return res.status(201).json({ message: "User is added!" })
        else return res.status(500).json({ message: "Server error occures!" })
    } catch (error) {
        console.log(error)
    }
}

export const login = async (req, res) => {
    try {
        // const { id, name, pic, status } = req.body


        const result = await usersSchema.find(req.body)
        console.log("RESULT: ", result)

        if (result[0]) return res.status(201).json({ data: result })
        else return res.status(500).json({ message: "Wrong credential!" })
    } catch (error) {
        console.log(error)
    }
}

export const addHistory = async (req, res) => {
    try {
        const { email, password, bus } = req.body
        const user = await usersSchema.findOne({ email, password })
        if (!user) {
            throw new Error('User not found');
        }
        else {
            // console.log(user)
            user.history.push({
                _id: bus._id,
                name: bus.name,
                seats: bus.seats,
                from: bus.from,
                to: bus.to,
                depart_time: bus.depart_time,
                arrival_time: bus.arrival_time,
                seat: bus.seat

            })
        }
        console.log(user)
        const result = await user.save();
        if (result) return res.status(201).json({ message: "User is added!", data: result })
        else return res.status(500).json({ message: "Server error occures!" })
    } catch (error) {
        console.log(error)
    }
}

export const updateHistory = async (req, res) => {
    try {
        const { indexToRemove, email, password } = req.body
        const user = await usersSchema.findOne({ email, password })
        let bus
        if (!user) {
            throw new Error('User not found');
        }
        else {
            // console.log(user)
            const seatArr = user.history[indexToRemove].seat
            const busID = user.history[indexToRemove]._id
            user.history.splice(indexToRemove, 1);
            bus = {
                seat : seatArr,
                busID
            }
        }
        console.log(user)
        const result = await user.save();
        if (result) {
            res.status(201).json({ message: "Ticket cancelled!", data: bus })
            return bus
        }
        else return res.status(500).json({ message: "Server error occures!" })
    } catch (error) {
        console.log(error)
    }
}

