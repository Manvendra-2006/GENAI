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

    const prompt = `Generate a detailed interview report for a candidate with the following details:

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

Important rules:
1. The report must be strongly based on the Resume, Self Description, and Job Description.
2. The matchScore must realistically reflect how well the candidate fits the job.
3. The number and difficulty of questions MUST vary according to the matchScore.

Question count rules:
- If matchScore is 80 to 100:
  - technicalQuestionSchema must contain exactly 4 questions
  - behaviourQuestionSchema must contain exactly 3 questions
  - questions should be advanced and role-specific
  - skillGapsSchema must contain 2 to 3 items
  - preparationPlanSchema must contain exactly 5 days

- If matchScore is 50 to 79:
  - technicalQuestionSchema must contain exactly 6 questions
  - behaviourQuestionSchema must contain exactly 4 questions
  - questions should be mixed: foundational + intermediate + role-specific
  - skillGapsSchema must contain 3 to 5 items
  - preparationPlanSchema must contain exactly 7 days

- If matchScore is below 50:
  - technicalQuestionSchema must contain exactly 8 questions
  - behaviourQuestionSchema must contain exactly 5 questions
  - questions should focus more on fundamentals, practical understanding, and common interview basics
  - skillGapsSchema must contain 5 to 7 items
  - preparationPlanSchema must contain exactly 10 days

Additional rules:
4. technicalQuestionSchema questions must be highly relevant to the job description.
5. behaviourQuestionSchema questions must test communication, teamwork, ownership, problem-solving, conflict handling, and adaptability.
6. skillGapsSchema should identify genuine gaps between the candidate profile and the job requirements.
7. preparationPlanSchema should be practical, structured, and personalized to the candidate's weaknesses.
8. Do NOT return empty arrays.
9. Do NOT add markdown, explanation, or text outside JSON.
10. Return valid JSON only.

Return the response in JSON format matching this structure: 
${JSON.stringify(zodToJsonSchema(interviewReportZodSchema))} 
`;
 // isme zod to Schema fir read krne ke liye JSON.stringify karke prompt me dalenge taki model ko pata chale ki hume kasia data chahiye aur uske according hi response de . Aur response ko parse krke use krenge
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

