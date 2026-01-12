import { Agent, Lead, CallInsight } from '@/types/user';

export const mockAgents: Agent[] = [
  { id: '1', name: 'James Mitchell', initials: 'JM', callsToday: 10, conversion: 34, status: 'online' },
  { id: '2', name: 'Sarah Hong', initials: 'SH', callsToday: 14, conversion: 28, status: 'online' },
  { id: '3', name: 'Marcus King', initials: 'MK', callsToday: 8, conversion: 31, status: 'busy' },
  { id: '4', name: 'Lisa Park', initials: 'LP', callsToday: 12, conversion: 42, status: 'online' },
];

export const mockLeads: Lead[] = [
  {
    id: '1',
    company: 'Tech Corp LLC',
    contact: 'Jennifer Walsh',
    assignedTo: 'James Mitchell',
    assignedToId: '1',
    status: 'qualified',
    value: 45000,
    meetingTime: '10:00 AM',
    linkedIn: 'https://linkedin.com/in/jenniferwalsh',
    phone: '+1 555-0123',
    email: 'jennifer@techcorp.com',
    intelligenceNotes: ['Enterprise buyer', 'Q1 budget approved', 'Decision maker'],
    buyerQuestions: ['What is the implementation timeline?', 'Do you offer training?'],
  },
  {
    id: '2',
    company: 'Global Ventures',
    contact: 'Marcus Chen',
    assignedTo: 'Sarah Hong',
    assignedToId: '2',
    status: 'contacted',
    value: 32000,
    meetingTime: '2:30 PM',
    linkedIn: 'https://linkedin.com/in/marcuschen',
    phone: '+1 555-0456',
    email: 'marcus@globalventures.com',
  },
  {
    id: '3',
    company: 'Innovate Inc',
    contact: 'David Park',
    assignedTo: 'Marcus King',
    assignedToId: '3',
    status: 'new',
    value: 28000,
    meetingTime: '4:00 PM',
  },
  {
    id: '4',
    company: 'Summit Solutions',
    contact: 'Emily Brown',
    assignedTo: 'Lisa Park',
    assignedToId: '4',
    status: 'proposal',
    value: 67000,
  },
];

export const mockPastLeads: Lead[] = [
  {
    id: '5',
    company: 'Harbor Analytics',
    contact: 'Priya Nair',
    assignedTo: 'James Mitchell',
    assignedToId: '1',
    status: 'closed',
    value: 52000,
    notes: 'Signed after two demos; upsell opportunity next quarter.',
  },
  {
    id: '6',
    company: 'Northwind Logistics',
    contact: 'Carlos Rivera',
    assignedTo: 'Sarah Hong',
    assignedToId: '2',
    status: 'proposal',
    value: 31000,
    notes: 'Waiting on legal review of MSA.',
  },
  {
    id: '7',
    company: 'BrightHealth',
    contact: 'Melissa Clark',
    assignedTo: 'Marcus King',
    assignedToId: '3',
    status: 'qualified',
    value: 42000,
    notes: 'Pilot completed successfully; decision expected next week.',
  },
  {
    id: '8',
    company: 'Acme Retail',
    contact: 'Tom Nguyen',
    assignedTo: 'Lisa Park',
    assignedToId: '4',
    status: 'contacted',
    value: 18000,
    notes: 'Re-engage after Q1 budget refresh.',
  },
];

export const mockCallInsights: CallInsight[] = [
  {
    id: '1',
    company: 'Tech Corp LLC',
    contact: 'Jennifer Walsh',
    duration: '12m 34s',
    keyMatches: ['Football fan', 'Enterprise buyer'],
    qualified: true,
  },
  {
    id: '2',
    company: 'StartUp Hub',
    contact: 'Alex Rivera',
    duration: '8m 12s',
    keyMatches: ['Series A funded', 'Scaling team'],
    qualified: false,
  },
];

export const weeklySDRData = {
  callsMade: 147,
  avgDuration: '8m 24s',
  qualifiedLeads: 23,
  conversionRate: 15.6,
  topPerformingDay: 'Wednesday',
  notes: [
    { date: '2026-01-10', content: 'Great progress on enterprise leads. Focus on healthcare vertical next week.' },
    { date: '2026-01-08', content: 'New script performing well. A/B test results show 18% improvement.' },
  ],
};

export const managerStats = {
  totalAgents: 8,
  callsToday: 147,
  avgDuration: '8m 24s',
  keyMatches: 23,
  totalRevenue: 980000,
  revenueGrowth: 12.5,
  dealsInPipeline: 34,
  conversionRate: 32.5,
  conversionGrowth: 2.3,
};
