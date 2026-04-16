import { PDFParse } from "pdf-parse"
import generateInterviewReport from "../services/ai.service.js"
import InterViewReport from "../models/interviewReport.model.js"
export async function interviewController(req,resp){
    try{
        if (!req.file) {
    return resp.status(400).json({ message: "Resume file is required" });
}
        const resumeFile = req.file
        const resumeContent =await (new PDFParse(Uint8Array.from(req.file.buffer))).getText()  // It returns data in object 
        console.log(resumeContent)
        const {selfDescription,jobDescription} = req.body
        const interviewRepotByAI = await generateInterviewReport({
            resumeText:resumeContent.text,
            selfDescription,
            jobDescription
        })
        console.log(interviewRepotByAI)
        const interviewReport = await InterViewReport.create({
            user:req.user.id,
            resumeText:resumeContent.text,  // it return data in string 
            selfDescription,
            jobDescription,
            ...interviewRepotByAI
        })

        return resp.status(201).json({message:"Interview report generated successfuly",interviewReport})
    }

    catch(error){
        return resp.status(500).json({message:"Internal Server Error",error})
    }
}