'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Globe, User, Users, Upload, Download, Server, Link as LinkIcon, ShoppingBag, Check, ChevronRight, ArrowLeft } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Step 1: Organization
  const [organizationName, setOrganizationName] = useState('');
  const [website, setWebsite] = useState('');

  // Step 2: Account
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Step 3: Team Members
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [showAddMember, setShowAddMember] = useState(false);

  // Step 4: Import & Export Channels
  const [selectedImports, setSelectedImports] = useState<string[]>([]);
  const [selectedExports, setSelectedExports] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const addTeamMember = () => {
    if (newMemberName && newMemberEmail) {
      setTeamMembers([...teamMembers, {
        id: Date.now().toString(),
        name: newMemberName,
        email: newMemberEmail
      }]);
      setNewMemberName('');
      setNewMemberEmail('');
      setShowAddMember(false);
    }
  };

  const removeTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  const toggleImport = (channel: string) => {
    setSelectedImports(prev => 
      prev.includes(channel) 
        ? prev.filter(c => c !== channel)
        : [...prev, channel]
    );
  };

  const toggleExport = (channel: string) => {
    setSelectedExports(prev => 
      prev.includes(channel) 
        ? prev.filter(c => c !== channel)
        : [...prev, channel]
    );
  };

  const completeOnboarding = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('onboardingCompleted', 'true');
      router.replace('/dashboard');
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return organizationName.trim().length > 0;
      case 2:
        return fullName.trim().length > 0 && 
               email.trim().length > 0 && 
               password.length >= 6 && 
               password === confirmPassword;
      case 3:
        return true; // Optional step
      case 4:
        return selectedImports.length > 0 || selectedExports.length > 0;
      default:
        return false;
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FBF9F7] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const progressPercentage = (currentStep / 4) * 100;

  return (
    <div className="min-h-screen bg-[#FBF9F7] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-3">Get started with FeedForge</h1>
          <p className="text-gray-600 text-lg">
            Create your organization, add your team, and choose how you&apos;ll import and export feeds.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step {currentStep} of 4</span>
            <span className="text-sm font-medium text-gray-500">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-black rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10 transition-all duration-300 hover:shadow-2xl">
          {/* Step 1: Organization */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold text-black mb-2">Your organization</h2>
                <p className="text-gray-600">Create your workspace. You can add team members in the next steps.</p>
              </div>
              
              <div className="space-y-5 mt-8">
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Organization name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all duration-200 hover:border-gray-300 text-black placeholder-gray-400"
                    placeholder="Enter organization name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Website <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all duration-200 hover:border-gray-300 text-black placeholder-gray-400"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Account */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold text-black mb-2">Your account</h2>
                <p className="text-gray-600">This will be the primary admin account for your organization.</p>
              </div>
              
              <div className="space-y-5 mt-8">
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Full name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all duration-200 hover:border-gray-300 text-black placeholder-gray-400"
                    placeholder="Jane Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all duration-200 hover:border-gray-300 text-black placeholder-gray-400"
                    placeholder="admin@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all duration-200 hover:border-gray-300 text-black placeholder-gray-400"
                    placeholder="••••••••"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Confirm password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all duration-200 hover:border-gray-300 text-black placeholder-gray-400"
                    placeholder="••••••••"
                  />
                  {password && confirmPassword && password !== confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Team Members */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold text-black mb-2">Team members</h2>
                <p className="text-gray-600">Add teammates (optional). They&apos;ll get access to the same organization and feeds.</p>
              </div>
              
              <div className="mt-8 space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 bg-[#FBF9F7] rounded-lg border-2 border-gray-200 hover:border-black transition-all duration-200 group">
                    <div>
                      <p className="font-semibold text-black">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.email}</p>
                    </div>
                    <button
                      onClick={() => removeTeamMember(member.id)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                
                {showAddMember ? (
                  <div className="p-4 bg-[#FBF9F7] rounded-lg border-2 border-gray-200 space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-black mb-2">Name</label>
                      <input
                        type="text"
                        value={newMemberName}
                        onChange={(e) => setNewMemberName(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all duration-200 text-black"
                        placeholder="Team member name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-black mb-2">Email</label>
                      <input
                        type="email"
                        value={newMemberEmail}
                        onChange={(e) => setNewMemberEmail(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all duration-200 text-black"
                        placeholder="team@example.com"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={addTeamMember}
                        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => {
                          setShowAddMember(false);
                          setNewMemberName('');
                          setNewMemberEmail('');
                        }}
                        className="px-4 py-2 border-2 border-gray-200 text-black rounded-lg hover:border-black transition-all duration-200 font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowAddMember(true)}
                    className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-black hover:bg-[#FBF9F7] transition-all duration-200 flex items-center justify-center gap-2 text-black font-medium"
                  >
                    <Users className="w-5 h-5" />
                    Add team member
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Import & Export */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold text-black mb-2">Import & export</h2>
                <p className="text-gray-600">Select how you plan to import and export feeds. You can change this later per feed.</p>
              </div>
              
              <div className="mt-8 space-y-8">
                {/* Import Channels */}
                <div>
                  <h3 className="text-lg font-semibold text-black mb-4">Import channels</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: 'csv-upload', label: 'CSV Upload', icon: Upload },
                      { id: 'sftp-import', label: 'SFTP Import', icon: Server },
                      { id: 'https-import', label: 'HTTPS Import', icon: LinkIcon },
                      { id: 'shopify-import', label: 'Shopify Import', icon: ShoppingBag },
                    ].map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => toggleImport(id)}
                        className={`p-6 border-2 rounded-xl transition-all duration-300 flex flex-col items-center gap-3 group relative ${
                          selectedImports.includes(id)
                            ? 'border-black bg-black text-white shadow-lg scale-105'
                            : 'border-gray-200 bg-white text-black hover:border-black hover:shadow-md hover:scale-102'
                        }`}
                      >
                        <div className={`p-3 rounded-lg ${
                          selectedImports.includes(id) ? 'bg-white/20' : 'bg-[#FBF9F7] group-hover:bg-gray-100'
                        } transition-all duration-300`}>
                          <Icon className={`w-6 h-6 ${selectedImports.includes(id) ? 'text-white' : 'text-black'}`} />
                        </div>
                        <span className="font-semibold">{label}</span>
                        {selectedImports.includes(id) && (
                          <Check className="w-5 h-5 text-white absolute top-2 right-2" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Export Channels */}
                <div>
                  <h3 className="text-lg font-semibold text-black mb-4">Export channels</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: 'csv-download', label: 'CSV Download', icon: Download },
                      { id: 'sftp-export', label: 'SFTP Export', icon: Server },
                      { id: 'https-export', label: 'HTTPS Export', icon: LinkIcon },
                      { id: 'shopify-export', label: 'Shopify Export', icon: ShoppingBag },
                    ].map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => toggleExport(id)}
                        className={`p-6 border-2 rounded-xl transition-all duration-300 flex flex-col items-center gap-3 group relative ${
                          selectedExports.includes(id)
                            ? 'border-black bg-black text-white shadow-lg scale-105'
                            : 'border-gray-200 bg-white text-black hover:border-black hover:shadow-md hover:scale-102'
                        }`}
                      >
                        <div className={`p-3 rounded-lg ${
                          selectedExports.includes(id) ? 'bg-white/20' : 'bg-[#FBF9F7] group-hover:bg-gray-100'
                        } transition-all duration-300`}>
                          <Icon className={`w-6 h-6 ${selectedExports.includes(id) ? 'text-white' : 'text-black'}`} />
                        </div>
                        <span className="font-semibold">{label}</span>
                        {selectedExports.includes(id) && (
                          <Check className="w-5 h-5 text-white absolute top-2 right-2" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-200">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 text-black rounded-lg hover:border-black hover:bg-[#FBF9F7] transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:bg-transparent"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            
            {currentStep < 4 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={completeOnboarding}
                disabled={!canProceed()}
                className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                Create account & go to Create Feed
              </button>
            )}
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center mt-6 text-sm">
          <span className="text-gray-600">
            Have a client code?{' '}
            <a href="#" className="text-black hover:underline font-medium">Join your team</a>
            {' · '}
            <a href="#" className="text-black hover:underline font-medium">Sign in</a>
          </span>
        </div>
      </div>
    </div>
  );
}

