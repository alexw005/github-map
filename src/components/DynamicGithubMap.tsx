'use client'

import dynamic from 'next/dynamic'

const GithubMap = dynamic(() => import('@/components/GithubMap'), {
  ssr: false,
})

export default function DynamicGithubMapWrapper() {
  return <GithubMap />
}
