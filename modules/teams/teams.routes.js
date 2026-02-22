
import express from "express";
import * as teamController from "./teams.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";

const teamsRouter = express.Router();

// ---------- CREATE TEAM ----------
teamsRouter.post("/", authenticate, teamController.createTeam);

// ---------- GET TEAMS BY ORGANIZATION ----------
teamsRouter.get("/organization/:organization_id", authenticate, teamController.getTeamsbyorg);

// ---------- UPDATE TEAM ----------
teamsRouter.put("/", authenticate, teamController.updateTeam);

// ---------- DELETE TEAM ----------
teamsRouter.delete("/:team_id", authenticate, teamController.deleteTeam);

// ---------- ADD TEAM MEMBER ----------
teamsRouter.post("/member", authenticate, teamController.addTeamMember);

// ---------- REMOVE TEAM MEMBER ----------
teamsRouter.delete("/member", authenticate, teamController.DeleteTeamMember);

// ---------- GET TEAM MEMBERS ----------
teamsRouter.get("/:team_id/members", authenticate, teamController.getTeamMembers);

export default teamsRouter;
