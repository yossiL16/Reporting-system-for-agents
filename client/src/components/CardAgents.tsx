
export default function CardAgents(props) {
  return (
    <tr className="card">
        <td>{props.item.id}</td>
        <td>{props.item.agentCode}</td>
        <td>{props.item.fullName}</td>
        <td>{props.item.passwordHash}</td>
        <td>{props.item.role}</td>
        <td>{props.item.createdAt}</td>
    </tr>
  )
}
