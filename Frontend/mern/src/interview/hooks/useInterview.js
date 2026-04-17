import { useContext } from "react";
import { generateInterviewReport } from "../services/interview.api";
import { getInterviewReportById } from "../services/interview.api";
import { getAllInterviewReport } from "../services/interview.api";
import { InterviewContext } from "../interview.context";
function useInterview(){
    const context = useContext(InterviewContext)
    const {loading,setloading,report,setreport,setreports,reports} = context
 async   function generateReport({jobDescription,selfDescription,resumeText}){
        setloading(true)
        try{
            const response = await generateInterviewReport({jobDescription,selfDescription,resumeText})
            setreport(response.interviewReport)
        }
        catch(error){
            console.log(error)
        }
        finally{
            setloading(false)
        }
    }
  async   function getReportById(interviewId){
        setloading(true)
        try{
            const response = await getInterviewReportById(interviewId)
            setreport(response.interviewReport)
        }
        catch(error){
            console.log(error)
        }
        finally{
            setloading(false)
        }
    }
   async function getReports(){
        setloading(true)
        try{
            const response = await getAllInterviewReport()
            setreports(response.interviewReport)
        }
        catch(error){
            console.log(error)
        }
        finally{
            setloading(false)
        }
    }
    return {loading,report,reports,getReportById,generateReport,getReports}
}
