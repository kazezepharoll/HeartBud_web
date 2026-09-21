import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
    const navigate = useNavigate
  return (
    <div>
      <h1>This page does not exist</h1>
      <button onClick={()=> navigate('/')}>Go Back</button>
    </div>
  )
}
