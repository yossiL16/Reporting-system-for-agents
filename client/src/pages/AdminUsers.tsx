import { useEffect, useState } from "react"
import type { Role } from "../typs/type";
import CardAgents from "../components/CardAgents";

export default function AdminUsers() {

  const [listData,setListData] = useState([])
  const [agentCode, setAgentCode] = useState<string>('')
  const [fullName,setFullName] = useState<string>('')
  const [role, setRole] = useState<string>('agent')
  const[status, setStatus] = useState(true)

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
      setStatus(!status)
    }
    else{
      alert(data.message)
    }
  }


    const token = localStorage.getItem('token')
  
    async function resData(){
      
    try{
    const response = await fetch(`http://localhost:3000/admin/users`,{
      method: 'get',
      headers: {
        authorization :'Bearer ' + token 
      }
    })
    if(!response.ok) { throw new Error(`Response status: ${response.status}`);}
    const result = await response.json()
    setListData(result.users)
      } 
  catch(err){
    if(typeof err === "object"
      && err && "message" in err)
    console.error(err.message);
    }
  }
  
  useEffect(() =>{
    resData()
  }, [status])


  return (
    <div>
      <div>
        <h1>create new agent</h1>
        <input type="text" value={agentCode} onChange={e => setAgentCode(e.target.value)} placeholder="Agent Code..."/>
        <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Full Name"/>
        <select value={role} onChange={e => setRole(e.target.value as Role)}>
          <option value="agent">agent</option>
          <option value="admin">admin</option>
        </select>
        <button onClick={createNewAgent}>create</button>
      </div>
      <div>
              <table className="table" style={{marginTop:'4px'}}>
                <tr>
                    <th>id</th>
                    <th>agentCode</th>
                    <th>fullName</th>
                    <th>passwordHash</th>
                    <th>role</th>
                    <th>createdAt</th>
                </tr>
                {listData.map((item, index) => (
                  <CardAgents key={index} item={item}/>
                ))}
              </table>
      </div>
    </div>
  )
}
