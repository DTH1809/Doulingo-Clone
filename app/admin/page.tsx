import React from 'react'
import dynamic from 'next/dynamic'
import { getIsAdmin } from '@/lib/admin'
import { redirect } from 'next/navigation'

type Props = {}

const App = dynamic(() => import("./app"), { ssr: false })

const AdminPage = (props: Props) => {

  const isAdmin = getIsAdmin()
  if(!isAdmin) redirect("/")

  return (
    <App />
  )
}

export default AdminPage