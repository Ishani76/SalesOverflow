import { Lead, Agent } from '@/types/user';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface LeadTableProps {
  leads: Lead[];
  agents: Agent[];
  onReassign?: (leadId: string, agentId: string) => void;
  onViewDetails?: (leadId: string) => void;
  onEdit?: (leadId: string) => void;
}

const statusStyles: Record<Lead['status'], string> = {
  new: 'status-new',
  contacted: 'status-contacted',
  qualified: 'status-qualified',
  proposal: 'status-proposal',
  closed: 'status-qualified',
};

export function LeadTable({ leads, agents, onReassign, onViewDetails, onEdit }: LeadTableProps) {
  return (
    <div className="stat-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Company</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Contact</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Assigned To</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Value</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                <td className="py-4 px-4">
                  <span className="font-medium text-primary">{lead.company}</span>
                </td>
                <td className="py-4 px-4 text-foreground">{lead.contact}</td>
                <td className="py-4 px-4">
                  <Select
                    defaultValue={lead.assignedToId}
                    onValueChange={(value) => onReassign?.(lead.id, value)}
                  >
                    <SelectTrigger className="w-40 bg-primary/10 border-primary/20">
                      <div className="flex items-center gap-2">
                        <div className="avatar-circle w-7 h-7 bg-primary text-primary-foreground text-xs">
                          {lead.assignedTo.split(' ').map(n => n[0]).join('')}
                        </div>
                        <SelectValue />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {agents.map((agent) => (
                        <SelectItem key={agent.id} value={agent.id}>
                          {agent.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="py-4 px-4">
                  <span className={`status-badge ${statusStyles[lead.status]}`}>
                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-success font-medium">
                    ${lead.value.toLocaleString()}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDetails?.(lead.id)}
                    >
                      View Details
                    </Button>
                    {onEdit && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(lead.id)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
