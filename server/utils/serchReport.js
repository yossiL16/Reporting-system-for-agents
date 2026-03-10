
export default function getReportByRole(data, role, id, querys) {

    const { agentId, category, urgency } = querys;
    const newAgentId = (role === 'admin') ? agentId : id;

    return data.filter(report => {
        const checkAgent = !newAgentId || Number(report.agentId) === Number(newAgentId);
        const checkCategory = !category || report.category === category;
        const checkUrgency = !urgency || report.urgency === urgency;
        return checkAgent && checkCategory && checkUrgency;
    })  
}