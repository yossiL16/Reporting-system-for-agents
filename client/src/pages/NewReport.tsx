import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { Category, Urgency } from "../typs/type"


export default function NewReport() {

  const navigate = useNavigate()

  const [category, setCategory] = useState<Category>("intelligence")
  const [urgency, setUrgency] = useState<Urgency>("high")
  const [message, setMessage] = useState<string>("")
  const [file, setFile] = useState<File | null>(null)

    function handleImage(e : React.ChangeEvent<HTMLInputElement>){
      if(e.target.files){
      setFile(e.target.files[0])
      }
    };

  async function sendMessage() {
    const formData = new FormData();
    formData.append('category', category);
    formData.append('urgency', urgency);
    formData.append('message', message);

    if(file){
      formData.append('image', file);
       }
      try {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user') || "{}";
        const parseUser = JSON.parse(user)


        const result = await fetch('http://localhost:3000/reports', {
          method: 'post',
          headers: {
            authorization: 'Bearer ' + token
          },
          body: formData,
        });
        const data = await result.json();
        if(result.ok){
          alert(`The message was sent successfully. ID: ${data.id}`)
          navigate(parseUser.role === 'admin' ? '/admin-dashboard': '/agent-dashboard')
        } else{
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
      <div>
        <label>category: </label>
        <select name="category" id="category" onChange={e => setCategory(e.target.value as Category)} value={category}>
          <option value="intelligence">intelligence</option>
          <option value="logistics">logistics</option>
          <option value="alert">alert</option>
        </select>
      </div>
      
      <div>
        <label>urgency: </label>
          <select name="urgency" id="urgency" onChange={e => setUrgency(e.target.value as Urgency)} value={category}>
          <option value="high">high</option>
          <option value="medium">medium</option>
          <option value="low">low</option>
        </select>
      </div>

      <div>

      </div>
      <label htmlFor="">message</label>
      <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Sand a Short Message..."/>
      <br />

      <label >image</label>
      <input type="file" onChange={handleImage} />
      <br />

      <button onClick={sendMessage}>Send</button>
    </div>
  )
}
