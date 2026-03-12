import { useState } from "react"
import type { Role } from "../typs/type";

export default function AdminUsers() {

  
  const [agentCode, setAgentCode] = useState<string>('')
  const [fullName,setFullName] = useState<string>('')
  const [role, setRole] = useState<string>('agent')

  async function createNewAgent(){
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/admin/users', {
      method: 'POST',
      headers: {
         authorization: 'Bearer ' + token,
         "Content-Type": "application/json"
      },
      body: JSON.stringify({
        agentCode, 
        fullName,
        role
      })
    });
    const data = await response.json();
    if(response.ok){
      alert("Agent added successfully. Id: " + data.user.id)
      setAgentCode("")
      setFullName("")
      setRole("agent")
    }
    else{
      alert(data.message)
    }
  }


  return (
    <div>
      <div>
        <h1>create new agent</h1>
        <input type="text" value={agentCode} onChange={e => setAgentCode(e.target.value)} placeholder="Agen tCode..."/>
        <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Full Name"/>
        <select value={role} onChange={e => setRole(e.target.value as Role)}>
          <option value="agent">agent</option>
          <option value="admin">admin</option>
        </select>
        <button onClick={createNewAgent}>create</button>
      </div>
    </div>
  )
}
