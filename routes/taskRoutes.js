import express from "express"
import { deleteTask, getAllTasks, getTask, postTask, updateTask } from "../controllers/taskController.js"

const router = express.Router()

router.get("/", getAllTasks)
router.get("/:id", getTask)
router.post("/", postTask)
router.patch("/:id", updateTask)
router.delete("/:id", deleteTask)

export default router