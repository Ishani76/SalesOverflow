import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, Plus, Search, Edit, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface UserGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  permissions: string[];
}

const mockUserGroups: UserGroup[] = [
  { 
    id: '1', 
    name: 'Sales Team Alpha', 
    description: 'Primary sales team for enterprise accounts',
    memberCount: 12,
    permissions: ['view_leads', 'edit_leads', 'reassign_leads']
  },
  { 
    id: '2', 
    name: 'SDR Team', 
    description: 'Sales development representatives',
    memberCount: 8,
    permissions: ['view_leads', 'create_notes']
  },
  { 
    id: '3', 
    name: 'Management', 
    description: 'Team managers and supervisors',
    memberCount: 4,
    permissions: ['view_all', 'edit_all', 'reassign_all', 'view_analytics']
  },
];

export default function AdminUsers() {
  const [userGroups, setUserGroups] = useState(mockUserGroups);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');

  const filteredGroups = userGroups.filter(g => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddGroup = () => {
    if (!newGroupName.trim()) {
      toast.error('Group name is required');
      return;
    }
    
    const newGroup: UserGroup = {
      id: String(userGroups.length + 1),
      name: newGroupName,
      description: newGroupDescription,
      memberCount: 0,
      permissions: [],
    };
    
    setUserGroups([...userGroups, newGroup]);
    setNewGroupName('');
    setNewGroupDescription('');
    setShowAddGroup(false);
    toast.success(`User group "${newGroupName}" created successfully`);
  };

  const handleDeleteGroup = (groupId: string) => {
    const group = userGroups.find(g => g.id === groupId);
    setUserGroups(userGroups.filter(g => g.id !== groupId));
    toast.success(`User group "${group?.name}" deleted`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-slide-in">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary/10">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">User Groups</h1>
            <p className="text-muted-foreground">Manage user groups and their permissions</p>
          </div>
        </div>

        {/* User Groups Section */}
        <div className="stat-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">All User Groups</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search groups..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <Dialog open={showAddGroup} onOpenChange={setShowAddGroup}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Group
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New User Group</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Group Name</Label>
                      <Input 
                        placeholder="Enter group name" 
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Input 
                        placeholder="Enter group description" 
                        value={newGroupDescription}
                        onChange={(e) => setNewGroupDescription(e.target.value)}
                      />
                    </div>
                    <Button className="w-full" onClick={handleAddGroup}>
                      Create Group
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="space-y-3">
            {filteredGroups.map((group) => (
              <div
                key={group.id}
                className="p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{group.name}</p>
                      <p className="text-sm text-muted-foreground">{group.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {group.memberCount} members • {group.permissions.length} permissions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteGroup(group.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Permissions List */}
                {group.permissions.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.permissions.map((permission) => (
                      <span 
                        key={permission} 
                        className="px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20"
                      >
                        {permission.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredGroups.length === 0 && (
            <div className="p-6 rounded-xl border border-dashed border-border text-center text-muted-foreground">
              No user groups found matching your search.
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

