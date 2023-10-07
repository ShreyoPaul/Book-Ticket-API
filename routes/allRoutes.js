import express from "express"
import { getAllBuses, postBuses, updateBuses, cancelBus,  getBus} from "../controllers/busController.js"
import { signup, login, addHistory, updateHistory } from "../controllers/authController.js"

const router = express.Router()


//User Authentication routes
router.post("/signup", signup)
router.post("/login", login)
router.post("/history", addHistory)
router.patch("/history", updateHistory)

router.get("/", getAllBuses)
router.get("/:id", getBus)
router.post("/", postBuses)
router.patch("/:id", updateBuses)
router.patch("/cancel/:id", cancelBus)

export default router

// mongodb+srv://shreyopaul403:shreyopaul403@cluster0.uieelqe.mongodb.net/