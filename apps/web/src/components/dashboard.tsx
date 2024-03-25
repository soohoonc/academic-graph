import React from 'react'
import { type Session } from 'next-auth'
import { type Paper } from '@academic-graph/db/types'

interface DashboardProps {
  session: Session | null
  userPapers: Paper[]
}

const Dashboard = ({
  session,
  userPapers
}: DashboardProps) => {
  return (
    <div className="flex flex-col w-full p-4">
      <p className="font-semibold">Papers</p>
      <ul>
        {userPapers.map((paper: Paper) => (
          <li key={paper.id}><PaperMetadata paper={paper}/></li>
        ))}
      </ul>
    </div>
  )
}

interface PaperMetadataProps {
  paper: Paper
}

const PaperMetadata = ({
  paper
}: PaperMetadataProps) => {
  return (
    <div>
      <p>{paper.title}</p>
    </div>
  )
};

export default Dashboard