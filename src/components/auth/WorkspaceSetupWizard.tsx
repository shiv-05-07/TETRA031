import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Globe, 
  GraduationCap, 
  Users, 
  Cpu, 
  Database, 
  Layers, 
  Check, 
  Loader2, 
  Mail, 
  Phone, 
  User, 
  BookOpen, 
  BrainCircuit, 
  Network, 
  TrendingUp, 
  X,
  Send,
  Upload
} from 'lucide-react';
import { ThemeMode, InstitutionWorkspace, AcademicRole } from '../../types';

export interface InitialWorkspaceData {
  name: string;
  department: string;
  country: string;
}

interface WorkspaceSetupWizardProps {
  theme: ThemeMode;
  initialData?: InitialWorkspaceData;
  onClose: () => void;
  onCompleteWorkspace: (workspace: InstitutionWorkspace, action?: 'default' | 'upload') => void;
}

export const WorkspaceSetupWizard: React.FC<WorkspaceSetupWizardProps> = ({
  theme,
  initialData,
  onClose,
  onCompleteWorkspace
}) => {
  const isDark = theme === 'dark';

  // Wizard Step (1 to 5, where 5 is Provisioning & Success)
  const [step, setStep] = useState<number>(1);

  // Step 1: Institution Details
  const [instName, setInstName] = useState(initialData?.name || 'Carnegie Mellon University');
  const [instType, setInstType] = useState('University');
  const [country, setCountry] = useState(initialData?.country || 'United States');
  const [state, setState] = useState('Pennsylvania');
  const [city, setCity] = useState('Pittsburgh');
  const [website, setWebsite] = useState('https://cmu.edu');
  const [emailDomain, setEmailDomain] = useState('@cmu.edu');

  // Step 2: Academic Configuration
  const [selectedDepts, setSelectedDepts] = useState<string[]>([
    initialData?.department || 'Computer Engineering',
    'Information Technology',
    'AI & Data Science'
  ]);
  const [selectedAccreditations, setSelectedAccreditations] = useState<string[]>(['ABET', 'NBA']);
  const [academicCalendar, setAcademicCalendar] = useState('Semester Pattern');
  const [creditSystem, setCreditSystem] = useState('US Semester Credits');

  // Step 3: Administrator
  const [adminName, setAdminName] = useState('Dr. Eleanor Vance');
  const [adminRole, setAdminRole] = useState<AcademicRole>('Dean');
  const [adminEmail, setAdminEmail] = useState(`e.vance${emailDomain || '@cmu.edu'}`);
  const [adminPhone, setAdminPhone] = useState('+1 (412) 268-2000');

  // Step 4: AI Configuration
  const [primaryDiscipline, setPrimaryDiscipline] = useState('Computer Engineering & CS');
  const [aiModel, setAiModel] = useState('Gemini 1.5 Pro');
  const [curriculumFramework, setCurriculumFramework] = useState("Bloom's Taxonomy (2001 Revised)");
  const [enableKnowledgeGraph, setEnableKnowledgeGraph] = useState(true);
  const [enableSkillGap, setEnableSkillGap] = useState(true);
  const [enableAiModernization, setEnableAiModernization] = useState(true);
  const [enableIndustrySync, setEnableIndustrySync] = useState(true);

  // Step 5: Provisioning Progress State
  const [provisionProgress, setProvisionProgress] = useState(0);
  const [provisionStageIndex, setProvisionStageIndex] = useState(0);
  const [isProvisionComplete, setIsProvisionComplete] = useState(false);

  // Invite Faculty Modal Inside Success
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmails, setInviteEmails] = useState('');
  const [inviteSent, setInviteSent] = useState(false);

  // Provisioning Stages List
  const provisioningStages = [
    { label: 'Creating isolated workspace tenant & subdomain', icon: Building2 },
    { label: 'Initializing FERPA & SOC2 Type II database schema', icon: Database },
    { label: 'Synthesizing department Knowledge Graph nodes', icon: Network },
    { label: 'Connecting Gemini 1.5 Pro AI Intelligence Engine', icon: BrainCircuit },
    { label: 'Preparing Mission Control Dashboard & Analytics', icon: Cpu },
    { label: 'Importing ABET & IEEE Course Outcome Templates', icon: BookOpen }
  ];

  // Trigger step 5 animation when step === 5
  useEffect(() => {
    if (step === 5) {
      setProvisionProgress(0);
      setProvisionStageIndex(0);
      setIsProvisionComplete(false);

      const interval = setInterval(() => {
        setProvisionProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsProvisionComplete(true);
            return 100;
          }
          const next = prev + 2;
          // Update stage index based on progress
          const stageIdx = Math.min(
            Math.floor((next / 100) * provisioningStages.length),
            provisioningStages.length - 1
          );
          setProvisionStageIndex(stageIdx);
          return next;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [step]);

  // Generate Short Name from Institution Name
  const getShortName = (fullName: string) => {
    if (!fullName) return 'Workspace';
    const words = fullName.split(' ').filter(Boolean);
    if (words.length === 1) return words[0];
    if (words.length === 2) return words.join(' ');
    // Handle abbreviations like Carnegie Mellon University -> CMU
    const abbr = words.map(w => w[0].toUpperCase()).join('');
    if (abbr.length <= 4) return abbr;
    return words.slice(0, 2).join(' ');
  };

  const shortName = getShortName(instName);

  // Build the Final Workspace Object
  const createdWorkspace: InstitutionWorkspace = {
    id: `ws-${Date.now()}`,
    name: instName,
    shortName: shortName,
    location: `${city}, ${country}`,
    department: selectedDepts[0] || 'Computer Science & Engineering',
    activeSyllabi: 12,
    accreditationStatus: `${selectedAccreditations[0] || 'ABET'} Accredited`,
    logoBadge: shortName.substring(0, 3).toUpperCase(),
    logoColor: '#10B981',
    role: adminRole,
    isPrimary: true,
    lastActive: 'Active Just Now',
    type: instType,
    country: country
  };

  // Toggle Department Selection
  const toggleDept = (dept: string) => {
    if (selectedDepts.includes(dept)) {
      if (selectedDepts.length > 1) {
        setSelectedDepts(selectedDepts.filter(d => d !== dept));
      }
    } else {
      setSelectedDepts([...selectedDepts, dept]);
    }
  };

  // Toggle Accreditation Selection
  const toggleAccreditation = (acc: string) => {
    if (selectedAccreditations.includes(acc)) {
      if (selectedAccreditations.length > 1) {
        setSelectedAccreditations(selectedAccreditations.filter(a => a !== acc));
      }
    } else {
      setSelectedAccreditations([...selectedAccreditations, acc]);
    }
  };

  const handleSendInvites = (e: React.FormEvent) => {
    e.preventDefault();
    setInviteSent(true);
    setTimeout(() => {
      setShowInviteModal(false);
      setInviteSent(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
      
      {/* Confetti Particle Effect on Completion */}
      {isProvisionComplete && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: 1, 
                y: -20, 
                x: Math.random() * window.innerWidth,
                scale: Math.random() * 0.8 + 0.4
              }}
              animate={{ 
                opacity: [1, 1, 0], 
                y: window.innerHeight + 50,
                x: `calc(${Math.random() * 100 - 50}px + ${Math.random() * 100}vw)`
              }}
              transition={{ 
                duration: Math.random() * 3 + 2, 
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              className="absolute w-3 h-3 rounded-full"
              style={{
                backgroundColor: ['#10B981', '#34D399', '#6EE7B7', '#059669', '#3B82F6'][i % 5]
              }}
            />
          ))}
        </div>
      )}

      {/* Main Wizard Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className={`w-full max-w-3xl rounded-[24px] border shadow-2xl overflow-hidden relative flex flex-col my-auto ${
          isDark ? 'bg-[#111111] border-[#262626] text-[#FAFAFA]' : 'bg-[#FFFFFF] border-[#E5E7EB] text-[#111827]'
        }`}
      >
        {/* Header Bar */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#10B981] to-[#34D399] p-0.5 shadow-sm">
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${
                isDark ? 'bg-[#0A0A0A]' : 'bg-[#FFFFFF]'
              }`}>
                <GraduationCap className="w-4 h-4 text-[#10B981]" />
              </div>
            </div>
            <div>
              <div className="font-heading font-bold text-sm tracking-tight flex items-center gap-2">
                <span>Cirrcul<span className="text-[#10B981]">AI</span></span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#10B981]/10 text-[#10B981] font-mono font-bold">
                  Enterprise Onboarding
                </span>
              </div>
              <div className={`text-[11px] ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>
                Provisioning Institutional Workspace
              </div>
            </div>
          </div>

          {/* Step Dots & Exit Button */}
          <div className="flex items-center gap-4">
            {step < 5 && (
              <div className="hidden sm:flex items-center gap-1.5 font-mono text-xs font-semibold text-[#10B981]">
                <span>Step {step} of 4</span>
              </div>
            )}
            
            <button
              onClick={onClose}
              className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
                isDark ? 'bg-[#171717] border-[#262626] text-[#888] hover:text-white' : 'bg-[#F1F5F9] border-[#CBD5E1] text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Segmented Step Progress Line (Steps 1-4) */}
        {step < 5 && (
          <div className="w-full h-1 bg-[#10B981]/10 relative">
            <motion.div
              className="h-full bg-[#10B981]"
              initial={{ width: '25%' }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}

        {/* Main Content Area */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">

          {/* STEP 1: INSTITUTION DETAILS */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-5"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 mb-2">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Step 1: Institution Details</span>
                </div>
                <h2 className="font-heading font-bold text-xl sm:text-2xl tracking-tight">University Profile</h2>
                <p className={`text-xs sm:text-sm ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>
                  Enter your university credentials to verify accreditation boundaries
                </p>
              </div>

              <div className="space-y-4">
                {/* Institution Name */}
                <div>
                  <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                    Official Institution Name *
                  </label>
                  <input
                    type="text"
                    value={instName}
                    onChange={(e) => setInstName(e.target.value)}
                    placeholder="e.g. Carnegie Mellon University / NIT Surat / Oxford"
                    className={`w-full px-4 py-3 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#10B981] ${
                      isDark ? 'bg-[#0A0A0A] border-[#262626] text-white' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827]'
                    }`}
                  />
                </div>

                {/* Institution Type Grid */}
                <div>
                  <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                    Institution Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['University', 'Engineering College', 'Private Institute', 'Government Institute'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setInstType(type)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                          instType === type
                            ? 'bg-[#10B981]/15 border-[#10B981] text-[#10B981]'
                            : isDark ? 'bg-[#0A0A0A] border-[#262626] text-[#888] hover:text-white' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#475569] hover:text-[#111827]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Country, State, City */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                      Country *
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="e.g. United States / India"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#10B981] ${
                        isDark ? 'bg-[#0A0A0A] border-[#262626] text-white' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                      State / Province
                    </label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="e.g. Pennsylvania / Gujarat"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#10B981] ${
                        isDark ? 'bg-[#0A0A0A] border-[#262626] text-white' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                      City
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Pittsburgh / Surat"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#10B981] ${
                        isDark ? 'bg-[#0A0A0A] border-[#262626] text-white' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827]'
                      }`}
                    />
                  </div>
                </div>

                {/* Website & Email Domain Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                      Official Website URL
                    </label>
                    <div className="relative">
                      <Globe className={`w-4 h-4 absolute left-3.5 top-3 ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`} />
                      <input
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="https://cmu.edu"
                        className={`w-full pl-10 pr-3 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#10B981] ${
                          isDark ? 'bg-[#0A0A0A] border-[#262626] text-white' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827]'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                      Institution Email Domain
                    </label>
                    <div className="relative">
                      <Mail className={`w-4 h-4 absolute left-3.5 top-3 ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`} />
                      <input
                        type="text"
                        value={emailDomain}
                        onChange={(e) => setEmailDomain(e.target.value)}
                        placeholder="@cmu.edu / @nitsurat.ac.in"
                        className={`w-full pl-10 pr-3 py-2.5 rounded-xl border text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#10B981] ${
                          isDark ? 'bg-[#0A0A0A] border-[#262626] text-white' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827]'
                        }`}
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Step 1 Actions */}
              <div className="pt-4 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!instName.trim()}
                  className="py-3 px-6 text-xs font-bold text-white bg-[#10B981] hover:bg-[#34D399] rounded-xl shadow-lg shadow-[#10B981]/20 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  <span>Continue: Academic Config</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: ACADEMIC CONFIGURATION */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-5"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 mb-2">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Step 2: Academic Configuration</span>
                </div>
                <h2 className="font-heading font-bold text-xl sm:text-2xl tracking-tight">Departments & Accreditation</h2>
                <p className={`text-xs sm:text-sm ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>
                  Select active engineering departments, credit units, and accreditation standards
                </p>
              </div>

              <div className="space-y-4">
                {/* Select Departments Multi-Select Chips */}
                <div>
                  <label className={`block text-xs font-semibold mb-2 ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                    Target Departments (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      'Computer Engineering',
                      'Information Technology',
                      'Mechanical Engineering',
                      'Civil Engineering',
                      'Electrical Engineering',
                      'AI & Data Science',
                      'Robotics & Automation',
                      'Cyber Security'
                    ].map((dept) => {
                      const isSelected = selectedDepts.includes(dept);
                      return (
                        <button
                          key={dept}
                          type="button"
                          onClick={() => toggleDept(dept)}
                          className={`p-3 rounded-xl border text-xs font-semibold text-left flex items-center justify-between transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#10B981]/15 border-[#10B981] text-[#10B981]'
                              : isDark ? 'bg-[#0A0A0A] border-[#262626] text-[#888] hover:text-white' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#475569] hover:text-[#111827]'
                          }`}
                        >
                          <span className="line-clamp-1">{dept}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Accreditation Framework Selection */}
                <div>
                  <label className={`block text-xs font-semibold mb-2 ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                    Accreditation Standards
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['ABET', 'NBA', 'NAAC', 'Washington Accord'].map((acc) => {
                      const isSelected = selectedAccreditations.includes(acc);
                      return (
                        <button
                          key={acc}
                          type="button"
                          onClick={() => toggleAccreditation(acc)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#10B981]/15 border-[#10B981] text-[#10B981]'
                              : isDark ? 'bg-[#0A0A0A] border-[#262626] text-[#888] hover:text-white' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#475569]'
                          }`}
                        >
                          <span>{acc}</span>
                          {isSelected && <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Academic Calendar & Credit System Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                      Academic Calendar Structure
                    </label>
                    <select
                      value={academicCalendar}
                      onChange={(e) => setAcademicCalendar(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#10B981] ${
                        isDark ? 'bg-[#0A0A0A] border-[#262626] text-white' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827]'
                      }`}
                    >
                      <option value="Semester Pattern">Semester Pattern (2 Terms/Yr)</option>
                      <option value="Quarter Pattern">Quarter Pattern (3 Terms/Yr)</option>
                      <option value="Trimester Pattern">Trimester Pattern</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                      Credit System
                    </label>
                    <select
                      value={creditSystem}
                      onChange={(e) => setCreditSystem(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#10B981] ${
                        isDark ? 'bg-[#0A0A0A] border-[#262626] text-white' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827]'
                      }`}
                    >
                      <option value="US Semester Credits">US Semester Credit Hours (SCH)</option>
                      <option value="ECTS Credits">European Credit Transfer System (ECTS)</option>
                      <option value="Choice Based Credit System (CBCS)">Choice Based Credit System (CBCS)</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Step 2 Actions */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={`py-2.5 px-4 text-xs font-semibold rounded-xl border flex items-center gap-2 cursor-pointer ${
                    isDark ? 'bg-[#171717] border-[#262626] text-[#A3A3A3] hover:text-white' : 'bg-[#F1F5F9] border-[#CBD5E1] text-[#475569]'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="py-3 px-6 text-xs font-bold text-white bg-[#10B981] hover:bg-[#34D399] rounded-xl shadow-lg shadow-[#10B981]/20 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>Continue: Administrator Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: ADMINISTRATOR DETAILS */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-5"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 mb-2">
                  <Users className="w-3.5 h-3.5" />
                  <span>Step 3: Administrator & Leadership</span>
                </div>
                <h2 className="font-heading font-bold text-xl sm:text-2xl tracking-tight">Primary Workspace Admin</h2>
                <p className={`text-xs sm:text-sm ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>
                  Designate the chief academic officer responsible for curriculum governance
                </p>
              </div>

              <div className="space-y-4">
                {/* Admin Name */}
                <div>
                  <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                    Administrator Full Name *
                  </label>
                  <div className="relative">
                    <User className={`w-4 h-4 absolute left-3.5 top-3 ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`} />
                    <input
                      type="text"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      placeholder="Dr. Eleanor Vance"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#10B981] ${
                        isDark ? 'bg-[#0A0A0A] border-[#262626] text-white' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827]'
                      }`}
                    />
                  </div>
                </div>

                {/* Designation Cards */}
                <div>
                  <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                    Academic Designation
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['Dean', 'HOD', 'Curriculum Committee', 'Administrator'] as AcademicRole[]).map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setAdminRole(role)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                          adminRole === role
                            ? 'bg-[#10B981]/15 border-[#10B981] text-[#10B981]'
                            : isDark ? 'bg-[#0A0A0A] border-[#262626] text-[#888] hover:text-white' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#475569]'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                      Official Email Address *
                    </label>
                    <div className="relative">
                      <Mail className={`w-4 h-4 absolute left-3.5 top-3 ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`} />
                      <input
                        type="email"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        placeholder="e.vance@cmu.edu"
                        className={`w-full pl-10 pr-3 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#10B981] ${
                          isDark ? 'bg-[#0A0A0A] border-[#262626] text-white' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827]'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                      Contact Phone Number
                    </label>
                    <div className="relative">
                      <Phone className={`w-4 h-4 absolute left-3.5 top-3 ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`} />
                      <input
                        type="tel"
                        value={adminPhone}
                        onChange={(e) => setAdminPhone(e.target.value)}
                        placeholder="+1 (412) 268-2000"
                        className={`w-full pl-10 pr-3 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#10B981] ${
                          isDark ? 'bg-[#0A0A0A] border-[#262626] text-white' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827]'
                        }`}
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Step 3 Actions */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className={`py-2.5 px-4 text-xs font-semibold rounded-xl border flex items-center gap-2 cursor-pointer ${
                    isDark ? 'bg-[#171717] border-[#262626] text-[#A3A3A3] hover:text-white' : 'bg-[#F1F5F9] border-[#CBD5E1] text-[#475569]'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="py-3 px-6 text-xs font-bold text-white bg-[#10B981] hover:bg-[#34D399] rounded-xl shadow-lg shadow-[#10B981]/20 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>Continue: AI Configuration</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: AI CONFIGURATION */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-5"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 mb-2">
                  <BrainCircuit className="w-3.5 h-3.5" />
                  <span>Step 4: AI Engine Configuration</span>
                </div>
                <h2 className="font-heading font-bold text-xl sm:text-2xl tracking-tight">AI & Curriculum Intelligence</h2>
                <p className={`text-xs sm:text-sm ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>
                  Configure Gemini model selection and automated curriculum mapping features
                </p>
              </div>

              <div className="space-y-4">
                {/* AI Model Radio Group */}
                <div>
                  <label className={`block text-xs font-semibold mb-2 ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                    Preferred AI Intelligence Model
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      onClick={() => setAiModel('Gemini 1.5 Pro')}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        aiModel === 'Gemini 1.5 Pro'
                          ? 'bg-[#10B981]/15 border-[#10B981] ring-1 ring-[#10B981]'
                          : isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs">Gemini 1.5 Pro</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981] font-mono font-bold">RECOMMENDED</span>
                      </div>
                      <p className={`text-[11px] ${isDark ? 'text-[#A3A3A3]' : 'text-[#64748B]'}`}>
                        Deep analytical reasoning for ABET Criterion 3 & 5 CO-PO mapping and multi-syllabus auditing
                      </p>
                    </div>

                    <div
                      onClick={() => setAiModel('Gemini 1.5 Flash')}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        aiModel === 'Gemini 1.5 Flash'
                          ? 'bg-[#10B981]/15 border-[#10B981] ring-1 ring-[#10B981]'
                          : isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs">Gemini 1.5 Flash</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-mono font-bold">ULTRA FAST</span>
                      </div>
                      <p className={`text-[11px] ${isDark ? 'text-[#A3A3A3]' : 'text-[#64748B]'}`}>
                        Sub-second response speeds ideal for rapid skill gap scans and live interactive syllabus generation
                      </p>
                    </div>
                  </div>
                </div>

                {/* Default Curriculum Framework */}
                <div>
                  <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                    Default Taxonomy Framework
                  </label>
                  <select
                    value={curriculumFramework}
                    onChange={(e) => setCurriculumFramework(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#10B981] ${
                      isDark ? 'bg-[#0A0A0A] border-[#262626] text-white' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827]'
                    }`}
                  >
                    <option value="Bloom's Taxonomy (2001 Revised)">Bloom's Taxonomy (2001 Revised Edition)</option>
                    <option value="Graduate Attributes (Washington Accord)">Graduate Attributes (Washington Accord / ABET)</option>
                    <option value="Direct Course Outcome (CO-PO) Mapping">Direct Course Outcome (CO-PO Matrix)</option>
                  </select>
                </div>

                {/* Module Toggles */}
                <div>
                  <label className={`block text-xs font-semibold mb-2 ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                    Enable AI Intelligence Engines
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer select-none ${
                      isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
                    }`}>
                      <div className="flex items-center gap-2.5">
                        <Network className="w-4 h-4 text-[#10B981]" />
                        <div>
                          <div className="text-xs font-bold">Knowledge Graph</div>
                          <div className={`text-[10px] ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>Prerequisite mapping</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={enableKnowledgeGraph}
                        onChange={(e) => setEnableKnowledgeGraph(e.target.checked)}
                        className="w-4 h-4 rounded border-[#262626] text-[#10B981] accent-[#10B981]"
                      />
                    </label>

                    <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer select-none ${
                      isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
                    }`}>
                      <div className="flex items-center gap-2.5">
                        <TrendingUp className="w-4 h-4 text-[#10B981]" />
                        <div>
                          <div className="text-xs font-bold">Skill Gap Analysis</div>
                          <div className={`text-[10px] ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>16 Tech Job Profiles</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={enableSkillGap}
                        onChange={(e) => setEnableSkillGap(e.target.checked)}
                        className="w-4 h-4 rounded border-[#262626] text-[#10B981] accent-[#10B981]"
                      />
                    </label>

                    <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer select-none ${
                      isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
                    }`}>
                      <div className="flex items-center gap-2.5">
                        <Cpu className="w-4 h-4 text-[#10B981]" />
                        <div>
                          <div className="text-xs font-bold">AI Modernization</div>
                          <div className={`text-[10px] ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>GenAI & MLOps modules</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={enableAiModernization}
                        onChange={(e) => setEnableAiModernization(e.target.checked)}
                        className="w-4 h-4 rounded border-[#262626] text-[#10B981] accent-[#10B981]"
                      />
                    </label>

                    <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer select-none ${
                      isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
                    }`}>
                      <div className="flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-[#10B981]" />
                        <div>
                          <div className="text-xs font-bold">Industry Sync</div>
                          <div className={`text-[10px] ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>Live Job Trends Feed</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={enableIndustrySync}
                        onChange={(e) => setEnableIndustrySync(e.target.checked)}
                        className="w-4 h-4 rounded border-[#262626] text-[#10B981] accent-[#10B981]"
                      />
                    </label>
                  </div>
                </div>

              </div>

              {/* Step 4 Actions */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className={`py-2.5 px-4 text-xs font-semibold rounded-xl border flex items-center gap-2 cursor-pointer ${
                    isDark ? 'bg-[#171717] border-[#262626] text-[#A3A3A3] hover:text-white' : 'bg-[#F1F5F9] border-[#CBD5E1] text-[#475569]'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(5)}
                  className="py-3 px-6 text-xs font-bold text-white bg-[#10B981] hover:bg-[#34D399] rounded-xl shadow-lg shadow-[#10B981]/20 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Provision Workspace Now</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: WORKSPACE PROVISIONING & SUCCESS SCREEN */}
          {step === 5 && (
            <AnimatePresence mode="wait">
              {!isProvisionComplete ? (
                /* PROVISIONING ANIMATION */
                <motion.div
                  key="provisioning"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="py-8 text-center space-y-6"
                >
                  {/* Glowing Progress Ring Container */}
                  <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="54"
                        className={`stroke-current ${isDark ? 'text-[#262626]' : 'text-[#E5E7EB]'}`}
                        strokeWidth="8"
                        fill="transparent"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="54"
                        className="stroke-[#10B981] transition-all duration-300"
                        strokeWidth="8"
                        strokeDasharray={339.29}
                        strokeDashoffset={339.29 - (339.29 * provisionProgress) / 100}
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-heading font-extrabold text-2xl tracking-tight text-[#10B981]">
                        {provisionProgress}%
                      </span>
                      <span className={`text-[10px] font-mono ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>
                        ETA: 5s
                      </span>
                    </div>
                  </div>

                  {/* Provisioning Stage Message */}
                  <div className="space-y-1.5 max-w-md mx-auto">
                    <h3 className="font-heading font-bold text-lg">Provisioning Workspace</h3>
                    <p className={`text-xs font-mono text-[#10B981] flex items-center justify-center gap-2 ${
                      isDark ? 'text-[#10B981]' : 'text-[#059669]'
                    }`}>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>{provisioningStages[provisionStageIndex]?.label}...</span>
                    </p>
                  </div>

                  {/* Live Progress Stage Checklist */}
                  <div className={`p-4 rounded-xl border max-w-md mx-auto text-left space-y-2 font-mono text-[11px] ${
                    isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
                  }`}>
                    {provisioningStages.map((stage, idx) => {
                      const isDone = idx < provisionStageIndex;
                      const isCurrent = idx === provisionStageIndex;
                      return (
                        <div key={idx} className="flex items-center gap-2.5">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                          ) : isCurrent ? (
                            <Loader2 className="w-4 h-4 text-[#10B981] animate-spin flex-shrink-0" />
                          ) : (
                            <div className={`w-4 h-4 rounded-full border flex-shrink-0 ${isDark ? 'border-[#333]' : 'border-[#CBD5E1]'}`} />
                          )}
                          <span className={isDone ? 'text-current font-medium line-through opacity-70' : isCurrent ? 'text-[#10B981] font-bold' : 'text-[#737373]'}>
                            {stage.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                /* SUCCESS SCREEN */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-4 text-center space-y-6"
                >
                  {/* Success Badge */}
                  <div className="w-20 h-20 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] flex items-center justify-center mx-auto shadow-xl shadow-[#10B981]/10">
                    <CheckCircle2 className="w-10 h-10 animate-bounce" />
                  </div>

                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>PROVISIONING COMPLETE</span>
                    </div>
                    <h2 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight">
                      Workspace Created Successfully
                    </h2>
                    <p className={`text-xs sm:text-sm max-w-md mx-auto ${isDark ? 'text-[#A3A3A3]' : 'text-[#64748B]'}`}>
                      <strong className="text-current">{instName} – {selectedDepts[0]}</strong> has been provisioned and is ready for ABET curriculum accreditation.
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className={`p-4 rounded-xl border max-w-lg mx-auto text-left grid grid-cols-2 gap-3 text-xs ${
                    isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
                  }`}>
                    <div>
                      <span className={`text-[10px] font-mono uppercase block ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>
                        Workspace Domain
                      </span>
                      <span className="font-mono font-bold text-[#10B981]">
                        {shortName.toLowerCase().replace(/\s+/g, '')}.cirrculai.org
                      </span>
                    </div>

                    <div>
                      <span className={`text-[10px] font-mono uppercase block ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>
                        Accreditation Status
                      </span>
                      <span className="font-semibold text-current">
                        {selectedAccreditations[0] || 'ABET'} Ready
                      </span>
                    </div>

                    <div>
                      <span className={`text-[10px] font-mono uppercase block ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>
                        Chief Admin
                      </span>
                      <span className="font-semibold text-current">
                        {adminName} ({adminRole})
                      </span>
                    </div>

                    <div>
                      <span className={`text-[10px] font-mono uppercase block ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>
                        AI Engine
                      </span>
                      <span className="font-semibold text-current">
                        {aiModel}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => onCompleteWorkspace(createdWorkspace, 'default')}
                      className="py-3.5 px-6 text-xs font-bold text-white bg-[#10B981] hover:bg-[#34D399] rounded-xl shadow-lg shadow-[#10B981]/20 flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <span>Enter Workspace</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowInviteModal(true)}
                      className={`py-3.5 px-4 text-xs font-semibold rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
                        isDark ? 'bg-[#171717] border-[#262626] text-[#FAFAFA] hover:border-[#10B981]' : 'bg-[#F1F5F9] border-[#CBD5E1] text-[#0F172A] hover:border-[#10B981]'
                      }`}
                    >
                      <Users className="w-4 h-4 text-[#10B981]" />
                      <span>Invite Faculty</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onCompleteWorkspace(createdWorkspace, 'upload')}
                      className={`py-3.5 px-4 text-xs font-semibold rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
                        isDark ? 'bg-[#171717] border-[#262626] text-[#FAFAFA] hover:border-[#10B981]' : 'bg-[#F1F5F9] border-[#CBD5E1] text-[#0F172A] hover:border-[#10B981]'
                      }`}
                    >
                      <Upload className="w-4 h-4 text-[#10B981]" />
                      <span>Upload First Syllabus</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}

        </div>
      </motion.div>

      {/* Invite Faculty Inner Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-md p-6 rounded-[22px] border shadow-2xl relative ${
                isDark ? 'bg-[#111111] border-[#262626] text-[#FAFAFA]' : 'bg-[#FFFFFF] border-[#E5E7EB] text-[#111827]'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#10B981]" />
                  <h3 className="font-heading font-bold text-lg">Invite Faculty & Committee</h3>
                </div>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className={`p-1 rounded-lg ${isDark ? 'hover:bg-[#262626]' : 'hover:bg-[#F1F5F9]'}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {inviteSent ? (
                <div className="py-6 text-center space-y-2 text-[#10B981]">
                  <CheckCircle2 className="w-8 h-8 mx-auto" />
                  <div className="font-bold text-sm">Invitations Sent!</div>
                  <p className={`text-xs ${isDark ? 'text-[#888]' : 'text-[#6B7280]'}`}>
                    Faculty members will receive an automated workspace link.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendInvites} className="space-y-4">
                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                      Faculty Email Addresses (Comma separated)
                    </label>
                    <textarea
                      rows={3}
                      value={inviteEmails}
                      onChange={(e) => setInviteEmails(e.target.value)}
                      placeholder="prof.smith@cmu.edu, hod.cs@cmu.edu"
                      className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#10B981] ${
                        isDark ? 'bg-[#0A0A0A] border-[#262626] text-white' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827]'
                      }`}
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowInviteModal(false)}
                      className={`px-4 py-2 text-xs font-semibold rounded-xl border ${
                        isDark ? 'border-[#262626] text-[#888]' : 'border-[#CBD5E1] text-[#475569]'
                      }`}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-bold text-white bg-[#10B981] hover:bg-[#34D399] rounded-xl flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Workspace Invites</span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
