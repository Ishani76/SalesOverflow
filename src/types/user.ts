export type UserRole = 'sdr' | 'sales_rep' | 'manager' | 'sysadmin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  company?: string;
}

export interface Lead {
  id: string;
  company: string;
  contact: string;
  assignedTo: string;
  assignedToId: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed';
  value: number;
  meetingTime?: string;
  linkedIn?: string;
  phone?: string;
  email?: string;
  notes?: string;
  intelligenceNotes?: string[];
  buyerQuestions?: string[];
}

export interface Agent {
  id: string;
  name: string;
  initials: string;
  callsToday: number;
  conversion: number;
  status: 'online' | 'offline' | 'busy';
}

export interface CallInsight {
  id: string;
  company: string;
  contact: string;
  duration: string;
  keyMatches: string[];
  qualified: boolean;
  notes?: string;
}
