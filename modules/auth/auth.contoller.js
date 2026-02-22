import { createdUser } from "./auth.service.js";
import { loginUser } from "./auth.service.js";
export const register=async(req,res)=>{
    try{
        const user=await createdUser(req.body)
        res.status(201).json(user)
    }
    catch(error){
    console.log(error)
    res.status(500).json({error:"Registration Failed"})
    }
}
export const login=async(req,res)=>{
    try{
        const data=await loginUser(req.body)
        res.status(200).json(data)
    }
    catch(error){
        res.status(401).json({ error: error.message });
    }
}