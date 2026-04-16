import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const interviewReportZodSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the caandidate's profile matches the job describe"),
    technicalQuestionSchema: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question , what points to cover, what approach to take etc.")
    })).describe("Behaviora questions that can be asked in the interview along with their intention and how to answer them"),
    behaviourQuestionSchema: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question , what points to cover, what approach to take etc.")
    })).describe("Behaviora questions that can be asked in the interview along with their intention and how to answer them"),
    skillGapsSchema: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of skill gap i.e, low,high,middle ")
    })).describe("List of skill gaps in the candidate profile along with their severity"),
    preparationPlanSchema: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this dat in the preparation plan"),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan e.g read a specific book ")
    })).describe("A day-wise preparation plan for the candidate to follow in order ")
})
async function generateInterviewReport({ resumeText, selfDescription, jobDescription }) {

    const prompt = `Generate an interview report for a candidate with the following details:

    Resume: ${resumeText}
    Self Description: ${selfDescription}
    Job Description: ${jobDescription}

    You MUST return a JSON object with EXACTLY these fields and no other fields:
    {
        "matchScore": (number between 0-100),
        "technicalQuestionSchema": [
            {
                "question": "string",
                "intention": "string",
                "answer": "string"
            }
        ],
        "behaviourQuestionSchema": [
            {
                "question": "string",
                "intention": "string",
                "answer": "string"
            }
        ],
        "skillGapsSchema": [
            {
                "skill": "string",
                "severity": "low" or "medium" or "high"
            }
        ],
        "preparationPlanSchema": [
            {
                "day": (number),
                "focus": "string",
                "tasks": ["string", "string"]
            }
        ]
    }

    Do NOT add any extra fields. Follow this structure exactly.
    Return the response in JSON format only.
     Return the response in JSON format matching this structure:
    ${JSON.stringify(zodToJsonSchema(interviewReportZodSchema))}
    `;

    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" }
    });
    const data = JSON.parse(response.choices[0].message.content);
    const stringData = JSON.stringify(data, null, 2);   
    console.log(data)
    return data

}
export default generateInterviewReport

