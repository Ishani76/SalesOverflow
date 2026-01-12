import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { mockLeads } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  Phone, 
  Mail, 
  Linkedin, 
  ChevronRight,
  FileText,
  MessageSquare,
  Calendar
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Lead } from '@/types/user';

export default function SalesRepDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  
  const todaysLeads = mockLeads.slice(0, 3);

  return (
    <div className="space-y-8 animate-slide-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, <span className="text-gradient-primary">{user?.name.split(' ')[0]}</span>
        </h1>
        <p className="text-muted-foreground mt-1">Here are your leads for today.</p>
      </div>

      {/* Today's Schedule */}
      <div className="stat-card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Today's Meetings</h2>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/leads/past')}>
            View Past Leads
          </Button>
        </div>

        <div className="space-y-4">
          {todaysLeads.map((lead) => (
            <div
              key={lead.id}
              className="p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 transition-all cursor-pointer group"
              onClick={() => setSelectedLead(lead)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {lead.meetingTime && (
                    <div className="flex items-center gap-2 text-primary">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">{lead.meetingTime}</span>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-foreground">{lead.company}</p>
                    <p className="text-sm text-muted-foreground">{lead.contact}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`status-badge status-${lead.status}`}>
                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                  </span>
                  <span className="text-success font-semibold">
                    ${lead.value.toLocaleString()}
                  </span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lead Detail Dialog */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {selectedLead?.company}
            </DialogTitle>
          </DialogHeader>

          {selectedLead && (
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Contact</p>
                  <p className="font-medium text-foreground">{selectedLead.contact}</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Deal Value</p>
                  <p className="font-medium text-success">${selectedLead.value.toLocaleString()}</p>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Contact Details</h4>
                <div className="flex flex-wrap gap-3">
                  {selectedLead.phone && (
                    <a href={`tel:${selectedLead.phone}`} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border hover:border-primary/30 transition-colors">
                      <Phone className="w-4 h-4 text-primary" />
                      <span className="text-sm">{selectedLead.phone}</span>
                    </a>
                  )}
                  {selectedLead.email && (
                    <a href={`mailto:${selectedLead.email}`} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border hover:border-primary/30 transition-colors">
                      <Mail className="w-4 h-4 text-primary" />
                      <span className="text-sm">{selectedLead.email}</span>
                    </a>
                  )}
                  {selectedLead.linkedIn && (
                    <a href={selectedLead.linkedIn} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border hover:border-primary/30 transition-colors">
                      <Linkedin className="w-4 h-4 text-primary" />
                      <span className="text-sm">LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Intelligence Notes */}
              {selectedLead.intelligenceNotes && selectedLead.intelligenceNotes.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <h4 className="font-medium text-foreground">Intelligence Sheet</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedLead.intelligenceNotes.map((note, index) => (
                      <span key={index} className="key-match-tag">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Buyer Questions */}
              {selectedLead.buyerQuestions && selectedLead.buyerQuestions.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-warning" />
                    <h4 className="font-medium text-foreground">Buyer Questions</h4>
                  </div>
                  <div className="space-y-2">
                    {selectedLead.buyerQuestions.map((question, index) => (
                      <div key={index} className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                        <p className="text-sm text-foreground">{question}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Future Feature Placeholder */}
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">AI Chat (Coming Soon)</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Ask questions about call transcripts and get AI-powered insights.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
