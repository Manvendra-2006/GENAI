import { PDFParse } from "pdf-parse"
import generateInterviewReport from "../services/ai.service.js"
import InterViewReport from "../models/interviewReport.model.js"
export async function interviewController(req,resp){
    try{
        const resumeFile = req.file
        const resumeContent =await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
        const {selfDescription,jobDescription} = req.body
        const interviewRepotByAI = await generateInterviewReport({
            resumeText:resumeContent.text,
            selfDescription,
            jobDescription
        })
        const interviewReport = await InterViewReport.create({
            user:req.user.id,
            resumeText:resumeContent.text,
            selfDescription,
            jobDescription,
            ...interviewRepotByAI
        })

        return resp.status(201).json({message:"Interview report generated successfuly",interviewRepot})
    }

    catch(error){
        return resp.status(500).json({message:"Internal Server Error",error})
    }
}