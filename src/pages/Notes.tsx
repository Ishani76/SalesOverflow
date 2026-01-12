import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { mockCallInsights } from '@/data/mockData';
import { CallInsight } from '@/types/user';
import { FileText, Search, CheckCircle2, XCircle, Clock, Building2, User, Edit } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function Notes() {
  const [callNotes, setCallNotes] = useState(mockCallInsights);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterQualified, setFilterQualified] = useState<'all' | 'qualified' | 'unqualified'>('all');
  const [selectedNote, setSelectedNote] = useState<CallInsight | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [noteText, setNoteText] = useState('');

  const filteredNotes = callNotes.filter(note => {
    const matchesSearch = 
      note.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.keyMatches.some(match => match.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = 
      filterQualified === 'all' ||
      (filterQualified === 'qualified' && note.qualified) ||
      (filterQualified === 'unqualified' && !note.qualified);
    
    return matchesSearch && matchesFilter;
  });

  const handleEditNote = (note: CallInsight) => {
    setSelectedNote(note);
    setNoteText(note.notes || '');
    setIsEditDialogOpen(true);
  };

  const handleSaveNote = () => {
    if (!selectedNote) return;

    setCallNotes((prev) =>
      prev.map((note) =>
        note.id === selectedNote.id ? { ...note, notes: noteText.trim() } : note
      )
    );
    
    toast.success('Note saved successfully');
    setIsEditDialogOpen(false);
    setSelectedNote(null);
    setNoteText('');
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-slide-in">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary/10">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Call Notes</h1>
            <p className="text-muted-foreground">Review call insights and key information from your calls</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by company, contact, or key matches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterQualified === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterQualified('all')}
            >
              All
            </Button>
            <Button
              variant={filterQualified === 'qualified' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterQualified('qualified')}
            >
              Qualified
            </Button>
            <Button
              variant={filterQualified === 'unqualified' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterQualified('unqualified')}
            >
              Unqualified
            </Button>
          </div>
        </div>

        {/* Call Notes List */}
        <div className="space-y-4">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="stat-card p-6 hover:border-primary/40 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{note.company}</h3>
                      {note.qualified ? (
                        <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20">
                          <CheckCircle2 className="w-3 h-3" />
                          Qualified
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border">
                          <XCircle className="w-3 h-3" />
                          Unqualified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{note.contact}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{note.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditNote(note)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>

              {/* Notes */}
              {note.notes && (
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm font-medium text-foreground mb-2">Notes:</p>
                  <p className="text-sm text-foreground whitespace-pre-wrap">{note.notes}</p>
                </div>
              )}

              {/* Key Matches */}
              {note.keyMatches.length > 0 && (
                <div className={`mt-4 pt-4 border-t border-border ${note.notes ? '' : 'mt-0 pt-0 border-t-0'}`}>
                  <p className="text-sm font-medium text-foreground mb-2">Key Matches:</p>
                  <div className="flex flex-wrap gap-2">
                    {note.keyMatches.map((match, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                      >
                        {match}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <div className="stat-card p-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No call notes found matching your search criteria.</p>
          </div>
        )}
      </div>

      {/* Edit Note Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Notes</DialogTitle>
            <DialogDescription>
              Add notes for {selectedNote?.company}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Enter your notes about this call..."
                rows={6}
                className="resize-none"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsEditDialogOpen(false);
              setSelectedNote(null);
              setNoteText('');
            }}>
              Cancel
            </Button>
            <Button onClick={handleSaveNote}>
              Save Notes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}

