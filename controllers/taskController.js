import { taskSchema } from '../DB/model/taskSchema.js'

export const getAllTasks = async (req, res) => {
    try {
        const result = await taskSchema.find()

        if(result) return res.status(201).json({ data: result})
        else return res.status(500).json({ message: "Server error occures!" })
    } catch (error) {
        console.log(error)
    }
}

export const getTask = async (req, res) => {
    try {
        const { id } = req.params

        const result = await taskSchema.find({_id: id})
        console.log(result)
        if(await result[0]) return res.status(201).json({ data: result })
        else return res.status(500).json({ message: "Server error occures!" })
        
    } catch (error) {
        console.log(error)
    }
}

export const postTask = async (req, res) => {

    try {
        const { task, desc, pic, status } = req.body
        console.log("REQ BODY: ",req.body)
        const taskInfo = new taskSchema({
            task, desc, pic, status
        })

        const result = await taskInfo.save()

        if(result) return res.status(201).json({ message: "Task is added!" })
        else return res.status(500).json({ message: "Server error occures!" })
        
    } catch (error) {
        // console.log(error)
    }
}

export const updateTask = async (req, res) => {
    try {
        const { id} = req.params
        const { task, desc, pic, status } = req.body
        console.log("RES BODY PATCH",req.body)
        const result = await taskSchema.updateOne({_id: id},{
            $set: {
                task, desc, pic, status
            }
        })

        if(result.acknowledged) {
            const data = await taskSchema.find({_id: id})
            return res.status(201).json({ data, message: 'Task is updated!'})
        }
        else return res.status(500).json({ message: "Server error occures!" })
    } catch (error) {
        console.log(error)
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { id} = req.params
        
        const result = await taskSchema.deleteOne({_id: id})
        console.log(result)
        if(result) {
            console.log(result)
            return res.status(201).json({  message: 'Task is deleted!'})
        }
        else return res.status(500).json({ message: "Server error occures!" })
    } catch (error) {
        console.log(error)
    }
}