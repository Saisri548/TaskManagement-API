
import dotenv from "dotenv"
dotenv.config()
import app from "./src/app.js";


const PORT=process.env.port||3000
console.log("ENV TEST:", process.env.JWT_SECRET_KEY);

app.listen(PORT,()=>{
    console.log(`Server is listening ${PORT}`)
})
