import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2 } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  managerEmails: string[];
  features: string[];
  userCount: number;
}

interface EditCompanyDialogProps {
  company: Company | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (company: Company) => void;
}

export function EditCompanyDialog({ company, open, onOpenChange, onSave }: EditCompanyDialogProps) {
  const [name, setName] = useState('');
  const [managerEmails, setManagerEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState('');

  useEffect(() => {
    if (company) {
      setName(company.name);
      setManagerEmails([...company.managerEmails]);
      setEmailInput('');
    }
  }, [company, open]);

  const handleAddEmail = () => {
    if (emailInput.trim() && !managerEmails.includes(emailInput.trim())) {
      setManagerEmails([...managerEmails, emailInput.trim()]);
      setEmailInput('');
    }
  };

  const handleRemoveEmail = (email: string) => {
    setManagerEmails(managerEmails.filter((e) => e !== email));
  };

  const handleSave = () => {
    if (!company) return;

    if (!name.trim()) {
      return;
    }

    const updatedCompany: Company = {
      ...company,
      name: name.trim(),
      managerEmails,
    };

    onSave(updatedCompany);
    onOpenChange(false);
  };

  if (!company) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Building2 className="w-6 h-6 text-primary" />
            Edit Company
          </DialogTitle>
          <DialogDescription>
            Update company information and manager emails
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Company Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter company name"
            />
          </div>

          <div className="space-y-2">
            <Label>Manager Emails (Whitelist)</Label>
            <div className="flex gap-2">
              <Input
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddEmail();
                  }
                }}
                placeholder="manager@company.com"
                type="email"
              />
              <Button type="button" variant="outline" onClick={handleAddEmail}>
                Add
              </Button>
            </div>
            {managerEmails.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {managerEmails.map((email, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 flex items-center gap-2"
                  >
                    {email}
                    <button
                      onClick={() => handleRemoveEmail(email)}
                      className="hover:text-destructive"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
