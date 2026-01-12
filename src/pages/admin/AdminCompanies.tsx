import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Building2, Plus, Search, Settings, Trash2, Edit } from 'lucide-react';
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

export default function AdminCompanies() {
  const [companies, setCompanies] = useState(mockCompanies);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddCompany, setShowAddCompany] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newManagerEmail, setNewManagerEmail] = useState('');

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCompany = () => {
    if (!newCompanyName.trim()) {
      toast.error('Company name is required');
      return;
    }
    
    const newCompany: Company = {
      id: String(companies.length + 1),
      name: newCompanyName,
      managerEmails: newManagerEmail ? [newManagerEmail] : [],
      features: [],
      userCount: 0,
    };
    
    setCompanies([...companies, newCompany]);
    setNewCompanyName('');
    setNewManagerEmail('');
    setShowAddCompany(false);
    toast.success(`Company "${newCompanyName}" added successfully`);
  };

  const handleDeleteCompany = (companyId: string) => {
    const company = companies.find(c => c.id === companyId);
    setCompanies(companies.filter(c => c.id !== companyId));
    toast.success(`Company "${company?.name}" deleted`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-slide-in">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary/10">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Companies</h1>
            <p className="text-muted-foreground">Manage company accounts and settings</p>
          </div>
        </div>

        {/* Companies Section */}
        <div className="stat-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">All Companies</h2>
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
                      {company.managerEmails.length > 0 && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Managers: {company.managerEmails.join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Features
                    </Button>
                    <Button variant="outline" size="sm">
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
              </div>
            ))}
          </div>

          {filteredCompanies.length === 0 && (
            <div className="p-6 rounded-xl border border-dashed border-border text-center text-muted-foreground">
              No companies found matching your search.
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

