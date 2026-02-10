'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Building2, Plus, X, CheckCircle2, Circle, FileText, Server, Download, FileCode } from 'lucide-react';

interface Site {
  id: string;
  name: string;
  code: string;
  location: string;
}

export default function OnboardingPage() {
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
    { id: 1, label: 'Add company', completed: companyName.length > 0 },
    { id: 2, label: 'Add at least 1 site', completed: sites.length > 0 },
    { id: 3, label: 'Configure first import', completed: false },
    { id: 4, label: 'Configure first export', completed: false },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link href="/" className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center hover:from-blue-700 hover:to-blue-800 transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg">
                <Building2 className="w-6 h-6 text-white" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">FeedForge</h1>
                <p className="text-xs text-gray-500">Data Feeding Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-4">
                <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200">
                  Onboarding
                </Link>
                <Link href="/imports" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  Imports
                </Link>
                <Link href="/exports" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  Exports
                </Link>
              </nav>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Step 1 of 3</span>
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-blue-600 rounded-full transition-all duration-300"></div>
                </div>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline whitespace-nowrap">
                Help / Documentation
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Setup Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Company Profile */}
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400 cursor-pointer bg-white"
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

            {/* Sites Setup */}
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                      placeholder="New York, NY"
                    />
                  </div>
                </div>
                <button
                  onClick={addSite}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 font-medium"
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
                    <div key={site.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 group">
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

            {/* Default Standards */}
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Default Standards</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Import/Export Format Preference
                  </label>
                  <select
                    value={defaultFormat}
                    onChange={(e) => setDefaultFormat(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400 cursor-pointer bg-white"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                    placeholder="e.g., 90 days, 1 year"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Checklist / Summary */}
          <div className="lg:col-span-1 space-y-6">
            {/* Onboarding Checklist */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Onboarding Checklist</h2>
              <div className="space-y-3">
                {checklistItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200 cursor-default group">
                    {item.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300 flex-shrink-0 group-hover:text-blue-300 transition-colors duration-200" />
                    )}
                    <span className={`text-sm flex-1 ${item.completed ? 'text-gray-900 line-through' : 'text-gray-700'}`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* What You&apos;ll Need Panel */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 p-6 hover:from-blue-100 hover:to-blue-200 hover:shadow-md transition-all duration-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">What You&apos;ll Need</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/50 transition-colors duration-200 group">
                  <Server className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">SFTP Details</p>
                    <p className="text-xs text-gray-600">Host, username, password, and port information</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/50 transition-colors duration-200 group">
                  <FileText className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Sample Import File</p>
                    <p className="text-xs text-gray-600">Example file showing expected format and structure</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/50 transition-colors duration-200 group">
                  <Download className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Export Destination Credentials</p>
                    <p className="text-xs text-gray-600">Access details for where exports will be delivered</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/50 transition-colors duration-200 group">
                  <FileCode className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Format Specs</p>
                    <p className="text-xs text-gray-600">CSV/JSON/XML schema and field definitions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Actions - Sticky */}
      <footer className="bg-white border-t border-gray-200 sticky bottom-0 z-10 mt-auto shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <button className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 transition-all duration-200 font-medium">
              Back
            </button>
            <div className="flex items-center gap-4">
              <button className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 transition-all duration-200 font-medium">
                Save Draft
              </button>
              <Link href="/imports" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 font-medium">
                Next: Configure Imports
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

