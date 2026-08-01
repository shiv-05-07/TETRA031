import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Plus, 
  GraduationCap, 
  BookOpen, 
  MapPin, 
  Sparkles,
  Clock,
  UserCheck,
  X,
  Globe,
  Building
} from 'lucide-react';
import { ThemeMode, InstitutionWorkspace, AcademicRole } from '../../types';
import { WorkspaceSetupWizard, InitialWorkspaceData } from './WorkspaceSetupWizard';

interface InstitutionSelectorProps {
  theme: ThemeMode;
  onSelectInstitution: (workspace: InstitutionWorkspace, action?: 'default' | 'upload') => void;
  userRole?: AcademicRole;
}

export const defaultInstitutions: InstitutionWorkspace[] = [
  {
    id: 'mit',
    name: 'Massachusetts Institute of Technology',
    shortName: 'MIT',
    location: 'Cambridge, Massachusetts, USA',
    department: 'Department of Electrical Engineering & Computer Science (EECS)',
    activeSyllabi: 42,
    accreditationStatus: 'ABET Ready',
    logoBadge: 'MIT',
    logoColor: '#A31F34',
    role: 'HOD',
    isPrimary: true,
    lastActive: 'Active 10m ago',
    type: 'University',
    country: 'United States'
  },
  {
    id: 'nit-surat',
    name: 'Sardar Vallabhbhai National Institute of Technology',
    shortName: 'NIT Surat',
    location: 'Surat, Gujarat, India',
    department: 'Department of Computer Engineering',
    activeSyllabi: 31,
    accreditationStatus: 'NBA Tier-I',
    logoBadge: 'NIT',
    logoColor: '#10B981',
    role: 'Professor',
    lastActive: 'Active 2h ago',
    type: 'Engineering College',
    country: 'India'
  },
  {
    id: 'stanford',
    name: 'Stanford University',
    shortName: 'Stanford',
    location: 'Stanford, California, USA',
    department: 'School of Engineering · Computer Science Division',
    activeSyllabi: 36,
    accreditationStatus: 'ABET Criterion 3 Verified',
    logoBadge: 'SU',
    logoColor: '#8C1515',
    role: 'Dean',
    lastActive: 'Active 1d ago',
    type: 'University',
    country: 'United States'
  },
  {
    id: 'oxford',
    name: 'University of Oxford',
    shortName: 'Oxford',
    location: 'Oxford, United Kingdom',
    department: 'Department of Computer Science & Mathematical Institute',
    activeSyllabi: 28,
    accreditationStatus: 'QAA Aligned & BCS Accredited',
    logoBadge: 'OX',
    logoColor: '#002147',
    role: 'Curriculum Committee',
    lastActive: 'Active 3d ago',
    type: 'University',
    country: 'United Kingdom'
  }
];

export const InstitutionSelector: React.FC<InstitutionSelectorProps> = ({
  theme,
  onSelectInstitution,
  userRole = 'Professor'
}) => {
  const isDark = theme === 'dark';

  // Workspaces list state
  const [workspaces, setWorkspaces] = useState<InstitutionWorkspace[]>(defaultInstitutions);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<string>('mit');

  // Modal / Wizard state
  const [showInitialModal, setShowInitialModal] = useState(false);
  const [showFullWizard, setShowFullWizard] = useState(false);

  // Initial Modal Inputs
  const [modalInstName, setModalInstName] = useState('');
  const [modalDept, setModalDept] = useState('');
  const [modalCountry, setModalCountry] = useState('United States');
  const [wizardInitialData, setWizardInitialData] = useState<InitialWorkspaceData | undefined>();

  const filteredWorkspaces = workspaces.filter(inst => 
    inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inst.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inst.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inst.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedInst = workspaces.find(i => i.id === selectedId) || workspaces[0];

  // Open Initial Modal
  const handleOpenCreateModal = () => {
    setModalInstName('');
    setModalDept('Computer Science & Engineering');
    setModalCountry('United States');
    setShowInitialModal(true);
  };

  // Continue from Initial Modal -> Full Wizard
  const handleModalContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalInstName.trim()) return;
    
    setWizardInitialData({
      name: modalInstName.trim(),
      department: modalDept.trim() || 'Computer Science & Engineering',
      country: modalCountry.trim() || 'United States'
    });

    setShowInitialModal(false);
    setShowFullWizard(true);
  };

  // On Wizard Completed -> Add workspace & Enter Dashboard!
  const handleWizardCompleted = (newWorkspace: InstitutionWorkspace, action: 'default' | 'upload' = 'default') => {
    setWorkspaces(prev => [newWorkspace, ...prev]);
    setSelectedId(newWorkspace.id);
    setShowFullWizard(false);
    
    // Enter Workspace directly!
    onSelectInstitution(newWorkspace, action);
  };

  return (
    <div className="space-y-6 relative">
      {/* Title & Header */}
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
          <Building2 className="w-3.5 h-3.5" />
          <span>Institutional Access</span>
        </div>
        <h2 className="font-heading font-bold text-2xl sm:text-3xl tracking-tight">Select Workspace</h2>
        <p className={`text-xs sm:text-sm ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>
          Choose an institutional workspace associated with your account.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className={`w-4 h-4 absolute left-3.5 top-3.5 ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by institution name, location, or department..."
          className={`w-full text-xs font-medium pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all ${
            isDark 
              ? 'bg-[#0A0A0A] border-[#262626] text-[#FAFAFA] placeholder-[#525252]' 
              : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF]'
          }`}
        />
      </div>

      {/* Workspace Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[380px] overflow-y-auto pr-1">
        {filteredWorkspaces.map((inst) => {
          const isSelected = inst.id === selectedId;
          return (
            <motion.div
              key={inst.id}
              onClick={() => setSelectedId(inst.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#10B981]/10 border-[#10B981] shadow-md ring-1 ring-[#10B981]'
                  : isDark
                  ? 'bg-[#0A0A0A] border-[#262626] hover:border-[#10B981]/50'
                  : 'bg-[#F8FAFC] border-[#E5E7EB] hover:border-[#10B981]/50 shadow-2xs'
              }`}
            >
              {/* Card Header: Logo Badge & Selected Indicator */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-heading font-extrabold text-sm text-white shadow-sm flex-shrink-0"
                    style={{ backgroundColor: inst.logoColor || '#10B981' }}
                  >
                    {inst.logoBadge}
                  </div>
                  <div>
                    <div className="font-heading font-bold text-sm leading-tight line-clamp-1">
                      {inst.name}
                    </div>
                    <div className={`text-[10px] flex items-center gap-1.5 mt-0.5 ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>
                      <MapPin className="w-3 h-3 text-[#10B981]" />
                      <span className="line-clamp-1">{inst.location}</span>
                    </div>
                  </div>
                </div>

                {isSelected ? (
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                ) : (
                  <div className={`w-4 h-4 rounded-full border ${isDark ? 'border-[#333]' : 'border-[#CBD5E1]'}`} />
                )}
              </div>

              {/* Department & Role Details */}
              <div className="space-y-2 pt-2 border-t border-current/10">
                <p className={`text-[11px] font-medium leading-tight line-clamp-1 ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                  {inst.department}
                </p>

                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="flex items-center gap-1 text-[#10B981] font-semibold">
                    <BookOpen className="w-3.5 h-3.5" />
                    {inst.activeSyllabi} Courses
                  </span>
                  
                  {/* Role Badge */}
                  <span className={`px-2 py-0.5 rounded-md font-bold border ${
                    isDark ? 'bg-[#181818] border-[#333] text-[#34D399]' : 'bg-[#E2E8F0] border-[#CBD5E1] text-[#059669]'
                  }`}>
                    Role: {inst.role}
                  </span>
                </div>
              </div>

              {/* Accreditation & Last Active Footer */}
              <div className="mt-3 pt-2 flex items-center justify-between text-[10px] border-t border-current/10">
                <span className="flex items-center gap-1 text-[#10B981] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {inst.accreditationStatus}
                </span>

                <span className={`flex items-center gap-1 ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>
                  <Clock className="w-3 h-3" />
                  {inst.lastActive || 'Active recently'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* BOTTOM CARD: Replace "Register Institution" with "+ Create New Workspace" */}
      <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
        isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center flex-shrink-0">
            <Plus className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold font-heading flex items-center gap-2">
              <span>＋ Create New Workspace</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#10B981]/20 text-[#10B981] font-mono font-bold">
                ENTERPRISE
              </span>
            </div>
            <div className={`text-[11px] ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>
              Create a new institutional workspace for your university or department.
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenCreateModal}
          className="w-full sm:w-auto py-2.5 px-4 text-xs font-bold text-white rounded-xl bg-[#10B981] hover:bg-[#34D399] active:scale-[0.99] shadow-md shadow-[#10B981]/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create Workspace</span>
        </button>
      </div>

      {/* Confirm & Enter Selected Workspace Button */}
      {selectedInst && (
        <button
          type="button"
          onClick={() => onSelectInstitution(selectedInst)}
          className="w-full py-3.5 px-4 text-xs font-bold text-white rounded-xl bg-[#10B981] hover:bg-[#34D399] active:scale-[0.99] shadow-lg shadow-[#10B981]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Enter {selectedInst.shortName} Workspace</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}

      {/* CREATE WORKSPACE INITIAL MODAL */}
      <AnimatePresence>
        {showInitialModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className={`w-full max-w-md p-6 sm:p-8 rounded-[22px] border shadow-2xl relative ${
                isDark ? 'bg-[#111111] border-[#262626] text-[#FAFAFA]' : 'bg-[#FFFFFF] border-[#E5E7EB] text-[#111827]'
              }`}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowInitialModal(false)}
                className={`absolute right-4 top-4 p-1.5 rounded-xl border transition-colors ${
                  isDark ? 'bg-[#171717] border-[#262626] text-[#888] hover:text-white' : 'bg-[#F1F5F9] border-[#CBD5E1] text-[#64748B]'
                }`}
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1.5 mb-5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
                  <Building2 className="w-3 h-3" />
                  <span>NEW ORGANIZATION</span>
                </div>
                <h3 className="font-heading font-bold text-xl tracking-tight">Create New Workspace</h3>
                <p className={`text-xs ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>
                  Set up a dedicated AI curriculum workspace for your university or department.
                </p>
              </div>

              <form onSubmit={handleModalContinue} className="space-y-4">
                {/* Institution Name */}
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                    Institution Name *
                  </label>
                  <div className="relative">
                    <Building className={`w-4 h-4 absolute left-3.5 top-3 ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`} />
                    <input
                      type="text"
                      required
                      value={modalInstName}
                      onChange={(e) => setModalInstName(e.target.value)}
                      placeholder="e.g. Carnegie Mellon University"
                      className={`w-full text-xs font-medium pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#10B981] ${
                        isDark ? 'bg-[#0A0A0A] border-[#262626] text-[#FAFAFA] placeholder-[#525252]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827]'
                      }`}
                    />
                  </div>
                </div>

                {/* Department */}
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                    Department *
                  </label>
                  <input
                    type="text"
                    required
                    value={modalDept}
                    onChange={(e) => setModalDept(e.target.value)}
                    placeholder="e.g. Computer Science & Engineering"
                    className={`w-full text-xs font-medium px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#10B981] ${
                      isDark ? 'bg-[#0A0A0A] border-[#262626] text-[#FAFAFA] placeholder-[#525252]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827]'
                    }`}
                  />
                </div>

                {/* Country */}
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                    Country *
                  </label>
                  <div className="relative">
                    <Globe className={`w-4 h-4 absolute left-3.5 top-3 ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`} />
                    <input
                      type="text"
                      required
                      value={modalCountry}
                      onChange={(e) => setModalCountry(e.target.value)}
                      placeholder="e.g. United States / India"
                      className={`w-full text-xs font-medium pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#10B981] ${
                        isDark ? 'bg-[#0A0A0A] border-[#262626] text-[#FAFAFA] placeholder-[#525252]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827]'
                      }`}
                    />
                  </div>
                </div>

                {/* Continue Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 text-xs font-bold text-white rounded-xl bg-[#10B981] hover:bg-[#34D399] shadow-lg shadow-[#10B981]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Continue →</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FULL SCREEN 5-STEP WORKSPACE SETUP WIZARD */}
      <AnimatePresence>
        {showFullWizard && (
          <WorkspaceSetupWizard
            theme={theme}
            initialData={wizardInitialData}
            onClose={() => setShowFullWizard(false)}
            onCompleteWorkspace={handleWizardCompleted}
          />
        )}
      </AnimatePresence>

    </div>
  );
};
