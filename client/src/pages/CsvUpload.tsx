import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function CsvUpload() {

  const navigate = useNavigate()

  const [file,setFile] = useState<File | null>(null)

  function handleFile(e : React.ChangeEvent<HTMLInputElement>){
      if(e.target.files){
        setFile(e.target.files[0])
      }
    };

  async function sendFile(){

      const formData = new FormData();
      if(file){
        formData.append('file', file);
        }
      try {  
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user') || "{}";
      const parseUser = JSON.parse(user)
    
      const result = await fetch('http://localhost:3000/reports/csv', {
          method: 'post',
          headers: {
            authorization: 'Bearer ' + token
          },
          body: formData,
        });
        const data = await result.json();
        if(result.ok){
          alert(`The file was sent successfully. `)
          navigate(parseUser.role === 'admin' ? '/admin-dashboard': '/agent-dashboard')
        }
        else{
          alert(data.message)
        }
      } catch(e) {
        if(e instanceof Error){
        console.log(e.message);
        }
      }

  }
  return (
    <div>
      <label>send file csv: </label>
      <input type="file" onChange={handleFile} accept=".csv" />
      <br />
      <button onClick={sendFile}>send file</button>
    </div>
  )
}
