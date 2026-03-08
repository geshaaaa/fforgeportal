'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Plus, X, CheckCircle2, Circle, FileText, Server, Download, FileCode } from 'lucide-react';

interface Site {
  id: string;
  name: string;
  code: string;
  location: string;
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [timezone, setTimezone] = useState('UTC');
  const [sites, setSites] = useState<Site[]>([]);
  const [newSiteName, setNewSiteName] = useState('');
  const [newSiteCode, setNewSiteCode] = useState('');
  const [newSiteLocation, setNewSiteLocation] = useState('');
  const [defaultFormat, setDefaultFormat] = useState('CSV');
  const [fileNaming, setFileNaming] = useState('');
  const [dataRetention, setDataRetention] = useState('');

  const completeOnboarding = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('onboardingCompleted', 'true');
      router.replace('/dashboard');
    }
  };

  const addSite = () => {
    if (newSiteName && newSiteCode) {
      setSites([...sites, {
        id: Date.now().toString(),
        name: newSiteName,
        code: newSiteCode,
        location: newSiteLocation
      }]);
      setNewSiteName('');
      setNewSiteCode('');
      setNewSiteLocation('');
    }
  };

  const removeSite = (id: string) => {
    setSites(sites.filter(site => site.id !== id));
  };

  const checklistItems = [
    { id: 1, label: 'Add company', completed: companyName.length > 0 && contactName.length > 0 && contactEmail.length > 0 },
    { id: 2, label: 'Add at least 1 site', completed: sites.length > 0 },
    { id: 3, label: 'Set default standards', completed: currentStep >= 3 },
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FBF3EA] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#07011c] to-[#1a0d3d] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF3EA] flex">
      {/* Main Content Area (no sidebar while onboarding) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-[#FBF3EA] border-b border-gray-300 sticky top-0 z-10 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold text-gray-900">Onboarding</h1>
                <p className="text-xs text-gray-500">Step {currentStep} of 3</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-32 h-2 bg-[#FBF3EA] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#07011c] rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  ></div>
                </div>
                <a href="#" className="text-sm text-[#07011c] hover:text-[#07011c] font-medium transition-colors duration-200 hover:underline whitespace-nowrap">
                  Help / Documentation
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Main Body */}
        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
          <div className="w-full max-w-3xl mx-auto space-y-8">
            {/* Centered Content */}
            <div className="space-y-8">
              {/* Step 1: Company Profile */}
              {currentStep === 1 && (
                <section className="bg-[#FBF3EA] rounded-lg shadow-sm border border-gray-300 p-6 hover:shadow-md transition-shadow duration-200">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Company Profile</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07011c] focus:border-[#07011c] outline-none transition-all duration-200 hover:border-gray-400"
                        placeholder="Enter company name"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Primary Contact Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07011c] focus:border-[#07011c] outline-none transition-all duration-200 hover:border-gray-400"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07011c] focus:border-[#07011c] outline-none transition-all duration-200 hover:border-gray-400"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07011c] focus:border-[#07011c] outline-none transition-all duration-200 hover:border-gray-400"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timezone
                      </label>
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07011c] focus:border-[#07011c] outline-none transition-all duration-200 hover:border-gray-400 cursor-pointer bg-[#FBF3EA]"
                      >
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">America/New_York (EST)</option>
                        <option value="America/Chicago">America/Chicago (CST)</option>
                        <option value="America/Denver">America/Denver (MST)</option>
                        <option value="America/Los_Angeles">America/Los_Angeles (PST)</option>
                        <option value="Europe/London">Europe/London (GMT)</option>
                        <option value="Europe/Paris">Europe/Paris (CET)</option>
                        <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                      </select>
                    </div>
                  </div>
                </section>
              )}

              {/* Step 2: Sites Setup */}
              {currentStep === 2 && (
                <section className="bg-[#FBF3EA] rounded-lg shadow-sm border border-gray-300 p-6 hover:shadow-md transition-shadow duration-200">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Sites Setup</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Site Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={newSiteName}
                          onChange={(e) => setNewSiteName(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07011c] focus:border-[#07011c] outline-none transition-all duration-200 hover:border-gray-400"
                          placeholder="Main Office"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Site Code / Identifier <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={newSiteCode}
                          onChange={(e) => setNewSiteCode(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07011c] focus:border-[#07011c] outline-none transition-all duration-200 hover:border-gray-400"
                          placeholder="SITE001"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location / Region
                        </label>
                        <input
                          type="text"
                          value={newSiteLocation}
                          onChange={(e) => setNewSiteLocation(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07011c] focus:border-[#07011c] outline-none transition-all duration-200 hover:border-gray-400"
                          placeholder="New York, NY"
                        />
                      </div>
                    </div>
                    <button
                      onClick={addSite}
                      className="flex items-center gap-2 px-4 py-2 bg-[#07011c] text-white rounded-lg hover:bg-[#07011c] active:bg-[#07011c] transition-all duration-200 font-medium"
                    >
                      <Plus className="w-4 h-4" />
                      Save & Add Another
                    </button>
                  </div>

                  {/* Added Sites List */}
                  {sites.length > 0 && (
                    <div className="mt-6 space-y-2">
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Added Sites</h3>
                      {sites.map((site) => (
                        <div key={site.id} className="flex items-center justify-between p-3 bg-[#FBF3EA] rounded-lg border border-gray-300 hover:border-[#2d1a5c] transition-all duration-200 group">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">{site.name}</p>
                            <p className="text-sm text-gray-500 truncate">Code: {site.code} {site.location && `• ${site.location}`}</p>
                          </div>
                          <button
                            onClick={() => removeSite(site.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-all duration-200 ml-2 flex-shrink-0"
                            aria-label="Remove site"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Step 3: Default Standards */}
              {currentStep === 3 && (
                <section className="bg-[#FBF3EA] rounded-lg shadow-sm border border-gray-300 p-6 hover:shadow-md transition-shadow duration-200">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Default Standards</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Default Import/Export Format Preference
                      </label>
                      <select
                        value={defaultFormat}
                        onChange={(e) => setDefaultFormat(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07011c] focus:border-[#07011c] outline-none transition-all duration-200 hover:border-gray-400 cursor-pointer bg-[#FBF3EA]"
                      >
                        <option value="CSV">CSV</option>
                        <option value="JSON">JSON</option>
                        <option value="XML">XML</option>
                        <option value="Excel">Excel</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        File Naming Convention (optional)
                      </label>
                      <input
                        type="text"
                        value={fileNaming}
                        onChange={(e) => setFileNaming(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07011c] focus:border-[#07011c] outline-none transition-all duration-200 hover:border-gray-400"
                        placeholder="e.g., {site_code}_{date}_{type}.csv"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Data Retention (optional)
                      </label>
                      <input
                        type="text"
                        value={dataRetention}
                        onChange={(e) => setDataRetention(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07011c] focus:border-[#07011c] outline-none transition-all duration-200 hover:border-gray-400"
                        placeholder="e.g., 90 days, 1 year"
                      />
                    </div>
                  </div>
                </section>
              )}
            </div>

            {/* Checklist - Below the form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* Onboarding Checklist */}
              <div className="bg-[#FBF3EA] rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Onboarding Checklist</h2>
                <div className="space-y-3">
                  {checklistItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg transition-colors duration-200 cursor-default group">
                      {item.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-[#07011c] flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-300 flex-shrink-0 group-hover:text-[#3d2470] transition-colors duration-200" />
                      )}
                      <span className={`text-sm flex-1 ${item.completed ? 'text-gray-900 line-through' : 'text-gray-700'}`}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What You'll Need Panel */}
              <div className="bg-gradient-to-br from-[#1a0d3d] to-[#1a0d3d] rounded-lg border border-[#2d1a5c] p-6 hover:from-[#1a0d3d] hover:to-[#07011c]-200 hover:shadow-md transition-all duration-200 text-white">
                <h2 className="text-lg font-semibold text-white mb-4">What You&apos;ll Need</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-[#FBF3EA]/50 transition-colors duration-200 group">
                    <Server className="w-5 h-5 text-white mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                    <div>
                      <p className="text-sm font-medium text-white">SFTP Details</p>
                      <p className="text-xs text-gray-100">Host, username, password, and port information</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-[#FBF3EA]/50 transition-colors duration-200 group">
                    <FileText className="w-5 h-5 text-white mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                    <div>
                      <p className="text-sm font-medium text-white">Sample Import File</p>
                      <p className="text-xs text-gray-100">Example file showing expected format and structure</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-[#FBF3EA]/50 transition-colors duration-200 group">
                    <Download className="w-5 h-5 text-white mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                    <div>
                      <p className="text-sm font-medium text-white">Export Destination Credentials</p>
                      <p className="text-xs text-gray-100">Access details for where exports will be delivered</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-[#FBF3EA]/50 transition-colors duration-200 group">
                    <FileCode className="w-5 h-5 text-white mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                    <div>
                      <p className="text-sm font-medium text-white">Format Specs</p>
                      <p className="text-xs text-gray-100">CSV/JSON/XML schema and field definitions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer Actions - Sticky */}
        <footer className="bg-[#FBF3EA] border-t border-gray-200 sticky bottom-0 z-10 mt-auto shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between gap-4">
              <button 
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-[#FBF3EA] hover:border-gray-400 active:bg-[#FBF3EA] transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Back
              </button>
              <div className="flex items-center gap-4">
                <button className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-[#FBF3EA] hover:border-gray-400 active:bg-[#FBF3EA] transition-all duration-200 font-medium">
                  Save Draft
                </button>
                {currentStep < 3 ? (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="px-6 py-2 bg-[#07011c] text-white rounded-lg hover:bg-[#07011c] active:bg-[#07011c] transition-all duration-200 font-medium"
                  >
                    Next{currentStep === 1 ? ': Sites Setup' : currentStep === 2 ? ': Default Standards' : ''}
                  </button>
                ) : (
                  <button
                    onClick={completeOnboarding}
                    className="px-6 py-2 bg-[#07011c] text-white rounded-lg hover:bg-[#07011c] active:bg-[#07011c] transition-all duration-200 font-medium"
                  >
                    Complete Setup
                  </button>
                )}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
