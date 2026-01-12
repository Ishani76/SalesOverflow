import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, Plus, Search, Edit, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface Feature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  companyCount: number;
}

const mockFeatures: Feature[] = [
  { 
    id: 'analytics', 
    name: 'Team Analytics', 
    description: 'View team performance metrics and analytics',
    enabled: true,
    companyCount: 3
  },
  { 
    id: 'reassignment', 
    name: 'Lead Reassignment', 
    description: 'Reassign leads between sales representatives',
    enabled: true,
    companyCount: 2
  },
  { 
    id: 'ai-chat', 
    name: 'AI Call Chat', 
    description: 'AI-powered transcript analysis and insights',
    enabled: true,
    companyCount: 1
  },
  { 
    id: 'custom-onboarding', 
    name: 'Custom Onboarding', 
    description: 'Customize onboarding emails and workflows',
    enabled: false,
    companyCount: 0
  },
  { 
    id: 'advanced-reporting', 
    name: 'Advanced Reporting', 
    description: 'Generate detailed reports and exports',
    enabled: false,
    companyCount: 0
  },
];

export default function AdminFeatures() {
  const [features, setFeatures] = useState(mockFeatures);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddFeature, setShowAddFeature] = useState(false);
  const [newFeatureName, setNewFeatureName] = useState('');
  const [newFeatureDescription, setNewFeatureDescription] = useState('');

  const filteredFeatures = features.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddFeature = () => {
    if (!newFeatureName.trim()) {
      toast.error('Feature name is required');
      return;
    }
    
    const newFeature: Feature = {
      id: newFeatureName.toLowerCase().replace(/\s+/g, '-'),
      name: newFeatureName,
      description: newFeatureDescription,
      enabled: false,
      companyCount: 0,
    };
    
    setFeatures([...features, newFeature]);
    setNewFeatureName('');
    setNewFeatureDescription('');
    setShowAddFeature(false);
    toast.success(`Feature "${newFeatureName}" created successfully`);
  };

  const handleToggleFeature = (featureId: string) => {
    setFeatures(features.map(f => 
      f.id === featureId ? { ...f, enabled: !f.enabled } : f
    ));
    const feature = features.find(f => f.id === featureId);
    toast.success(`Feature "${feature?.name}" ${feature?.enabled ? 'disabled' : 'enabled'}`);
  };

  const handleDeleteFeature = (featureId: string) => {
    const feature = features.find(f => f.id === featureId);
    setFeatures(features.filter(f => f.id !== featureId));
    toast.success(`Feature "${feature?.name}" deleted`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-slide-in">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary/10">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Feature Access</h1>
            <p className="text-muted-foreground">Manage available features and their access</p>
          </div>
        </div>

        {/* Features Section */}
        <div className="stat-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">All Features</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <Dialog open={showAddFeature} onOpenChange={setShowAddFeature}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Feature
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Feature</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Feature Name</Label>
                      <Input 
                        placeholder="Enter feature name" 
                        value={newFeatureName}
                        onChange={(e) => setNewFeatureName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Input 
                        placeholder="Enter feature description" 
                        value={newFeatureDescription}
                        onChange={(e) => setNewFeatureDescription(e.target.value)}
                      />
                    </div>
                    <Button className="w-full" onClick={handleAddFeature}>
                      Create Feature
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFeatures.map((feature) => (
              <div
                key={feature.id}
                className="p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{feature.name}</p>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    {feature.enabled ? (
                      <span className="flex items-center gap-1 text-xs text-success">
                        <CheckCircle2 className="w-4 h-4" />
                        Enabled
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <XCircle className="w-4 h-4" />
                        Disabled
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      • {feature.companyCount} companies
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleToggleFeature(feature.id)}
                    >
                      {feature.enabled ? 'Disable' : 'Enable'}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteFeature(feature.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredFeatures.length === 0 && (
            <div className="p-6 rounded-xl border border-dashed border-border text-center text-muted-foreground">
              No features found matching your search.
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

