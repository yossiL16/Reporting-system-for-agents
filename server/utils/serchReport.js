
export default function getReportByRole(data, role, userAgentCode, querys) {

    const { agentCode, category, urgency } = querys;
    const newAgentCode = (role === 'admin') ? agentCode : userAgentCode;

    return data.filter(report => {
        const checkAgent = !newAgentCode || report.agentCode === newAgentCode;
        const checkCategory = !category || report.category === category;
        const checkUrgency = !urgency || report.urgency === urgency;
        return checkAgent && checkCategory && checkUrgency;
    })  
}