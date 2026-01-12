import { Lead } from '@/types/user';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Building2, User, DollarSign, Clock, Phone, Mail, Linkedin, FileText, Lightbulb, MessageSquare } from 'lucide-react';

interface LeadDetailsDialogProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusStyles: Record<Lead['status'], string> = {
  new: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  contacted: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  qualified: 'bg-green-500/10 text-green-500 border-green-500/20',
  proposal: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  closed: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
};

export function LeadDetailsDialog({ lead, open, onOpenChange }: LeadDetailsDialogProps) {
  if (!lead) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Building2 className="w-6 h-6 text-primary" />
            {lead.company}
          </DialogTitle>
          <DialogDescription>
            Complete lead information and details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Status and Value */}
          <div className="flex items-center justify-between">
            <Badge className={statusStyles[lead.status]}>
              {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
            </Badge>
            <div className="flex items-center gap-2 text-lg font-semibold text-success">
              <DollarSign className="w-5 h-5" />
              ${lead.value.toLocaleString()}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                <div className="text-sm text-muted-foreground mb-1">Contact Name</div>
                <div className="font-medium">{lead.contact}</div>
              </div>
              {lead.email && (
                <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                  <div className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </div>
                  <a 
                    href={`mailto:${lead.email}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {lead.email}
                  </a>
                </div>
              )}
              {lead.phone && (
                <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                  <div className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone
                  </div>
                  <a 
                    href={`tel:${lead.phone}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {lead.phone}
                  </a>
                </div>
              )}
              {lead.linkedIn && (
                <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                  <div className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </div>
                  <a 
                    href={lead.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary hover:underline"
                  >
                    View Profile
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Assignment */}
          <div className="p-4 rounded-lg bg-secondary/50 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Assigned To</div>
            <div className="font-medium">{lead.assignedTo}</div>
          </div>

          {/* Meeting Time */}
          {lead.meetingTime && (
            <div className="p-4 rounded-lg bg-secondary/50 border border-border">
              <div className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Meeting Time
              </div>
              <div className="font-medium">{lead.meetingTime}</div>
            </div>
          )}

          {/* Intelligence Notes */}
          {lead.intelligenceNotes && lead.intelligenceNotes.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                Intelligence Notes
              </h3>
              <div className="space-y-2">
                {lead.intelligenceNotes.map((note, index) => (
                  <div key={index} className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="text-sm">{note}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Buyer Questions */}
          {lead.buyerQuestions && lead.buyerQuestions.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Buyer Questions
              </h3>
              <div className="space-y-2">
                {lead.buyerQuestions.map((question, index) => (
                  <div key={index} className="p-3 rounded-lg bg-secondary/50 border border-border">
                    <div className="text-sm">{question}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {lead.notes && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Notes
              </h3>
              <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                <div className="text-sm whitespace-pre-wrap">{lead.notes}</div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
