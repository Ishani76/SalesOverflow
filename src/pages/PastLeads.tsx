import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { LeadTable } from '@/components/dashboard/LeadTable';
import { LeadDetailsDialog } from '@/components/dashboard/LeadDetailsDialog';
import { mockPastLeads, mockAgents } from '@/data/mockData';
import { Lead } from '@/types/user';
import { FileText } from 'lucide-react';
import { toast } from 'sonner';

export default function PastLeads() {
  const [leads, setLeads] = useState(mockPastLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    setSelectedLead(lead);
    setIsDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-slide-in">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary/10">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Past Leads</h1>
            <p className="text-muted-foreground">
              See previously worked leads and reassign as needed
            </p>
          </div>
        </div>

        <LeadTable
          leads={leads}
          agents={mockAgents}
          onReassign={handleReassign}
          onViewDetails={handleViewDetails}
        />

        <LeadDetailsDialog
          lead={selectedLead}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      </div>
    </DashboardLayout>
  );
}

