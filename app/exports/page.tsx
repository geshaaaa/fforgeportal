'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, Filter, Plus, Building2, CheckCircle2, XCircle, Clock, 
  Play, Settings, Copy, Eye, Download, AlertCircle, Server, 
  FileText, Calendar, Mail, Key, Folder, FileCode, MapPin,
  Globe, Send, Webhook, Database, Zap
} from 'lucide-react';

interface Site {
  id: string;
  name: string;
  code: string;
  status: 'active' | 'paused';
  lastExportStatus: 'success' | 'failed' | 'pending';
  lastExportTime: string;
}

interface ExportChannel {
  id: string;
  name: string;
  channelType: 'SFTP' | 'HTML Drop' | 'Email' | 'Webhook/API';
  destination: string;
  format: 'CSV' | 'Excel' | 'JSON' | 'XML' | 'HTML';
  schedule: string;
  status: 'enabled' | 'disabled';
  lastRun: string;
  lastRunStatus: 'success' | 'failed';
  recordCount?: number;
  fileSize?: string;
}

interface ExportRun {
  id: string;
  startTime: string;
  outputFileName: string;
  fileSize: string;
  recordCount: number;
  status: 'success' | 'failed';
  errorDetails?: string;
}

export default function ExportsPage() {
  const [selectedSite, setSelectedSite] = useState<string>('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused'>('all');
  const [channelTypeFilter, setChannelTypeFilter] = useState<'all' | 'SFTP' | 'HTML Drop' | 'Email' | 'Webhook/API'>('all');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<ExportChannel | null>(null);
  const [activeTab, setActiveTab] = useState<'destination' | 'exportContent' | 'format' | 'schedule' | 'notifications'>('destination');

  const sites: Site[] = [
    { id: '1', name: 'Main Office', code: 'SITE001', status: 'active', lastExportStatus: 'success', lastExportTime: '1 hour ago' },
    { id: '2', name: 'Warehouse A', code: 'SITE002', status: 'active', lastExportStatus: 'success', lastExportTime: '3 hours ago' },
    { id: '3', name: 'Retail Store', code: 'SITE003', status: 'paused', lastExportStatus: 'failed', lastExportTime: '1 day ago' },
    { id: '4', name: 'Distribution Center', code: 'SITE004', status: 'active', lastExportStatus: 'success', lastExportTime: '30 min ago' },
  ];

  const exportChannels: ExportChannel[] = [
    { 
      id: '1', 
      name: 'Daily Sales Report', 
      channelType: 'SFTP', 
      destination: 'sftp.example.com:/exports/sales', 
      format: 'CSV', 
      schedule: 'Daily 2:00 AM', 
      status: 'enabled',
      lastRun: '2 hours ago',
      lastRunStatus: 'success',
      recordCount: 1250,
      fileSize: '2.5 MB'
    },
    { 
      id: '2', 
      name: 'Inventory HTML Drop', 
      channelType: 'HTML Drop', 
      destination: '/var/www/exports/inventory', 
      format: 'HTML', 
      schedule: 'Hourly', 
      status: 'enabled',
      lastRun: '1 hour ago',
      lastRunStatus: 'success',
      recordCount: 500,
      fileSize: '1.2 MB'
    },
    { 
      id: '3', 
      name: 'Customer API Webhook', 
      channelType: 'Webhook/API', 
      destination: 'https://api.example.com/webhook/customers', 
      format: 'JSON', 
      schedule: 'Daily 6:00 AM', 
      status: 'enabled',
      lastRun: '6 hours ago',
      lastRunStatus: 'success',
      recordCount: 800,
      fileSize: '850 KB'
    },
    { 
      id: '4', 
      name: 'Weekly Email Report', 
      channelType: 'Email', 
      destination: 'reports@example.com', 
      format: 'Excel', 
      schedule: 'Weekly Monday 8:00 AM', 
      status: 'disabled',
      lastRun: '1 week ago',
      lastRunStatus: 'failed',
      recordCount: 0,
      fileSize: '0 MB'
    },
  ];

  const exportRuns: ExportRun[] = [
    { id: '1', startTime: '2024-01-15 14:30:00', outputFileName: 'sales_20240115.csv', fileSize: '2.5 MB', recordCount: 1250, status: 'success' },
    { id: '2', startTime: '2024-01-15 13:30:00', outputFileName: 'sales_20240115_1330.csv', fileSize: '2.4 MB', recordCount: 1200, status: 'success' },
    { id: '3', startTime: '2024-01-15 12:30:00', outputFileName: 'sales_20240115_1230.csv', fileSize: '2.3 MB', recordCount: 1180, status: 'failed', errorDetails: 'Connection timeout' },
  ];

  const currentSite = sites.find(s => s.id === selectedSite);
  const filteredSites = sites.filter(site => {
    const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         site.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || site.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredChannels = exportChannels.filter(channel => {
    const matchesType = channelTypeFilter === 'all' || channel.channelType === channelTypeFilter;
    return matchesType;
  });

  const openDrawer = (channel?: ExportChannel) => {
    setSelectedChannel(channel || null);
    setIsDrawerOpen(true);
    setActiveTab('destination');
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedChannel(null);
  };

  const getChannelIcon = (type: string) => {
    switch(type) {
      case 'SFTP': return Server;
      case 'HTML Drop': return Folder;
      case 'Email': return Mail;
      case 'Webhook/API': return Webhook;
      default: return FileCode;
    }
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
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Exports</h1>
                  <p className="text-xs sm:text-sm text-gray-500">Manage export channels</p>
                </div>
              </div>
              <nav className="hidden md:flex items-center gap-4 ml-4 pl-4 border-l border-gray-200">
                <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  Onboarding
                </Link>
                <Link href="/imports" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  Imports
                </Link>
                <Link href="/exports" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200">
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
                    value={channelTypeFilter}
                    onChange={(e) => setChannelTypeFilter(e.target.value as any)}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400 cursor-pointer bg-white text-sm"
                  >
                    <option value="all">All Channels</option>
                    <option value="SFTP">SFTP</option>
                    <option value="HTML Drop">HTML Drop</option>
                    <option value="Email">Email</option>
                    <option value="Webhook/API">Webhook/API</option>
                  </select>
                  <FileCode className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              {/* Add Export Channel Button */}
              <button
                onClick={() => openDrawer()}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 shadow-sm hover:shadow-md font-medium whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Export Channel</span>
                <span className="sm:hidden">Add Channel</span>
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
                
                <div className="flex items-center gap-2 mt-3">
                  {site.lastExportStatus === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : site.lastExportStatus === 'failed' ? (
                    <XCircle className="w-4 h-4 text-red-600" />
                  ) : (
                    <Clock className="w-4 h-4 text-yellow-600" />
                  )}
                  <span className="text-xs text-gray-600">Last export: {site.lastExportTime}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Right Panel - Export Channels */}
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
                      Test Destination
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 shadow-sm hover:shadow-md font-medium text-sm">
                      <Play className="w-4 h-4" />
                      Run Export Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Export Channels Table */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Channel Name</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Type</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Destination</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Format</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Schedule</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Last Run</th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredChannels.map((channel) => {
                          const Icon = getChannelIcon(channel.channelType);
                          return (
                            <tr
                              key={channel.id}
                              className="hover:bg-blue-50/50 transition-colors duration-150 cursor-pointer"
                              onClick={() => openDrawer(channel)}
                            >
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="font-medium text-gray-900">{channel.name}</div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                  <Icon className="w-4 h-4 text-blue-600" />
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    channel.channelType === 'SFTP' ? 'bg-blue-100 text-blue-700' :
                                    channel.channelType === 'HTML Drop' ? 'bg-green-100 text-green-700' :
                                    channel.channelType === 'Email' ? 'bg-purple-100 text-purple-700' :
                                    'bg-orange-100 text-orange-700'
                                  }`}>
                                    {channel.channelType}
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-4">
                                <div className="text-sm text-gray-600 truncate max-w-xs">{channel.destination}</div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <span className="text-sm text-gray-600">{channel.format}</span>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                                  <Calendar className="w-4 h-4" />
                                  {channel.schedule}
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  channel.status === 'enabled'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-gray-100 text-gray-700'
                                }`}>
                                  {channel.status === 'enabled' ? 'Enabled' : 'Disabled'}
                                </span>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                  {channel.lastRunStatus === 'success' ? (
                                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <XCircle className="w-4 h-4 text-red-600" />
                                  )}
                                  <span className="text-sm text-gray-600">{channel.lastRun}</span>
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-right">
                                <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                                  <button
                                    onClick={() => openDrawer(channel)}
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
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Export History */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Export History</h3>
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Start Time</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Output File</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">File Size</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Record Count</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {exportRuns.map((run) => (
                            <tr key={run.id} className="hover:bg-blue-50/50 transition-colors duration-150">
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{run.startTime}</td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                  <FileText className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm text-gray-900 font-medium">{run.outputFileName}</span>
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{run.fileSize}</td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{run.recordCount.toLocaleString()}</td>
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
                                  {run.status === 'success' && (
                                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded transition-all duration-200">
                                      <Download className="w-4 h-4" />
                                      Download
                                    </button>
                                  )}
                                  {run.status === 'failed' && run.errorDetails && (
                                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded transition-all duration-200">
                                      <AlertCircle className="w-4 h-4" />
                                      View Error
                                    </button>
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

      {/* Export Channel Detail Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeDrawer}></div>
          <div className="absolute right-0 top-0 h-full w-full sm:w-[600px] lg:w-[700px] bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedChannel ? 'Edit Export Channel' : 'Add Export Channel'}
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
                  { id: 'destination', label: 'Destination', icon: Server },
                  { id: 'exportContent', label: 'Export Content', icon: Database },
                  { id: 'format', label: 'Format', icon: FileCode },
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
              {activeTab === 'destination' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Channel Type</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400 cursor-pointer bg-white">
                      <option>SFTP</option>
                      <option>HTML Drop</option>
                      <option>Email</option>
                      <option>Webhook/API</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Host / Endpoint</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                      placeholder="sftp.example.com or https://api.example.com"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Port</label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                        placeholder="22"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Auth Type</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400 cursor-pointer bg-white">
                        <option>Password</option>
                        <option>SSH Key</option>
                        <option>API Key</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Username / API Key</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                      placeholder="username or API key"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password / Secret</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Path / Naming Convention</label>
                    <div className="flex items-center gap-2">
                      <Folder className="w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                        placeholder="/exports/{site_code}_{date}.csv"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Use variables: {'{site_code}'}, {'{date}'}, {'{timestamp}'}</p>
                  </div>
                </div>
              )}

              {activeTab === 'exportContent' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dataset Selection</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400 cursor-pointer bg-white">
                      <option>Sales Data</option>
                      <option>Inventory Data</option>
                      <option>Customer Data</option>
                      <option>All Tables</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Site Filter</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400 cursor-pointer bg-white">
                      <option>All Sites</option>
                      <option>Current Site Only</option>
                      <option>Selected Sites</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date Range From</label>
                      <input
                        type="date"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date Range To</label>
                      <input
                        type="date"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status Filter</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400 cursor-pointer bg-white">
                      <option>All Statuses</option>
                      <option>Active Only</option>
                      <option>Inactive Only</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Field Selection</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                      placeholder="Include: field1, field2, field3&#10;Exclude: field4, field5"
                    />
                    <p className="text-xs text-gray-500 mt-1">List fields to include or exclude, one per line</p>
                  </div>
                </div>
              )}

              {activeTab === 'format' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400 cursor-pointer bg-white">
                      <option>CSV</option>
                      <option>Excel</option>
                      <option>JSON</option>
                      <option>XML</option>
                      <option>HTML</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Delimiter</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                        placeholder=","
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Encoding</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400 cursor-pointer bg-white">
                        <option>UTF-8</option>
                        <option>ASCII</option>
                        <option>ISO-8859-1</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                      <span className="text-sm text-gray-700">Include header row</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                      <span className="text-sm text-gray-700">Compress as ZIP</span>
                    </label>
                  </div>
                </div>
              )}

              {activeTab === 'schedule' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400 cursor-pointer bg-white">
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400 cursor-pointer bg-white">
                        <option>UTC</option>
                        <option>America/New_York</option>
                        <option>America/Chicago</option>
                        <option>America/Los_Angeles</option>
                      </select>
                    </div>
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
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
                Save Channel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

