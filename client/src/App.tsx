import './App.css'
import { BrowserRouter , Route, Routes} from 'react-router-dom'
import Login from './pages/Login'
import AgentDashboard from './pages/AgentDashboard'
import NewReport from './pages/NewReport'
import CsvUpload from './pages/CsvUpload'
import MyReports from './pages/MyReports'
import AdminDashboard from './pages/AdminDashboard'
import AdminUsers from './pages/AdminUsers'
import AdminReports from './pages/AdminReports'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/agent_dashboard' element={<AgentDashboard />}/>
        <Route path='/new_report' element={<NewReport />}/>
        <Route path='/csv_upload' element={<CsvUpload />}/>
        <Route path='/my_reports' element={<MyReports />}/>
        <Route path='/admin_dashboard' element={<AdminDashboard />}/>
        <Route path='/admin_users' element={<AdminUsers />}/>
        <Route path='/admin_reports' element={<AdminReports />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
