import { useEffect, useState } from "react";
import Card from "../components/Card";
import type { Category, Urgency } from "../typs/type";

export default function MyReports() {

  const [data,setData] = useState([])
  const [category, setCategory] = useState<Category>("")
  const [urgency, setUrgency] = useState<Urgency>("")
  const [agentCode, setAgentCode] = useState<string>("")

  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user') || '{}'

  async function resData(){
    const params = new URLSearchParams();
    if(category){params.append('category', category)}
    if(urgency){params.append('urgency', urgency)}
    if(agentCode){params.append('agentCode', agentCode)}
  try{
  const response = await fetch(`http://localhost:3000/reports?${params.toString()}`,{
    headers: {
      authorization :'Bearer ' + token 
    }
  })
  if(!response.ok) { throw new Error(`Response status: ${response.status}`);}
  const result = await response.json()
  setData(result.reports)
    } 
catch(err){
  if(typeof err === "object"
    && err && "message" in err)
  console.error(err.message);
  }
}

useEffect(() =>{
  resData()
}, [category, urgency,agentCode])


  return (
    <div>
<div>
        <label>category: </label>
        <select name="category" id="category" onChange={e => setCategory(e.target.value as Category)} value={category}>
          <option value="" >all</option>
          <option value="intelligence">intelligence</option>
          <option value="logistics">logistics</option>
          <option value="alert">alert</option>
        </select>
      </div>
      
      <div>
        <label>urgency: </label>
          <select name="urgency" id="urgency" onChange={e => setUrgency(e.target.value as Urgency)} value={urgency}>
          <option value="" >all</option>
          <option value="high">high</option>
          <option value="medium">medium</option>
          <option value="low">low</option>
        </select>
      </div>

      {user.role === "admin" && <div>
        <label htmlFor="">Agent Code: </label>
        <input type="text" value={agentCode} onChange={e => setAgentCode(e.target.value)} placeholder="Search by agentCode..."/>
      </div>}

      <table className="table" style={{marginTop:'4px'}}>
        <tr>
            <th>id</th>
            <th>userId</th>
            <th>category</th>
            <th>urgency</th>
            <th>message</th>
            <th>imagePath</th>
            <th>sourceType</th>
            <th>createdAt</th>
        </tr>
        {data.map((item, index) => (
          <Card key={index} item={item}/>
        ))}
      </table>
    </div>
  )
}
