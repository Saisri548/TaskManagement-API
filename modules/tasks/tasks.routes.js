import { authenticate } from "../../middleware/auth.middleware.js";
import * as teamContollers from "./tasks.controller.js"
import express from "express"
const teamsRouter=express.Router()
teamsRouter.use(authenticate)
teamsRouter.post("/", teamContollers.createTask);

// Get by team
teamsRouter.get("/team/:team_id", teamContollers.getTasksByTeam);

// Get my tasks
teamsRouter.get("/my", teamContollers.getMyTask);

// Update
teamsRouter.patch("/:task_id", teamContollers.updateTask);

// Delete
teamsRouter.delete("/:task_id", teamContollers.deleteTask);
export default teamsRouter