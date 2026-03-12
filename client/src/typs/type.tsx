export interface User {
  id : string;
  agentCode : string
  fullName : string;
  passwordHash : string;
  role : "admin" | "agent";
  createdAt : string
}

export type Category = "intelligence" | "logistics" | "alert" | "";

export type Urgency = "high" | "medium" | "low" | "";

export type Role = 'agent' | 'admin'

interface Agent {
  id: string;
  agentCode: string;
  fullName: string;
  passwordHash: string;
  role: string;
  createdAt: string;
}

export interface CardAgentsProps {
  item: Agent;
}

interface Report {
    id: string;
    userId: string;
    category: string;
    urgency: string;
    message: string;
    imagePath: string;
    sourceType: string;
    createdAt: string;
}

export interface CardReportsProps {
  item: Report;
}
