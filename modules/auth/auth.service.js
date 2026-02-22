import pool from "../../src/config/db.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
export const createdUser= async ({name,email,password,global_role,organization_id})=>{
    const hashedPassword=await bcrypt.hash(password,10)
    const result=await pool.query(`INSERT INTO users(name,email,password,global_role,organization_id) values($1,$2,$3,$4,$5)  RETURNING id, name, email, global_role
    `,[name, email, hashedPassword,global_role,organization_id])

  return result.rows[0]
}
export const loginUser=async({email,password})=>{
    const result=await pool.query("SELECT * FROM users WHERE email=$1",[email])
    if(result.rows.length===0){
        throw new Error("Invalid Email and password")
    }
    const user=result.rows[0]
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error("Invalid email and password")
    }
    const token=jwt.sign(
        {id:user.id,role:user.global_role},
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" }
    )
    return {token}
}