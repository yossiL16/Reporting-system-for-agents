import type { CardReportsProps } from "../typs/type"
export default function Card({item}: CardReportsProps) {
  return (
    <tr className="card">
        <td>{item.id}</td>
        <td>{item.userId}</td>
        <td>{item.category}</td>
        <td>{item.urgency}</td>
        <td>{item.message }</td>
        <td>{item.imagePath}</td>
        <td>{item.sourceType}</td>
        <td>{item.createdAt}</td>
    </tr>
  )
}
