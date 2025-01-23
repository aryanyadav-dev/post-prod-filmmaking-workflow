import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { Header } from "./components/layout/Header"
import { Sidebar } from "./components/sidebar/Sidebar"
import { WorkflowEditor } from "./components/workflow/WorkflowEditor"
import { Dashboard } from "./components/dashboard/Dashboard"
import { Team } from "./components/team/team"
import { Workspace } from "./components/workspace/Workspace"
import Schedule from "./components/schedule/schedule"
import { PreviewPage } from "./components/preview/PreviewPage"
import type { Stage } from "./types"

type Page = "dashboard" | "workflow" | "team" | "workspace" | "schedule"

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard")
  const location = useLocation()

  const stages: Stage[] = [
    // ... (stages array remains unchanged)
  ]

  const handlePageChange = (page: Page) => {
    setCurrentPage(page)
  }

  const isPreviewPage = location.pathname === "/preview"

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      {!isPreviewPage && <Header />}
      <div className="flex-1 flex overflow-hidden">
        {!isPreviewPage && <Sidebar onPageChange={handlePageChange} currentPage={currentPage} />}
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {currentPage === "dashboard" && <Dashboard />}
                  {currentPage === "workflow" && <WorkflowEditor stages={stages} />}
                  {currentPage === "team" && <Team />}
                  {currentPage === "workspace" && <Workspace />}
                  {currentPage === "schedule" && <Schedule />}
                </>
              }
            />
            <Route path="/preview" element={<PreviewPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App

