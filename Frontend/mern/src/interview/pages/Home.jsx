import React from 'react'

import '../style/Home.css'
const Home = () => {
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
            />
          </div>

          <div className="form-group">
            <label htmlFor="selfDescription">Self Description</label>
            <input
              type="text"
              name="selfDescription"
              id="selfDescription"
              placeholder="Describe yourself in this box..."
            />
          </div>
        </div>

        <button className="generate-btn">Generate Interview Report</button>
      </div>
    </div>
  )
}

export default Home