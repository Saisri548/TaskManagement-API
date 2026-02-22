import express from "express"
import { authenticate } from "../../middleware/auth.middleware.js"
import { createOrg,getorg,getorgI,updateOrg,deleteOrg } from "./organizations.controller.js"
const router=express.Router()
router.post("/",authenticate,createOrg)
router.get("/",authenticate,getorg)
router.get("/:id",authenticate,getorgI)
router.patch("/:id",authenticate,updateOrg)
router.delete("/:id",authenticate,deleteOrg)
export default router