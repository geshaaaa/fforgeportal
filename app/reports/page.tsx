'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, BarChart3, FileText, Search, Filter, RotateCcw, Download
} from 'lucide-react';

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<'authorization' | 'sku' | 'feedqa'>('authorization');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('Google');

  const platforms = [
    'Google',
    'Amazon Selling Partner API (SP-API)',
    'Microsoft Ads (Bing)',
    'Kijiji',
    'Mercado Libre',
    'Facebook',
    'Wish',
    'Etsy™',
    'eBay',
    'Mirakl',
    'TikTok',
    'Shein',
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <Link href="/" className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center hover:from-blue-700 hover:to-blue-800 transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg">
                  <Building2 className="w-6 h-6 text-white" />
                </Link>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Reports</h1>
                  <p className="text-xs sm:text-sm text-gray-500">View and manage reports</p>
                </div>
              </div>
              <nav className="hidden md:flex items-center gap-4 ml-4 pl-4 border-l border-gray-200">
                <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  Onboarding
                </Link>
                <Link href="/imports" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  Imports
                </Link>
                <Link href="/exports" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  Exports
                </Link>
                <Link href="/sites" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  Sites
                </Link>
                <Link href="/reports" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200">
                  Reports
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Tabs */}
        <div className="bg-gray-800 border-b border-gray-700">
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('authorization')}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200 ${
                  activeTab === 'authorization'
                    ? 'border-blue-500 text-white bg-gray-800'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Authorization
              </button>
              <button
                onClick={() => setActiveTab('sku')}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200 ${
                  activeTab === 'sku'
                    ? 'border-blue-500 text-white bg-gray-800'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                }`}
              >
                <FileText className="w-4 h-4" />
                SKU report
              </button>
              <button
                onClick={() => setActiveTab('feedqa')}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200 ${
                  activeTab === 'feedqa'
                    ? 'border-blue-500 text-white bg-gray-800'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                }`}
              >
                <FileText className="w-4 h-4" />
                FeedQA
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Search Bar */}
          <div className="flex items-center gap-2 mb-6">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-all">
              <RotateCcw className="w-4 h-4" />
            </button>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search All Fields"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>

          {/* Authorization Tab */}
          {activeTab === 'authorization' && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Authorization</h2>
                
                {/* Platform List */}
                <div className="flex flex-wrap gap-4">
                  {platforms.map((platform) => (
                    <button
                      key={platform}
                      onClick={() => setSelectedPlatform(platform)}
                      className={`text-base font-normal text-gray-900 hover:text-blue-600 transition-colors duration-200 ${
                        selectedPlatform === platform
                          ? 'border-b-2 border-blue-600 pb-1'
                          : ''
                      }`}
                    >
                      {platform}
                    </button>
                  ))}
                </div>

                {/* Platform Details Section */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {selectedPlatform} Authorization
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-sm text-gray-600">
                      Authorization details for {selectedPlatform} will be displayed here.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SKU Report Tab */}
          {activeTab === 'sku' && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">SKU Report</h2>
                <p className="text-sm text-gray-600 mb-6">View SKU inventory, pricing, and availability reports.</p>
                
                {/* Placeholder content */}
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">SKU report data will be displayed here</p>
                </div>
              </div>
            </div>
          )}

          {/* FeedQA Tab */}
          {activeTab === 'feedqa' && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">FeedQA Report</h2>
                <p className="text-sm text-gray-600 mb-6">View feed quality assurance reports and validation results.</p>
                
                {/* Placeholder content */}
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">FeedQA report data will be displayed here</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

