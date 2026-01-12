import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { EditCompanyDialog } from '@/components/admin/EditCompanyDialog';
import { CompanyFeaturesDialog } from '@/components/admin/CompanyFeaturesDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Building2, 
  Users, 
  Shield, 
  Plus, 
  Search,
  Settings,
  Trash2,
  Edit
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface Company {
  id: string;
  name: string;
  managerEmails: string[];
  features: string[];
  userCount: number;
}

const mockCompanies: Company[] = [
  { id: '1', name: 'Acme Corp', managerEmails: ['manager@acme.com'], features: ['analytics', 'reassignment'], userCount: 24 },
  { id: '2', name: 'TechStart Inc', managerEmails: ['admin@techstart.com'], features: ['analytics'], userCount: 12 },
  { id: '3', name: 'Global Sales Co', managerEmails: ['lead@globalsales.com', 'manager@globalsales.com'], features: ['analytics', 'reassignment', 'ai-chat'], userCount: 56 },
];

const allFeatures = [
  { id: 'analytics', name: 'Team Analytics', description: 'View team performance metrics' },
  { id: 'reassignment', name: 'Lead Reassignment', description: 'Reassign leads between reps' },
  { id: 'ai-chat', name: 'AI Call Chat', description: 'AI-powered transcript analysis' },
  { id: 'custom-onboarding', name: 'Custom Onboarding', description: 'Customize onboarding emails' },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const [companies, setCompanies] = useState(mockCompanies);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddCompany, setShowAddCompany] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newManagerEmail, setNewManagerEmail] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isFeaturesDialogOpen, setIsFeaturesDialogOpen] = useState(false);

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditCompany = (companyId: string) => {
    const company = companies.find(c => c.id === companyId);
    if (!company) return;
    setSelectedCompany(company);
    setIsEditDialogOpen(true);
  };

  const handleManageFeatures = (companyId: string) => {
    const company = companies.find(c => c.id === companyId);
    if (!company) return;
    setSelectedCompany(company);
    setIsFeaturesDialogOpen(true);
  };

  const handleSaveCompany = (updatedCompany: Company) => {
    setCompanies((prev) =>
      prev.map((company) =>
        company.id === updatedCompany.id ? updatedCompany : company
      )
    );
    toast.success(`Company "${updatedCompany.name}" updated successfully`);
  };

  const handleDeleteCompany = (companyId: string) => {
    const company = companies.find(c => c.id === companyId);
    setCompanies(companies.filter(c => c.id !== companyId));
    toast.success(`Company "${company?.name}" deleted`);
  };

  const handleAddCompany = () => {
    if (!newCompanyName.trim()) {
      toast.error('Company name is required');
      return;
    }
    
    const newCompany: Company = {
      id: String(companies.length + 1),
      name: newCompanyName.trim(),
      managerEmails: newManagerEmail.trim() ? [newManagerEmail.trim()] : [],
      features: [],
      userCount: 0,
    };
    
    setCompanies([...companies, newCompany]);
    setNewCompanyName('');
    setNewManagerEmail('');
    setShowAddCompany(false);
    toast.success(`Company "${newCompany.name}" added successfully`);
  };

  return (
    <div className="space-y-8 animate-slide-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Admin <span className="text-gradient-primary">Control Panel</span>
        </h1>
        <p className="text-muted-foreground mt-1">Manage companies, users, and feature access.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="metric-label">Total Companies</p>
              <p className="text-2xl font-bold text-foreground">{companies.length}</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-success/10">
              <Users className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="metric-label">Total Users</p>
              <p className="text-2xl font-bold text-foreground">
                {companies.reduce((acc, c) => acc + c.userCount, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-warning/10">
              <Shield className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="metric-label">Active Features</p>
              <p className="text-2xl font-bold text-foreground">{allFeatures.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Companies Section */}
      <div className="stat-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Companies</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            <Dialog open={showAddCompany} onOpenChange={setShowAddCompany}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Company
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Company</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Company Name</Label>
                    <Input 
                      placeholder="Enter company name" 
                      value={newCompanyName}
                      onChange={(e) => setNewCompanyName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Manager Email (whitelist)</Label>
                    <Input 
                      placeholder="manager@company.com" 
                      value={newManagerEmail}
                      onChange={(e) => setNewManagerEmail(e.target.value)}
                      type="email"
                    />
                  </div>
                  <Button className="w-full" onClick={handleAddCompany}>
                    Create Company
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="space-y-3">
          {filteredCompanies.map((company) => (
            <div
              key={company.id}
              className="p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{company.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {company.userCount} users • {company.features.length} features enabled
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleManageFeatures(company.id)}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Features
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditCompany(company.id)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDeleteCompany(company.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Features List */}
              <div className="mt-4 flex flex-wrap gap-2">
                {company.features.map((feature) => (
                  <span key={feature} className="px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20">
                    {allFeatures.find(f => f.id === feature)?.name || feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Access Management */}
      <div className="stat-card">
        <h2 className="text-lg font-semibold text-foreground mb-6">Available Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allFeatures.map((feature) => (
            <div key={feature.id} className="p-4 rounded-lg bg-secondary/50 border border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{feature.name}</p>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <EditCompanyDialog
        company={selectedCompany}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleSaveCompany}
      />

      <CompanyFeaturesDialog
        company={selectedCompany}
        open={isFeaturesDialogOpen}
        onOpenChange={setIsFeaturesDialogOpen}
        onSave={handleSaveCompany}
        availableFeatures={allFeatures}
      />
    </div>
  );
}
