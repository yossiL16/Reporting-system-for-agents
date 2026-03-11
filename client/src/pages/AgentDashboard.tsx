import { useNavigate } from "react-router-dom"

export default function AgentDashboard() {

  const navigate = useNavigate()

  function goToNewReport(){
    navigate('/new-report')
  }
  function goToUpLoadCsv(){
    navigate('/csv-upload')
  }  
  function goToMyErports(){
    navigate('/my-reports')
  }

  return (
    <div>
      <button onClick={goToNewReport}>New Report</button>
      <button onClick={goToUpLoadCsv}>Upload CSV</button>
      <button onClick={goToMyErports}>My Reports</button>
    </div>
  )
}
