import { Lead } from '@/types/user';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Building2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface EditLeadDialogProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (lead: Lead) => void;
}

export function EditLeadDialog({ lead, open, onOpenChange, onSave }: EditLeadDialogProps) {
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (lead) {
      setNotes(lead.notes || '');
    }
  }, [lead, open]);

  const handleSave = () => {
    if (!lead) return;

    const updatedLead: Lead = {
      ...lead,
      notes: notes.trim() || undefined,
    };

    onSave(updatedLead);
    onOpenChange(false);
  };

  if (!lead) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Building2 className="w-6 h-6 text-primary" />
            Edit Notes - {lead.company}
          </DialogTitle>
          <DialogDescription>
            Add or edit notes for this lead
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter notes about this lead..."
              rows={8}
              className="resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Notes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
