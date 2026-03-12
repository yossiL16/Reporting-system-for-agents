
export default function Card(props) {
  return (
    <tr className="card">
        <td>{props.item.id}</td>
        <td>{props.item.userId}</td>
        <td>{props.item.category}</td>
        <td>{props.item.urgency}</td>
        <td>{props.item.message }</td>
        <td>{props.item.imagePath}</td>
        <td>{props.item.sourceType}</td>
        <td>{props.item.createdAt}</td>
    </tr>
  )
}
