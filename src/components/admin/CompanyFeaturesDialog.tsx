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
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Shield } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  managerEmails: string[];
  features: string[];
  userCount: number;
}

interface Feature {
  id: string;
  name: string;
  description: string;
}

interface CompanyFeaturesDialogProps {
  company: Company | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (company: Company) => void;
  availableFeatures: Feature[];
}

export function CompanyFeaturesDialog({
  company,
  open,
  onOpenChange,
  onSave,
  availableFeatures,
}: CompanyFeaturesDialogProps) {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  useEffect(() => {
    if (company) {
      setSelectedFeatures([...company.features]);
    }
  }, [company, open]);

  const handleToggleFeature = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((f) => f !== featureId)
        : [...prev, featureId]
    );
  };

  const handleSave = () => {
    if (!company) return;

    const updatedCompany: Company = {
      ...company,
      features: selectedFeatures,
    };

    onSave(updatedCompany);
    onOpenChange(false);
  };

  if (!company) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            Manage Features for {company.name}
          </DialogTitle>
          <DialogDescription>
            Enable or disable features for this company
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-1 gap-3">
            {availableFeatures.map((feature) => (
              <div
                key={feature.id}
                className="flex items-start space-x-3 p-4 rounded-lg bg-secondary/50 border border-border"
              >
                <Checkbox
                  id={feature.id}
                  checked={selectedFeatures.includes(feature.id)}
                  onCheckedChange={() => handleToggleFeature(feature.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <label
                    htmlFor={feature.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {feature.name}
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                </div>
              </div>
            ))}
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
