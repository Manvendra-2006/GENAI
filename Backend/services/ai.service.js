import { GoogleGenAI } from "@google/genai";
import {z} from "zod";
import zodToJsonSchema from "zod-to-json-schema";
const ai = new GoogleGenAI({
    apiKey:process.env.GOOGLE_API_KEY
})
// async function invokeGEMINIAI(){
//     const response = await ai.models.generateContent({
//         model:"gemini-2.5-flash",
//         contents:"Hello Gemnini ! what is an interview"
//     })
//     console.log(response.text)
// }
const interviewReportSchema = z.object({
     matchScore:z.number().description("A score between 0 and 100 indicating how well the caandidate's profile matches the job description"),
    technicalQuestionSchema:z.array(z.object({
        question:z.string().description("The technical question can be asked in the interview"),
        intention:z.string().description("The intention of interviewer behind asking this question"),
        answer:z.string().description("How to answer this question , what points to cover, what approach to take etc.")
    })).description("Behaviora questions that can be asked in the interview along with their intention and how to answer them"),
    behaviourQuestionSchema:z.array(z.object({
        question:z.string().description("The technical question can be asked in the interview"),
        intention:z.string().description("The intention of interviewer behind asking this question"),
        answer:z.string().description("How to answer this question , what points to cover, what approach to take etc.")
    })).description("Behaviora questions that can be asked in the interview along with their intention and how to answer them"),
    skillGapsSchema:z.array(z.object({
        skill : z.string().description("The skill which the candidate is lacking"),
        severity:z.enum(["low","medium","high"]).description("The severity of skill gap i.e, low,high,middle ")
    })).description("List of skill gaps in the candidate profile along with their severity"),
    preparationPlanSchema:z.array(z.object({
        day:z.number().description("The day number in the preparation plan, starting from 1"),
        focus:z.string().description("The main focus of this dat in the preparation plan"),
        tasks:z.array(z.string()).description("List of tasks to be done on this day to follow the preparation plan e.g read a specific book ")
    })).description("A day-wise preparation plan for the candidate to follow in order ")
})
export async function generateInterviewReport({resumeText,selfDescription,jobDescription}){
    const prompt = `Generate an interview report for a candidate with the following details
    Resume:${resumeText}
    Self Description:${selfDescription}
    Job Description : ${jobDescription}
    `
   const response = await ai.models.generateContent({
    model:"gemini-2.5-flash",
    contents:prompt,
    config:{
        responseMimeType:"application/json",
        responseJsonSchema:zodToJsonSchema(interviewReportSchema)
    }
   })
   console.log(JSON.parse(response.text))
}
export default invokeGEMINIAI