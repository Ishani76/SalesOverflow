import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { LeadTable } from '@/components/dashboard/LeadTable';
import { mockLeads, mockAgents } from '@/data/mockData';
import { Calendar } from 'lucide-react';
import { toast } from 'sonner';

export default function LeadsToday() {
  const [leads, setLeads] = useState(mockLeads);

  const handleReassign = (leadId: string, agentId: string) => {
    const agent = mockAgents.find((a) => a.id === agentId);
    if (!agent) return;

    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === leadId
          ? { ...lead, assignedTo: agent.name, assignedToId: agentId }
          : lead
      )
    );

    toast.success(`Lead reassigned to ${agent.name}`);
  };

  const handleViewDetails = (leadId: string) => {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return;
    toast.info(`Opening ${lead.company} details`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-slide-in">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary/10">
            <Calendar className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Today's Leads</h1>
            <p className="text-muted-foreground">
              Review and manage the leads scheduled for today
            </p>
          </div>
        </div>

        <LeadTable
          leads={leads}
          agents={mockAgents}
          onReassign={handleReassign}
          onViewDetails={handleViewDetails}
        />
      </div>
    </DashboardLayout>
  );
}

