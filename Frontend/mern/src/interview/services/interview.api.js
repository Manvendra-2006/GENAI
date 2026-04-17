import api from "../../../axios";
export async function generateInterviewReport({resumeText,selfDescription,jobDescription}){
        const formData = new FormData()
        formData.append("jobDescription",jobDescription)
        formData.append("selfDescription",selfDescription)
        formData.append("resumeText",resumeText)

        const response = await api.post("/interview/",formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        return response.data
}
export async function getInterviewReportById(interviewId){
    const response = await api.get(`/interview/report/${interviewId}`)
    return response.data
}
export function getAllInterviewReport(){
    const response = await api.get("/interview/reports")
    return response.data
}
