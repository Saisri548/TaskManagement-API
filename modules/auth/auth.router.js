import express from "express"
import { register } from "./auth.contoller.js"
import { login } from "./auth.contoller.js"
import { authenticate } from "../../middleware/auth.middleware.js"
const router=express.Router()
router.post("/register",register)
router.post("/login", login);
router.get("/me",authenticate,(req,res)=>{
    res.json({
        message:"Protected Route Accessed",
        user:req.user
    })
})
export default router
//caae7d7f-92af-4287-9ae0-b545c171a89a