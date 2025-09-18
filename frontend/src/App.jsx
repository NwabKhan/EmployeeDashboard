import React from 'react'
import EmployeeDashboard from './pages/EmployeeDashboard'
import { ToastProvider } from './components/ui'

const App = () => {
  return (
    <ToastProvider>
      <EmployeeDashboard />
    </ToastProvider>
  )
}

export default App