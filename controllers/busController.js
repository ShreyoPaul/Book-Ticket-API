import { busSchema } from '../DB/model/busSchema.js'

export const getAllBuses = async (req, res) => {
    try {
        const result = await busSchema.find()

        if(result) return res.status(201).json({ data: result})
        else return res.status(500).json({ message: "Server error occures!" })
    } catch (error) {
        console.log(error)
    }
}

export const getBus = async (req, res) => {
    try {
        const { id} = req.params
        const result = await busSchema.find({_id: id})

        if(result) return res.status(201).json({ data: result})
        else return res.status(500).json({ message: "Server error occures!" })
    } catch (error) {
        console.log(error)
    }
}

export const postBuses = async (req, res) => {
    try {
        // const { id, name, pic, status } = req.body
        // console.log("REQ BODY: ",req.body)
        const taskInfo = new busSchema(req.body)
        
        const result = await taskInfo.save()
        
        if(result) return res.status(201).json({ message: "Bus is added!" })
        else return res.status(500).json({ message: "Server error occures!" })              
        } catch (error) {
            console.log(error)
        }
}



export const updateBuses = async (req, res) => {
    try {
        const { id} = req.params
        // const { task, desc, pic, status } = req.body
        console.log("RES BODY PATCH",req.body)
        const result = await busSchema.updateOne({_id: id},{
            $set: {
                seat: req.body.seat
            }
        })

        if(result.acknowledged) {
            const data = await busSchema.find({_id: id})
            return res.status(201).json({ data, message: 'Task is updated!'})
        }
        else return res.status(500).json({ message: "Server error occures!" })
    } catch (error) {
        console.log(error)
    }
}

// export const bookBus = async (req, res) => {
//     try {
//         const { id} = req.params
//         // const { task, desc, pic, status } = req.body
//         // console.log("RES BODY PATCH",req.body)
        
//         const result = await busSchema.updateOne({_id: id},{
//             $set: {
//                 [`seat.${req.body.seatIndex}`]: true,
//             }
//         })

//         if(result.acknowledged) {
//             const data = await busSchema.find({_id: id})
//             return res.status(201).json({ data, message: 'Task is updated!'})
//         }
//         else return res.status(500).json({ message: "Server error occures!" })
//     } catch (error) {
//         console.log(error)
//     }
// }

export const cancelBus = async (req, res) => {
    try {
        const { id} = req.params
        const { seat } = req.body
        // console.log("RES BODY PATCH",req.body)
        let result
        seat.forEach( async (element, idx) => {
            result = await busSchema.updateOne({_id: id},{
                $set: {
                    [`seat.${element}`]: false,
                }
            })
        });
        
            const data = await busSchema.find({_id: id})
            return res.status(201).json({ data, message: 'Bus seats updated!'})
        
        // else return res.status(500).json({ message: "Server error occures!" })
    } catch (error) {
        console.log(error)
    }
}

// export const getTask = async (req, res) => {
//     try {
//         const { id } = req.params

//         const result = await taskSchema.find({_id: id})
//         console.log(result)
//         if(await result[0]) return res.status(201).json({ data: result })
//         else return res.status(500).json({ message: "Server error occures!" })
        
//     } catch (error) {
//         console.log(error)
//     }
// }

// export const postTask = async (req, res) => {

//     try {
//         const { task, desc, pic, status } = req.body
//         console.log("REQ BODY: ",req.body)
//         const taskInfo = new taskSchema({
//             task, desc, pic, status
//         })

//         const result = await taskInfo.save()

//         if(result) return res.status(201).json({ message: "Task is added!" })
//         else return res.status(500).json({ message: "Server error occures!" })
        
//     } catch (error) {
//         // console.log(error)
//     }
// }

// export const updateTask = async (req, res) => {
//     try {
//         const { id} = req.params
//         const { task, desc, pic, status } = req.body
//         console.log("RES BODY PATCH",req.body)
//         const result = await taskSchema.updateOne({_id: id},{
//             $set: {
//                 task, desc, pic, status
//             }
//         })

//         if(result.acknowledged) {
//             const data = await taskSchema.find({_id: id})
//             return res.status(201).json({ data, message: 'Task is updated!'})
//         }
//         else return res.status(500).json({ message: "Server error occures!" })
//     } catch (error) {
//         console.log(error)
//     }
// }

// export const deleteTask = async (req, res) => {
//     try {
//         const { id} = req.params
        
//         const result = await taskSchema.deleteOne({_id: id})
//         console.log(result)
//         if(result) {
//             console.log(result)
//             return res.status(201).json({  message: 'Task is deleted!'})
//         }
//         else return res.status(500).json({ message: "Server error occures!" })
//     } catch (error) {
//         console.log(error)
//     }
// }