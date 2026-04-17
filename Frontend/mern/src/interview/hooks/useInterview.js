import { useContext } from "react";
import { generateInterviewReport } from "../services/interview.api";
import { getInterviewReportById } from "../services/interview.api";
import { getAllInterviewReport } from "../services/interview.api";
import { InterviewContext } from "../interview.context";
export default function useInterview(){
    const context = useContext(InterviewContext)
    const {loading,setloading,report,setreport,setreports,reports} = context
 async   function generateReport({jobDescription,selfDescription,resume}){
        setloading(true)
        let response = null
        try{
             response = await generateInterviewReport({jobDescription,selfDescription,resume})
            setreport(response.interviewReport)
        }
        catch(error){
            console.log(error)
        }
        finally{
            setloading(false)
        }
        return response.interviewReport
    }
  async   function getReportById(interviewId){
        setloading(true)
        let response = null
        try{
            response = await getInterviewReportById(interviewId)
            setreport(response.interviewReport)
        }
        catch(error){
            console.log(error)
        }
        finally{
            setloading(false)
        }
        return response.interviewReport
    }
   async function getReports(){
        setloading(true)
        let response = null
        try{
         response = await getAllInterviewReport()
            setreports(response.interviewReport)
        }
        catch(error){
            console.log(error)
        }
        finally{
            setloading(false)
        }
        return response.interviewReport
    }
    return {loading,report,reports,getReportById,generateReport,getReports}
}
