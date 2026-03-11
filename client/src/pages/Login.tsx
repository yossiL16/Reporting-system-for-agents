import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {

    const navigate = useNavigate() 

    const [agentCode, setAgentCode] = useState<string>("")
    const [password, setPassword] = useState<string>("")    

    async function submitLogin(){
        const res = await fetch(`http://localhost:3000/auth/login`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ agentCode, password })
        });
        const data = await res.json()

        if(res.ok){
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', data.user)
            if(data.user.role === 'admin'){
                navigate('/admin_dashboard')
            } else {
                navigate('/agent_dashboard')
            }
            
        }
        else {
            alert(data.message)
        }
    }


  return (
    <div>
        <h1>Reporting System for Agents</h1>

        <div>
            <label >agent code: </label>
            <input type="text" value={agentCode} placeholder="Agent code..." onChange={(e)=> setAgentCode(e.target.value)}/>
        </div>
        <div>
            <label>password: </label>
            <input type="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={submitLogin}>submit</button>
    </div>
  )
}
