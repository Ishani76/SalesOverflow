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
import { Checkbox } from '@/components/ui/checkbox';
import { Users } from 'lucide-react';

interface UserGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  permissions: string[];
}

interface EditUserGroupDialogProps {
  group: UserGroup | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (group: UserGroup) => void;
}

const availablePermissions = [
  { id: 'view_leads', label: 'View Leads' },
  { id: 'edit_leads', label: 'Edit Leads' },
  { id: 'reassign_leads', label: 'Reassign Leads' },
  { id: 'create_notes', label: 'Create Notes' },
  { id: 'view_all', label: 'View All' },
  { id: 'edit_all', label: 'Edit All' },
  { id: 'reassign_all', label: 'Reassign All' },
  { id: 'view_analytics', label: 'View Analytics' },
  { id: 'manage_users', label: 'Manage Users' },
  { id: 'manage_groups', label: 'Manage Groups' },
];

export function EditUserGroupDialog({ group, open, onOpenChange, onSave }: EditUserGroupDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [permissions, setPermissions] = useState<string[]>([]);

  useEffect(() => {
    if (group) {
      setName(group.name);
      setDescription(group.description);
      setPermissions([...group.permissions]);
    }
  }, [group, open]);

  const handleTogglePermission = (permissionId: string) => {
    setPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((p) => p !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleSave = () => {
    if (!group) return;

    if (!name.trim()) {
      return;
    }

    const updatedGroup: UserGroup = {
      ...group,
      name: name.trim(),
      description: description.trim(),
      permissions,
    };

    onSave(updatedGroup);
    onOpenChange(false);
  };

  if (!group) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            Edit User Group
          </DialogTitle>
          <DialogDescription>
            Update group information and permissions
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Group Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter group name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter group description"
            />
          </div>

          <div className="space-y-3">
            <Label>Permissions</Label>
            <div className="grid grid-cols-2 gap-3 p-4 rounded-lg bg-secondary/50 border border-border">
              {availablePermissions.map((permission) => (
                <div key={permission.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={permission.id}
                    checked={permissions.includes(permission.id)}
                    onCheckedChange={() => handleTogglePermission(permission.id)}
                  />
                  <label
                    htmlFor={permission.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {permission.label}
                  </label>
                </div>
              ))}
            </div>
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
