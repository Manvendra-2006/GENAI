import React, { useRef, useState } from 'react'

import '../style/Home.css'
import useInterview from '../hooks/useInterview'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const { loading, generateReport, reports, getReports } = useInterview()
  const [jobDescription, setjobDescription] = useState('')
  const [selfDescription, setselfDescription] = useState('')
  const resumeInputRef = useRef()
  const navigate = useNavigate()
  async function handleGenerateReport() {
    const resume = resumeInputRef.current.files[0]
    const data = await generateReport({ jobDescription, selfDescription, resume })
    console.log(data)
    navigate(`/interview/${data._id}`)   
  }
  if(loading){
    return(<div>Loading........</div>)
  }
  return (
    <div className="home">
      <div className="form-card">
        <h1>Interview Report Generator</h1>
        <p className="subtitle">
          Fill in the details below to generate your interview report
        </p>

        <div className="form-group">
          <label htmlFor="jobDescription">Job Description</label>
          <textarea
            name="jobDescription"
            id="jobDescription"
            placeholder="Enter Job Description here...."
            rows="8"
            onChange={(event) => setjobDescription(event.target.value)}
            value={jobDescription}
          ></textarea>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="resume">Upload Resume</label>
            <input
              type="file"
              name="resume"
              id="resume"
              accept=".pdf"
              ref={resumeInputRef}
            />
          </div>

          <div className="form-group">
            <label htmlFor="selfDescription">Self Description</label>
            <input
              type="text"
              name="selfDescription"
              id="selfDescription"
              placeholder="Describe yourself in this box..."
              onChange={(event) => setselfDescription(event.target.value)}
              value={selfDescription}
            />
          </div>
        </div>

        <button onClick={handleGenerateReport} className="generate-btn">Generate Interview Report</button>
      </div>

      <div className="recent-reports-section">
        <button onClick={() => navigate('/reports')} className="get-reports-btn">View All Reports</button>
      </div>
    </div>
  )
}

export default Home