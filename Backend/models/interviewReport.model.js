import mongoose from "mongoose";
// Job Description  : String
// Resume text 
// self description

const technicalQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    intention:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    }
},{
    _id:false
})
const behaviourQuestionSchema = new mongoose.Schema({
        question:{
        type:String,
        required:true
    },
    intention:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    }
},{
    _id:false
})
const skillGapsSchema = new mongoose.Schema({
    skill:{
        type:String,
        required:true
    },
    severity:{
        type:String,
        enum:["low","medium","high"],
        required:true
    }
},{
    _id:false
})
const preparationPlanSchema = new mongoose.Schema({
    day:{
        type:String,
        required:true
    },
    focus:{
        type:String,
        required:true
    },
    tasks:[
        {
            type:String,
            required:true
        }
    ]
})
const interviewReportSchema = new mongoose.Schema({
    jobDescription:{
        type:String,
        required:true
    },
    resumeText:{
        type:String
    },
    selfDescription:{
        type:String       
    },
    matchScore:{
        type:Number,
        min:0,
        max:100
    },
    technicalQuestionSchema:{technicalQuestionSchema},
    behaviourQuestionSchema : {behaviourQuestionSchema},
    skillGapsSchema:{skillGapsSchema},
    preparationPlanSchema:{preparationPlanSchema}
},{
    timestamps:true
})
export default mongoose.model("InterViewReport",interviewReportSchema)