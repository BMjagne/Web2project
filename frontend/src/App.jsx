import React from "react"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import AdminDashboard from "./pages/AdminDashboard"
import NotesPage from "./pages/NotesPage"
import CreatePage from "./pages/CreatePage"
import NoteDetailPage from "./pages/NoteDetailPage"
import {Route, Routes} from "react-router"
import toast from 'react-hot-toast'

const App = () => {
  return ( <div data-theme="forest">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<SignUp/>}/>
        <Route path='/admin' element={<AdminDashboard/>}/>
        <Route path="/notes" element={<NotesPage/>}/>
        <Route path="/create" element={<CreatePage/>}/>
        <Route path="/note/:id" element={<NoteDetailPage/>}/>
      </Routes>
    </div>
  )
}

export default App