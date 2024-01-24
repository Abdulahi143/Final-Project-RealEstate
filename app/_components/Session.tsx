"use client"

import { useSession } from 'next-auth/react'
import React from 'react'

const Session = () => {
    const data = useSession();
    return (
    <div>Session</div>
  )
"use client"

}

export default Session