import type { CardAgentsProps } from "../typs/type"
export default function CardAgents({item}: CardAgentsProps) {
  return (
    <tr className="card">
        <td>{item.id}</td>
        <td>{item.agentCode}</td>
        <td>{item.fullName}</td>
        <td>{item.passwordHash}</td>
        <td>{item.role}</td>
        <td>{item.createdAt}</td>
    </tr>
  )
}
