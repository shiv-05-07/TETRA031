import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Crown, 
  Users, 
  BookOpen, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { ThemeMode, AcademicRole } from '../../types';

interface RoleSelectorProps {
  theme: ThemeMode;
  initialRole?: AcademicRole;
  onConfirmRole: (role: AcademicRole) => void;
  onBack?: () => void;
}

interface RoleCardData {
  id: AcademicRole;
  title: string;
  badge: string;
  description: string;
  icon: React.ElementType;
  features: string[];
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  theme,
  initialRole = 'Dean',
  onConfirmRole,
  onBack
}) => {
  const isDark = theme === 'dark';
  const [selectedRole, setSelectedRole] = useState<AcademicRole>(initialRole);

  const rolesData: RoleCardData[] = [
    {
      id: 'Dean',
      title: 'Dean / Executive Leadership',
      badge: 'Strategic Level',
      description: 'Oversee school-wide accreditation, institutional compliance, and departmental health scores.',
      icon: Crown,
      features: ['Institution Analytics', 'ABET Criterion 3 Reports', 'Budget & Modernization KPIs']
    },
    {
      id: 'HOD',
      title: 'HOD / Head of Department',
      badge: 'Department Level',
      description: 'Manage departmental syllabus mapping, faculty allocation, and prerequisite integrity.',
      icon: Building2,
      features: ['Department Overview', 'Course Outcome Mapping', 'Faculty Syllabus Approval']
    },
    {
      id: 'Curriculum Committee',
      title: 'Curriculum Committee Chair',
      badge: 'Compliance & Audit',
      description: 'Audit courseware against industry job requirements, Bloom Taxonomy, and accreditation standards.',
      icon: Users,
      features: ['Industry Alignment Charts', 'Bloom Gap Matrix', 'Skill Gap Heatmaps']
    },
    {
      id: 'Professor',
      title: 'Professor / Lead Faculty',
      badge: 'Instructional Level',
      description: 'Design course syllabi, generate weekly lab plans, slide decks, and Canvas/Blackboard quizzes.',
      icon: GraduationCap,
      features: ['AI Syllabus Builder', 'Weekly Rubrics & Slidedecks', 'QTI Quiz Exports']
    },
    {
      id: 'Administrator',
      title: 'System Administrator / IT',
      badge: 'Governance & Security',
      description: 'Manage institutional SSO (SAML/Google Workspace), SAML permissions, and user onboarding.',
      icon: ShieldCheck,
      features: ['SSO & Security Audit', 'User Provisioning', 'FERPA & SOC2 Compliance']
    }
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Tailored Academic Experience</span>
        </div>
        <h2 className="font-heading font-bold text-2xl sm:text-3xl tracking-tight">Select Academic Role</h2>
        <p className={`text-xs sm:text-sm ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>
          We will customize your CirrculAI workspace dashboard according to your primary academic role
        </p>
      </div>

      {/* Cards List */}
      <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
        {rolesData.map((roleItem) => {
          const Icon = roleItem.icon;
          const isSelected = selectedRole === roleItem.id;

          return (
            <motion.div
              key={roleItem.id}
              onClick={() => setSelectedRole(roleItem.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all relative ${
                isSelected
                  ? 'bg-[#10B981]/10 border-[#10B981] ring-1 ring-[#10B981] shadow-md'
                  : isDark
                  ? 'bg-[#0A0A0A] border-[#262626] hover:border-[#10B981]/50'
                  : 'bg-[#F8FAFC] border-[#E5E7EB] hover:border-[#10B981]/50 shadow-2xs'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className={`p-3 rounded-xl flex-shrink-0 ${
                  isSelected ? 'bg-[#10B981] text-white' : 'bg-[#10B981]/15 text-[#10B981]'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-heading font-bold text-sm sm:text-base flex items-center gap-2">
                      <span>{roleItem.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] font-mono font-medium hidden sm:inline-block">
                        {roleItem.badge}
                      </span>
                    </div>

                    {isSelected ? (
                      <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                    ) : (
                      <div className={`w-4 h-4 rounded-full border ${isDark ? 'border-[#333]' : 'border-[#CBD5E1]'}`} />
                    )}
                  </div>

                  <p className={`text-xs leading-relaxed ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>
                    {roleItem.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {roleItem.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className={`text-[10px] px-2 py-0.5 rounded-md border ${
                          isDark ? 'bg-[#141414] border-[#262626] text-[#A3A3A3]' : 'bg-[#FFFFFF] border-[#E2E8F0] text-[#475569]'
                        }`}
                      >
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className={`py-3 px-4 text-xs font-semibold rounded-xl border ${
              isDark ? 'bg-[#0A0A0A] border-[#262626] text-[#FAFAFA]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827]'
            }`}
          >
            Back
          </button>
        )}

        <button
          type="button"
          onClick={() => onConfirmRole(selectedRole)}
          className="flex-1 py-3 px-4 text-xs font-bold text-white rounded-xl bg-[#10B981] hover:bg-[#34D399] active:scale-[0.99] shadow-lg shadow-[#10B981]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Continue as {selectedRole}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
