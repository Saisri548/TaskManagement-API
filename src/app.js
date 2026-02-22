import express from "express"
import authRoutes from "../modules/auth/auth.router.js"
import orgRoutes from "../modules/organizations/organizations.router.js"
import teamsRouter from "../modules/teams/teams.routes.js";
import tasksRouter from "../modules/tasks/tasks.routes.js"
const app=express()
app.use(express.json())
app.use("/api/auth",authRoutes)
app.use("/api/org",orgRoutes)
app.use("/api/teams", teamsRouter);
app.use("/api/tasks",tasksRouter)
export default app;
 