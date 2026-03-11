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
        <Route path='/agent-dashboard' element={<AgentDashboard />}/>
        <Route path='/new-report' element={<NewReport />}/>
        <Route path='/csv-upload' element={<CsvUpload />}/>
        <Route path='/my-reports' element={<MyReports />}/>
        <Route path='/admin-dashboard' element={<AdminDashboard />}/>
        <Route path='/admin-users' element={<AdminUsers />}/>
        <Route path='/admin-reports' element={<AdminReports />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
