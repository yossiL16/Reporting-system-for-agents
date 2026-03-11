export interface User {
  id : string;
  agentCode : string
  fullName : string;
  passwordHash : string;
  role : "admin" | "agent";
  createdAt : string
}

export type Category = "intelligence" | "logistics" | "alert";

export type Urgency = "high" | "medium" | "low";

