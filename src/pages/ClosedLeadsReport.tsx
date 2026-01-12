import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { CheckCircle2, DollarSign, TrendingUp, Calendar, Target, FileText } from 'lucide-react';
import { useMemo } from 'react';
import { mockLeads, mockPastLeads } from '@/data/mockData';

// Mock weekly closed leads data
const weeklyClosedLeadsData = [
  { day: 'Mon', closed: 0, revenue: 0 },
  { day: 'Tue', closed: 1, revenue: 52000 },
  { day: 'Wed', closed: 0, revenue: 0 },
  { day: 'Thu', closed: 2, revenue: 127000 },
  { day: 'Fri', closed: 1, revenue: 75000 },
];

export default function ClosedLeadsReport() {
  const { user } = useAuth();

  // Calculate stats from closed leads for current user
  const closedLeadsStats = useMemo(() => {
    const allLeads = [...mockLeads, ...mockPastLeads];
    const closedLeads = allLeads.filter(
      lead => lead.status === 'closed' && lead.assignedToId === user?.id
    );
    
    const totalClosed = closedLeads.length;
    const totalRevenue = closedLeads.reduce((sum, lead) => sum + lead.value, 0);
    const avgDealValue = totalClosed > 0 ? totalRevenue / totalClosed : 0;
    const weeklyClosed = weeklyClosedLeadsData.reduce((sum, day) => sum + day.closed, 0);
    const weeklyRevenue = weeklyClosedLeadsData.reduce((sum, day) => sum + day.revenue, 0);
    
    return {
      totalClosed,
      totalRevenue,
      avgDealValue,
      weeklyClosed,
      weeklyRevenue,
    };
  }, [user?.id]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Closed Leads Report</h1>
          <p className="text-muted-foreground">Performance overview for closed deals this week</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="stat-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/10">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Closed This Week</p>
                  <p className="text-2xl font-bold">{closedLeadsStats.weeklyClosed}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Weekly Revenue</p>
                  <p className="text-2xl font-bold">${closedLeadsStats.weeklyRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Deal Value</p>
                  <p className="text-2xl font-bold">${Math.round(closedLeadsStats.avgDealValue).toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Target className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Closed</p>
                  <p className="text-2xl font-bold">{closedLeadsStats.totalClosed}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Deals Closed This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyClosedLeadsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="closed" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyClosedLeadsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => `$${value.toLocaleString()}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Closed Leads */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Closed Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(() => {
                const allLeads = [...mockLeads, ...mockPastLeads];
                const closedLeads = allLeads
                  .filter(lead => lead.status === 'closed' && lead.assignedToId === user?.id)
                  .slice(0, 5);
                
                if (closedLeads.length === 0) {
                  return (
                    <div className="p-8 text-center border border-dashed border-border rounded-xl">
                      <CheckCircle2 className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                      <p className="text-muted-foreground">No closed deals yet. Keep closing!</p>
                    </div>
                  );
                }
                
                return closedLeads.map((lead) => (
                  <div key={lead.id} className="p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-success/10">
                          <CheckCircle2 className="w-5 h-5 text-success" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{lead.company}</p>
                          <p className="text-sm text-muted-foreground">{lead.contact}</p>
                          {lead.notes && (
                            <p className="text-xs text-muted-foreground mt-1">{lead.notes}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-success">${lead.value.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Closed</p>
                      </div>
                    </div>
                  </div>
                ));
              })()}
            </div>
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Performance Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">This Week</span>
                </div>
                <p className="text-sm text-foreground">
                  You closed <strong>{closedLeadsStats.weeklyClosed} deals</strong> this week, 
                  generating <strong>${closedLeadsStats.weeklyRevenue.toLocaleString()}</strong> in revenue. 
                  Your average deal value is <strong>${Math.round(closedLeadsStats.avgDealValue).toLocaleString()}</strong>.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-success/5 border border-success/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium text-success">All Time</span>
                </div>
                <p className="text-sm text-foreground">
                  You've closed <strong>{closedLeadsStats.totalClosed} deals</strong> total, 
                  with a cumulative value of <strong>${closedLeadsStats.totalRevenue.toLocaleString()}</strong>. 
                  Keep up the great work!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
