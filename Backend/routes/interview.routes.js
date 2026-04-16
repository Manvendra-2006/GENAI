import express from 'express'
import { authUser } from '../middlewares/auth.middleware.js'
import upload from '../middlewares/file.middleware.js'
import { interviewController } from '../controllers/interviewController.js'
const interviewRouter = express.Router()
interviewRouter.post("/",authUser,upload.single("resume"),interviewController)
export default interviewRouter