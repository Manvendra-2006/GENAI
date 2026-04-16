import React from 'react'
import '../style/interview.css'

const questionItems = [
  'Technical Question',
  'Behavioral Question',
]

const skillGaps = ['redis', 'Event Loop', 'Message Queue']

const Interview = () => {
  return (
    <div className="interview-page">
      <aside className="interview-sidebar interview-sidebar-left">
        <div className="interview-panel">
          <div className="interview-section-title">Questions</div>
          <div className="interview-option-list">
            {questionItems.map((item) => (
              <button key={item} className="interview-option-card" type="button">
                {item}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <main className="interview-main">
        <div className="interview-panel interview-main-panel">
          <div className="interview-main-placeholder">here will be the main container</div>
        </div>
      </main>

      <aside className="interview-sidebar interview-sidebar-right">
        <div className="interview-panel">
          <div className="interview-section-title">Skill Gaps</div>
          <ul className="skill-list">
            {skillGaps.map((skill) => (
              <li key={skill} className="skill-item">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default Interview