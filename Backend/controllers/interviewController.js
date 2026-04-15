import { PDFParse } from "pdf-parse"
export async function interviewController(req,resp){
    try{
        const resumeFile = req.file
        const resumeContent = PDFParse(req)
    }
    catch(error){
        return resp.status(500).json({message:"Internal Server Error",error})
    }
}