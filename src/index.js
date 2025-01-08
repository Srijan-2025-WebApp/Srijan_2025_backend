import express from "express"
import {connectDB} from "./db/index.js"
import userRouter from "./routes/user.routes.js"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

//middlewares
app.use(express.json())
app.use(cors({origin: '*'}))
app.use(cookieParser());


//routes
app.use('/api/user',userRouter);

app.get('/',async(req,res)=>{
    res.send("HI");
})


const PORT = process.env.PORT || 6500;
app.listen(PORT, async()=>{
    console.log(`Server Running on Port: ${PORT}`);
    await connectDB();
})