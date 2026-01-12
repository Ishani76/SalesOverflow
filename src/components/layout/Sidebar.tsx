import { useAuth } from '@/contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Calendar, 
  Settings, 
  Building2,
  FileText,
  Shield,
  ChevronDown,
  Zap,
  LogOut
} from 'lucide-react';
import { UserRole } from '@/types/user';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const roleLabels: Record<UserRole, string> = {
  sdr: 'SDR',
  sales_rep: 'Sales Rep',
  manager: 'Manager',
  sysadmin: 'Sys Admin',
};

const roleMenuItems: Record<UserRole, { label: string; icon: React.ElementType; path: string }[]> = {
  manager: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Team Analytics', icon: BarChart3, path: '/analytics' },
    { label: 'Lead Reassignment', icon: Users, path: '/leads/reassign' },
    { label: 'User Management', icon: Settings, path: '/users' },
  ],
  sales_rep: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: "Today's Leads", icon: Calendar, path: '/leads/today' },
    { label: 'Past Leads', icon: FileText, path: '/leads/past' },
    { label: 'Closed Leads Report', icon: BarChart3, path: '/reports/closed-leads' },
  ],
  sdr: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Weekly Report', icon: BarChart3, path: '/reports/weekly' },
    { label: 'Call Notes', icon: FileText, path: '/notes' },
  ],
  sysadmin: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Companies', icon: Building2, path: '/admin/companies' },
    { label: 'User Groups', icon: Users, path: '/admin/users' },
    { label: 'Feature Access', icon: Shield, path: '/admin/features' },
  ],
};

export function Sidebar() {
  const { user, switchRole, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) return null;

  const menuItems = roleMenuItems[user.role];

  const handleRoleSwitch = (newRole: UserRole) => {
    const newRoleMenuItems = roleMenuItems[newRole];
    const isCurrentRouteAccessible = newRoleMenuItems.some(item => item.path === location.pathname);
    
    // If current route is not accessible to the new role, navigate to dashboard
    if (!isCurrentRouteAccessible) {
      navigate('/dashboard');
    }
    
    // Switch the role
    switchRole(newRole);
  };

  return (
    <aside className="w-64 bg-sidebar h-screen flex flex-col border-r border-sidebar-border">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
          <Zap className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-bold text-foreground">SalesFlow</h1>
          <p className="text-xs text-muted-foreground">Lead Management System</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`sidebar-item w-full ${isActive ? 'active' : ''}`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Workspace */}
      <div className="p-3 border-t border-sidebar-border">
        <p className="text-xs text-muted-foreground uppercase tracking-wider px-4 mb-2">
          User Workspace
        </p>
        
        <DropdownMenu>
          <DropdownMenuTrigger className="sidebar-item w-full justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5" />
              <span>{roleLabels[user.role]}</span>
            </div>
            <ChevronDown className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {(Object.keys(roleLabels) as UserRole[]).map((role) => (
              <DropdownMenuItem key={role} onClick={() => handleRoleSwitch(role)}>
                {roleLabels[role]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* User Info */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="avatar-circle bg-primary text-primary-foreground">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{roleLabels[user.role]}</p>
          </div>
          <button 
            onClick={logout}
            className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
          >
            <LogOut className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </aside>
  );
}
