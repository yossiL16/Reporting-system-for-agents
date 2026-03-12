import { useNavigate } from "react-router-dom"

export default function AdminDashboard() {
  const navigate = useNavigate()

  function goToAdminUsers(){
    navigate('/admin-users')
  }
  function goToUAdminReports(){
    navigate('/admin-reports')
  }  

  return (
    <div>
      <button onClick={goToAdminUsers}>Menage Ddmin Users</button>
      <button onClick={goToUAdminReports}>All Reports</button>
    </div>
  )
}
