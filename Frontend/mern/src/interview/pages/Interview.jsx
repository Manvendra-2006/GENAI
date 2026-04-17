import React, { useMemo, useState } from 'react'
import '../style/interview.css'

const interviewData = {
  matchScore: 90,
  technicalQuestionSchema: [
    {
      question: 'Can you explain the difference between React.js and Angular.js?',
      intention: 'To assess the candidate\'s knowledge of frontend frameworks',
      answer: 'React.js is a library, whereas Angular.js is a full-fledged framework'
    },
    {
      question: 'How do you implement authentication in a MERN stack application?',
      intention: 'To evaluate the candidate\'s understanding of authentication mechanisms',
      answer: 'Using JSON Web Tokens (JWT) or OAuth'
    }
  ],
  behaviourQuestionSchema: [
    {
      question: 'Tell me about a time when you had to troubleshoot a difficult issue in your previous project',
      intention: 'To assess the candidate\'s problem-solving skills',
      answer: 'The candidate should provide a specific example and walk through their thought process'
    },
    {
      question: 'Can you describe a situation where you had to work with a team to deliver a project under a tight deadline?',
      intention: 'To evaluate the candidate\'s teamwork and time management skills',
      answer: 'The candidate should provide a specific example and highlight their contributions to the team'
    }
  ],
  skillGapsSchema: [
    { skill: 'GraphQL', severity: 'low' },
    { skill: 'TypeScript', severity: 'medium' }
  ],
  preparationPlanSchema: [
    {
      day: 1,
      focus: 'Review of React.js and Node.js fundamentals',
      tasks: ['Complete online tutorials', 'Practice building small projects']
    },
    {
      day: 2,
      focus: 'Practice solving technical problems',
      tasks: ['Complete coding challenges on platforms like HackerRank or LeetCode', 'Review common interview questions']
    }
  ]
}

const sectionConfig = [
  {
    id: 'technical',
    title: 'Technical Question',
    subtitle: 'High-value technical question summary',
    schemaKey: 'technicalQuestionSchema'
  },
  {
    id: 'behavioural',
    title: 'Behavioral Question',
    subtitle: 'Real-world behavioral prompts and answers',
    schemaKey: 'behaviourQuestionSchema'
  },
  {
    id: 'roadmap',
    title: 'Roadmap',
    subtitle: 'Your preparation plan for the next interview',
    schemaKey: 'preparationPlanSchema'
  }
]

const Interview = () => {
  const [activeSectionId, setActiveSectionId] = useState(sectionConfig[0].id)

  const activeSection = useMemo(
    () => sectionConfig.find((section) => section.id === activeSectionId) || sectionConfig[0],
    [activeSectionId]
  )

  const activeItems = useMemo(() => {
    if (activeSection.id === 'roadmap') {
      return interviewData.preparationPlanSchema
    }
    return interviewData[activeSection.schemaKey]
  }, [activeSection])

  return (
    <div className="interview-page">
      <aside className="interview-sidebar">
        <div className="interview-panel">
          <h2 className="interview-section-title">Sections</h2>
          <div className="interview-option-list">
            {sectionConfig.map((section) => (
              <button
                key={section.id}
                type="button"
                className={`interview-option-card ${activeSectionId === section.id ? 'active' : ''}`}
                onClick={() => setActiveSectionId(section.id)}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <main className="interview-main">
        <div className="interview-panel interview-main-panel">
          <div className="interview-main-content">
            <div className="interview-main-header">
              <div>
                <h1 className="interview-main-title">{activeSection.title}</h1>
                <p className="interview-main-description">{activeSection.subtitle}</p>
              </div>
              <div className="interview-score-pill">{interviewData.matchScore}% match</div>
            </div>

            <div className="interview-main-details">
              {activeSection.id === 'roadmap' ? (
                activeItems.map((item) => (
                  <div key={item.day} className="roadmap-card">
                    <div className="roadmap-card-header">
                      <span className="roadmap-day">Day {item.day}</span>
                      <span className="roadmap-focus">{item.focus}</span>
                    </div>
                    <ul className="roadmap-task-list">
                      {item.tasks.map((task) => (
                        <li key={task} className="roadmap-task-item">{task}</li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                activeItems.map((item) => (
                  <div key={item.question} className="question-card">
                    <p className="question-label">Question</p>
                    <h2 className="question-title">{item.question}</h2>
                    <p className="question-intention">{item.intention}</p>
                    <p className="question-answer">{item.answer}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      <aside className="interview-sidebar">
        <div className="interview-panel">
          <h2 className="interview-section-title">Skill Gaps</h2>
          <ul className="skill-list">
            {interviewData.skillGapsSchema.map((item) => (
              <li key={item.skill} className="skill-item">
                <span>{item.skill}</span>
                <span className={`severity severity-${item.severity}`}>{item.severity}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default Interview
