import React from 'react'
import { type Session } from 'next-auth'

interface DashboardProps {
  session: Session | null
  userPapers: Paper[]
}

const Dashboard = ({
  session,
  userPapers
}: DashboardProps) => {
  return (
    <div className="">
      Dashboard: {session?.user?.email}
      <ul>
        {userPapers.map(paper => (
          <li key={paper.id}>{paper.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default Dashboard