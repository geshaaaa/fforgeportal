'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, Filter, Plus, Building2, CheckCircle2, XCircle, Clock, 
  Play, Settings, Copy, Eye, MoreVertical, Download, AlertCircle,
  Server, FileText, Calendar, Mail, Key, Folder, FileCode, MapPin
} from 'lucide-react';

interface Site {
  id: string;
  name: string;
  code: string;
  status: 'active' | 'paused';
  lastImportStatus: 'success' | 'failed' | 'pending';
  lastImportTime: string;
}

interface ImportConfig {
  id: string;
  name: string;
  sourceType: 'SFTP' | 'Upload' | 'API';
  sourcePath: string;
  format: 'CSV' | 'Excel' | 'Fixed-width' | 'JSON';
  schedule: string;
  status: 'enabled' | 'disabled';
  lastRun: string;
  lastRunStatus: 'success' | 'failed';
  processedRows?: number;
  failedRows?: number;
}

interface ImportRun {
  id: string;
  runTime: string;
  duration: string;
  processedRows: number;
  failedRows: number;
  status: 'success' | 'failed';
}

export default function ImportsPage() {
  const [selectedSite, setSelectedSite] = useState<string>('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused'>('all');
  const [importTypeFilter, setImportTypeFilter] = useState<'all' | 'SFTP' | 'Upload' | 'API'>('all');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<ImportConfig | null>(null);
  const [activeTab, setActiveTab] = useState<'connection' | 'fileRules' | 'mapping' | 'schedule' | 'notifications'>('connection');

  const sites: Site[] = [
    { id: '1', name: 'Main Office', code: 'SITE001', status: 'active', lastImportStatus: 'success', lastImportTime: '2 hours ago' },
    { id: '2', name: 'Warehouse A', code: 'SITE002', status: 'active', lastImportStatus: 'failed', lastImportTime: '5 hours ago' },
    { id: '3', name: 'Retail Store', code: 'SITE003', status: 'paused', lastImportStatus: 'success', lastImportTime: '1 day ago' },
    { id: '4', name: 'Distribution Center', code: 'SITE004', status: 'active', lastImportStatus: 'success', lastImportTime: '30 min ago' },
  ];

  const importConfigs: ImportConfig[] = [
    { 
      id: '1', 
      name: 'Daily Sales Import', 
      sourceType: 'SFTP', 
      sourcePath: '/data/sales/*.csv', 
      format: 'CSV', 
      schedule: 'Daily 2:00 AM', 
      status: 'enabled',
      lastRun: '2 hours ago',
      lastRunStatus: 'success',
      processedRows: 1250,
      failedRows: 0
    },
    { 
      id: '2', 
      name: 'Inventory Update', 
      sourceType: 'API', 
      sourcePath: 'https://api.example.com/inventory', 
      format: 'JSON', 
      schedule: 'Hourly', 
      status: 'enabled',
      lastRun: '1 hour ago',
      lastRunStatus: 'success',
      processedRows: 500,
      failedRows: 0
    },
    { 
      id: '3', 
      name: 'Customer Data Sync', 
      sourceType: 'SFTP', 
      sourcePath: '/data/customers/customers_*.xlsx', 
      format: 'Excel', 
      schedule: 'Daily 6:00 AM', 
      status: 'disabled',
      lastRun: '1 day ago',
      lastRunStatus: 'failed',
      processedRows: 800,
      failedRows: 12
    },
  ];

  const importRuns: ImportRun[] = [
    { id: '1', runTime: '2024-01-15 14:30:00', duration: '2m 15s', processedRows: 1250, failedRows: 0, status: 'success' },
    { id: '2', runTime: '2024-01-15 13:30:00', duration: '1m 45s', processedRows: 1200, failedRows: 5, status: 'success' },
    { id: '3', runTime: '2024-01-15 12:30:00', duration: '3m 20s', processedRows: 1180, failedRows: 20, status: 'failed' },
  ];

  const currentSite = sites.find(s => s.id === selectedSite);
  const filteredSites = sites.filter(site => {
    const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         site.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || site.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredConfigs = importConfigs.filter(config => {
    const matchesType = importTypeFilter === 'all' || config.sourceType === importTypeFilter;
    return matchesType;
  });

  const openDrawer = (config?: ImportConfig) => {
    setSelectedConfig(config || null);
    setIsDrawerOpen(true);
    setActiveTab('connection');
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedConfig(null);
  };

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
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Imports</h1>
                  <p className="text-xs sm:text-sm text-gray-500">Manage import configurations</p>
                </div>
              </div>
              <nav className="hidden md:flex items-center gap-4 ml-4 pl-4 border-l border-gray-200">
                <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  Onboarding
                </Link>
                <Link href="/imports" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200">
                  Imports
                </Link>
                <Link href="/exports" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  Exports
                </Link>
              </nav>
            </div>
            
            {/* Global Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:flex-initial sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search sites..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                />
              </div>
              
              {/* Filters */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400 cursor-pointer bg-white text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                  </select>
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                
                <div className="relative">
                  <select
                    value={importTypeFilter}
                    onChange={(e) => setImportTypeFilter(e.target.value as any)}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400 cursor-pointer bg-white text-sm"
                  >
                    <option value="all">All Types</option>
                    <option value="SFTP">SFTP</option>
                    <option value="Upload">Upload</option>
                    <option value="API">API</option>
                  </select>
                  <FileCode className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              {/* Add Import Configuration Button */}
              <button
                onClick={() => openDrawer()}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 shadow-sm hover:shadow-md font-medium whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Import Configuration</span>
                <span className="sm:hidden">Add Import</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Sites List */}
        <aside className="w-full sm:w-80 lg:w-96 border-r border-gray-200 bg-gray-50 overflow-y-auto">
          <div className="p-4 space-y-2">
            <h2 className="text-sm font-semibold text-gray-700 mb-3 px-2">Sites</h2>
            {filteredSites.map((site) => (
              <div
                key={site.id}
                onClick={() => setSelectedSite(site.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedSite === site.id
                    ? 'bg-blue-50 border-blue-300 shadow-md'
                    : 'bg-white border-gray-200 hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{site.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{site.code}</p>
                  </div>
                  <div className="flex items-center gap-1.5 ml-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      site.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {site.status === 'active' ? 'Active' : 'Paused'}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    {site.lastImportStatus === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : site.lastImportStatus === 'failed' ? (
                      <XCircle className="w-4 h-4 text-red-600" />
                    ) : (
                      <Clock className="w-4 h-4 text-yellow-600" />
                    )}
                    <span className="text-xs text-gray-600">{site.lastImportTime}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => { e.stopPropagation(); }}
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all duration-200"
                      title="Manage site"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); }}
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all duration-200"
                      title="View logs"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Right Panel - Import Configurations */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {currentSite && (
            <>
              {/* Site Header Strip */}
              <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{currentSite.name}</h2>
                      <p className="text-sm text-gray-500">{currentSite.code}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={currentSite.status === 'active'}
                        onChange={() => {}}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 transition-all duration-200 font-medium text-sm">
                      <Server className="w-4 h-4" />
                      Test Connection
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 shadow-sm hover:shadow-md font-medium text-sm">
                      <Play className="w-4 h-4" />
                      Run Import Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Import Configurations Table */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Import Name</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Source Type</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Source Path</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Format</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Schedule</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Last Run</th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredConfigs.map((config) => (
                          <tr
                            key={config.id}
                            className="hover:bg-blue-50/50 transition-colors duration-150 cursor-pointer"
                            onClick={() => openDrawer(config)}
                          >
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="font-medium text-gray-900">{config.name}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                config.sourceType === 'SFTP' ? 'bg-blue-100 text-blue-700' :
                                config.sourceType === 'API' ? 'bg-purple-100 text-purple-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {config.sourceType}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <div className="text-sm text-gray-600 truncate max-w-xs">{config.sourcePath}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-600">{config.format}</span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                                <Calendar className="w-4 h-4" />
                                {config.schedule}
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                config.status === 'enabled'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}>
                                {config.status === 'enabled' ? 'Enabled' : 'Disabled'}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                {config.lastRunStatus === 'success' ? (
                                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-red-600" />
                                )}
                                <span className="text-sm text-gray-600">{config.lastRun}</span>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-right">
                              <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                                <button
                                  onClick={() => openDrawer(config)}
                                  className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all duration-200"
                                  title="Edit"
                                >
                                  <Settings className="w-4 h-4" />
                                </button>
                                <button
                                  className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all duration-200"
                                  title="Duplicate"
                                >
                                  <Copy className="w-4 h-4" />
                                </button>
                                <button
                                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-all duration-200"
                                  title="Disable"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                                <button
                                  className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all duration-200"
                                  title="View history"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Import Run History */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Import Run History</h3>
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Run Time</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Duration</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Processed Rows</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Failed Rows</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {importRuns.map((run) => (
                            <tr key={run.id} className="hover:bg-blue-50/50 transition-colors duration-150">
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{run.runTime}</td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{run.duration}</td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{run.processedRows.toLocaleString()}</td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <span className={`text-sm ${run.failedRows > 0 ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                                  {run.failedRows.toLocaleString()}
                                </span>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  run.status === 'success'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                }`}>
                                  {run.status === 'success' ? 'Success' : 'Failed'}
                                </span>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-right">
                                <div className="flex items-center justify-end gap-2">
                                  {run.failedRows > 0 && (
                                    <>
                                      <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded transition-all duration-200">
                                        <Download className="w-4 h-4" />
                                        Error Report
                                      </button>
                                      <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded transition-all duration-200">
                                        <AlertCircle className="w-4 h-4" />
                                        View Errors
                                      </button>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Import Config Detail Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeDrawer}></div>
          <div className="absolute right-0 top-0 h-full w-full sm:w-[600px] lg:w-[700px] bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedConfig ? 'Edit Import Configuration' : 'Add Import Configuration'}
              </h2>
              <button
                onClick={closeDrawer}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-all duration-200"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 px-6">
              <div className="flex space-x-1 overflow-x-auto">
                {[
                  { id: 'connection', label: 'Connection', icon: Server },
                  { id: 'fileRules', label: 'File Rules', icon: FileText },
                  { id: 'mapping', label: 'Mapping', icon: MapPin },
                  { id: 'schedule', label: 'Schedule', icon: Calendar },
                  { id: 'notifications', label: 'Notifications', icon: Mail },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'connection' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Host</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                      placeholder="sftp.example.com"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Port</label>
                      <input
                        type="number"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                        placeholder="22"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Auth Type</label>
                      <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400 cursor-pointer bg-white">
                        <option>Password</option>
                        <option>SSH Key</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                      placeholder="username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password / Key</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Remote Folder Path</label>
                    <div className="flex items-center gap-2">
                      <Folder className="w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                        placeholder="/data/imports"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'fileRules' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Filename Pattern</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                      placeholder="sales_*.csv"
                    />
                    <p className="text-xs text-gray-500 mt-1">Use * as wildcard</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Allowed Extensions</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                      placeholder="csv, xlsx, json"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Delimiter</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                        placeholder=","
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Encoding</label>
                      <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400 cursor-pointer bg-white">
                        <option>UTF-8</option>
                        <option>ASCII</option>
                        <option>ISO-8859-1</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                      <span className="text-sm text-gray-700">Has header row</span>
                    </label>
                  </div>
                </div>
              )}

              {activeTab === 'mapping' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Column Mapping</label>
                    <textarea
                      rows={6}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                      placeholder="source_column:target_column"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mandatory Fields</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                      placeholder="id, name, email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duplicate Handling</label>
                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400 cursor-pointer bg-white">
                      <option>Skip duplicates</option>
                      <option>Update existing</option>
                      <option>Create new record</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === 'schedule' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400 cursor-pointer bg-white">
                      <option>Daily</option>
                      <option>Hourly</option>
                      <option>Weekly</option>
                      <option>Custom (Cron)</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                      <input
                        type="time"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                      <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400 cursor-pointer bg-white">
                        <option>UTC</option>
                        <option>America/New_York</option>
                        <option>America/Chicago</option>
                        <option>America/Los_Angeles</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cutoff Time</label>
                    <input
                      type="time"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                      placeholder="Optional"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center gap-2 mb-4">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                      <span className="text-sm font-medium text-gray-700">Email on Success</span>
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 mb-4">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                      <span className="text-sm font-medium text-gray-700">Email on Failure</span>
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="border-t border-gray-200 p-6 flex items-center justify-end gap-3">
              <button
                onClick={closeDrawer}
                className="px-6 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={closeDrawer}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

