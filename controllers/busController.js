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
        
    } catch (error) {
        console.log(error)
    }
}

