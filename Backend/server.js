// import 'dotenv/config'
// import app from "./app.js";
// import { connectDB } from './config/db.js';

// import { resumeText,selfDescription,jobDescription } from './services/temp.js';
// import  generateInterviewReport  from './services/ai.service.js';
// connectDB()

// generateInterviewReport({resumeText,selfDescription,jobDescription})
// app.listen(process.env.PORT,()=>{
//     console.log("Server is running on port 3000")
// })

import 'dotenv/config'
import app from "./app.js";
import { connectDB } from './config/db.js';
connectDB()
app.listen(process.env.PORT,()=>{
    console.log("Server is running on port 3000")
})

