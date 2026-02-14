'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, Filter, Plus, Building2, CheckCircle2, XCircle, Clock, 
  Play, Settings, Copy, Eye, Download, AlertCircle, Server, 
  FileText, Calendar, Mail, Key, Folder, FileCode, MapPin,
  Globe, Send, Webhook, Database, Zap, RotateCcw, Save, Circle, Minus,
  ChevronLeft, ChevronRight
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

interface ExportFile {
  id: number;
  siteName: string;
  exportName: string;
  fileName: string;
  path: string;
  sftp: string;
  delimiter: string;
  sortBy: string;
  isActive: boolean;
  isAllEnabled: boolean;
}

interface ExportProfile {
  id: number;
  displayName: string;
  protocol: string;
  serverName: string;
  userName: string;
  modifiedOn: string;
  isActive: boolean;
}

interface ExportFieldMapping {
  id: number;
  dbField: string;
  exportFieldName: string;
  sortOrder: number;
  isMapped: boolean;
}

export default function ExportsPage() {
  const [selectedSite, setSelectedSite] = useState<string>('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused'>('all');
  const [channelTypeFilter, setChannelTypeFilter] = useState<'all' | 'SFTP' | 'HTML Drop' | 'Email' | 'Webhook/API'>('all');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<ExportChannel | null>(null);
  const [activeTab, setActiveTab] = useState<'destination' | 'exportContent' | 'format' | 'schedule' | 'notifications'>('destination');
  
  // New sections state
  const [activeSection, setActiveSection] = useState<'exportFiles' | 'exportProfile' | 'fieldMapping'>('exportFiles');
  const [exportFileSearchQuery, setExportFileSearchQuery] = useState('');
  const [exportProfileSearchQuery, setExportProfileSearchQuery] = useState('');
  const [fieldMappingSearchQuery, setFieldMappingSearchQuery] = useState('');
  const [isExportFileModalOpen, setIsExportFileModalOpen] = useState(false);
  const [isExportProfileModalOpen, setIsExportProfileModalOpen] = useState(false);
  const [selectedExportFile, setSelectedExportFile] = useState<ExportFile | null>(null);
  const [selectedExportProfile, setSelectedExportProfile] = useState<ExportProfile | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState('Potpourri');
  const [selectedSiteForMapping, setSelectedSiteForMapping] = useState('Back In The Saddle');
  const [selectedExportForMapping, setSelectedExportForMapping] = useState('Bing Export');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [sites, setSites] = useState<Site[]>([
    { id: '1', name: 'Main Office', code: 'SITE001', status: 'active', lastExportStatus: 'success', lastExportTime: '1 hour ago' },
    { id: '2', name: 'Warehouse A', code: 'SITE002', status: 'active', lastExportStatus: 'success', lastExportTime: '3 hours ago' },
    { id: '3', name: 'Retail Store', code: 'SITE003', status: 'paused', lastExportStatus: 'failed', lastExportTime: '1 day ago' },
    { id: '4', name: 'Distribution Center', code: 'SITE004', status: 'active', lastExportStatus: 'success', lastExportTime: '30 min ago' },
  ]);

  const toggleSiteStatus = (siteId: string) => {
    setSites(prevSites => 
      prevSites.map(site => 
        site.id === siteId 
          ? { ...site, status: site.status === 'active' ? 'paused' : 'active' }
          : site
      )
    );
  };

  const [exportFiles, setExportFiles] = useState<ExportFile[]>([
    { id: 600, siteName: 'Signals', exportName: 'CJ Export', fileName: 'signals_cj.txt', path: 'C:\\Production\\Pr...', sftp: 'FTP for Signals', delimiter: 'TAB', sortBy: 'id', isActive: true, isAllEnabled: false },
    { id: 449, siteName: 'Basbleu', exportName: 'Google Shopping', fileName: 'basbleu_google.txt', path: 'C:\\Production\\Pr...', sftp: 'Basbleu Criteo', delimiter: 'TAB', sortBy: 'id', isActive: true, isAllEnabled: false },
    { id: 9, siteName: 'Natures Jewelry', exportName: 'Criteo Export', fileName: 'naturesjewelry_criteo.txt', path: 'C:\\Production\\Pr...', sftp: 'NaturesJewelry Micro...', delimiter: 'TAB', sortBy: 'id', isActive: true, isAllEnabled: false },
    { id: 10, siteName: 'Young Explorers', exportName: 'Bing Shopping', fileName: 'youngexplorers_bing.txt', path: 'C:\\Production\\Pr...', sftp: 'data-sftp.criteo.com', delimiter: 'TAB', sortBy: 'id', isActive: true, isAllEnabled: false },
    { id: 11, siteName: 'Signals Al', exportName: 'Google Shopping', fileName: 'signals_google_Al.txt', path: 'C:\\Production\\Pr...', sftp: 'FTP for Signal Al', delimiter: 'TAB', sortBy: 'id', isActive: true, isAllEnabled: true },
    { id: 12, siteName: 'Chadwicks', exportName: 'Links', fileName: 'links.csv', path: 'C:\\Production\\Pr...', sftp: 'FTP for Chadwicks', delimiter: '', sortBy: 'id', isActive: true, isAllEnabled: false },
    { id: 13, siteName: 'Whatever Works', exportName: '404 Checker', fileName: 'whateverworks_404.txt', path: 'C:\\Production\\Pr...', sftp: 'FTP for Whatever Works', delimiter: 'TAB', sortBy: 'id', isActive: false, isAllEnabled: false },
    { id: 14, siteName: 'In The Company of Dogs', exportName: 'Crawl Breadcrumbs Lin...', fileName: 'companydogs404Checker.txt', path: 'C:\\Production\\Pr...', sftp: 'FTP for Company Dogs', delimiter: 'TAB', sortBy: 'id', isActive: true, isAllEnabled: false },
  ]);

  const [exportProfiles, setExportProfiles] = useState<ExportProfile[]>([
    { id: 1, displayName: 'FTP for Northstyle', protocol: 'FTP', serverName: '103.235.104.206', userName: 'ETLUser', modifiedOn: 'Apr 26 2025 1:04AM', isActive: true },
    { id: 2, displayName: 'FTP for Signals', protocol: 'FTP', serverName: '103.235.104.206', userName: 'ETLUser', modifiedOn: 'Apr 26 2025 1:04AM', isActive: true },
    { id: 3, displayName: 'Read Only (Test SFTP Server)', protocol: 'SFTP', serverName: 'test.rebex.net', userName: 'demo', modifiedOn: 'Oct 5 2024 6:08AM', isActive: false },
    { id: 4, displayName: 'FTP for Basbleu', protocol: 'FTP', serverName: '103.235.104.206', userName: 'ETLUser', modifiedOn: 'Apr 26 2025 1:04AM', isActive: true },
    { id: 5, displayName: 'FTP for Chadwicks', protocol: 'FTP', serverName: '103.235.104.206', userName: 'ETLUser', modifiedOn: 'Apr 26 2025 1:04AM', isActive: true },
    { id: 6, displayName: 'FTP for Whatever Works', protocol: 'FTP', serverName: '103.235.104.206', userName: 'ETLUser', modifiedOn: 'Apr 26 2025 1:04AM', isActive: true },
    { id: 7, displayName: 'Our New SFTP Server', protocol: 'SFTP', serverName: '198.38.89.166', userName: 'MagellansUser', modifiedOn: 'Mar 25 2025 1:52AM', isActive: false },
  ]);

  const toggleExportFileActive = (fileId: number) => {
    setExportFiles(prevFiles => 
      prevFiles.map(file => 
        file.id === fileId 
          ? { ...file, isActive: !file.isActive }
          : file
      )
    );
  };

  const toggleExportFileAllEnabled = (fileId: number) => {
    setExportFiles(prevFiles => 
      prevFiles.map(file => 
        file.id === fileId 
          ? { ...file, isAllEnabled: !file.isAllEnabled }
          : file
      )
    );
  };

  const toggleExportProfileActive = (profileId: number) => {
    setExportProfiles(prevProfiles => 
      prevProfiles.map(profile => 
        profile.id === profileId 
          ? { ...profile, isActive: !profile.isActive }
          : profile
      )
    );
  };

  const exportFieldMappings: ExportFieldMapping[] = [
    { id: 1, dbField: 'id', exportFieldName: 'id', sortOrder: 10, isMapped: true },
    { id: 2, dbField: 'title', exportFieldName: 'title', sortOrder: 20, isMapped: true },
    { id: 3, dbField: 'description', exportFieldName: 'description', sortOrder: 30, isMapped: true },
    { id: 4, dbField: 'bing_link', exportFieldName: 'link', sortOrder: 40, isMapped: true },
    { id: 5, dbField: 'price', exportFieldName: 'price', sortOrder: 50, isMapped: true },
    { id: 6, dbField: 'availability', exportFieldName: 'availability', sortOrder: 60, isMapped: true },
    { id: 7, dbField: 'image_link', exportFieldName: 'image_link', sortOrder: 70, isMapped: true },
    { id: 8, dbField: 'brand', exportFieldName: 'brand', sortOrder: 80, isMapped: true },
    { id: 9, dbField: 'condition', exportFieldName: 'condition', sortOrder: 90, isMapped: true },
    { id: 10, dbField: 'gtin', exportFieldName: 'gtin', sortOrder: 100, isMapped: true },
    { id: 11, dbField: 'mpn', exportFieldName: 'mpn', sortOrder: 110, isMapped: true },
    { id: 12, dbField: 'google_product_category', exportFieldName: 'product_category', sortOrder: 130, isMapped: true },
    { id: 13, dbField: 'color', exportFieldName: 'color', sortOrder: 140, isMapped: true },
    { id: 14, dbField: 'gender', exportFieldName: 'gender', sortOrder: 150, isMapped: true },
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
      <main className="flex-1 flex overflow-hidden relative">
        {/* Slider Toggle Button - Always visible, positioned outside sidebar */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`absolute ${isSidebarOpen ? 'left-full sm:left-80 lg:left-96 -ml-8' : 'left-0'} top-1/2 -translate-y-1/2 z-30 bg-white border border-gray-300 ${isSidebarOpen ? 'rounded-l-lg' : 'rounded-r-lg'} p-2 shadow-md hover:bg-gray-50 transition-all duration-300 ease-in-out hover:shadow-lg`}
          title={isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
        >
          {isSidebarOpen ? (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          )}
        </button>

        {/* Left Sidebar - Sites List */}
        <aside className={`${isSidebarOpen ? 'w-full sm:w-80 lg:w-96' : 'w-0'} border-r border-gray-200 bg-gray-50 overflow-y-auto transition-all duration-300 ease-in-out relative`}>
          <div className={`p-3 space-y-1.5 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <h2 className="text-sm font-semibold text-gray-700 mb-2 px-2">Sites</h2>
            {filteredSites.map((site) => (
              <div
                key={site.id}
                onClick={() => setSelectedSite(site.id)}
                className={`p-2.5 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedSite === site.id
                    ? 'bg-blue-50 border-blue-300 shadow-md'
                    : 'bg-white border-gray-200 hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-gray-900 truncate">{site.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{site.code}</p>
                  </div>
                  <div className="flex items-center gap-1.5 ml-2">
                    <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                      site.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {site.status === 'active' ? 'Active' : 'Paused'}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1.5 mt-2">
                  {site.lastExportStatus === 'success' ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                  ) : site.lastExportStatus === 'failed' ? (
                    <XCircle className="w-3.5 h-3.5 text-red-600" />
                  ) : (
                    <Clock className="w-3.5 h-3.5 text-yellow-600" />
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
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleSiteStatus(currentSite.id);
                        }}
                        onClick={(e) => e.stopPropagation()}
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

              {/* Section Tabs */}
              <div className="border-b border-gray-200 bg-white">
                <div className="flex space-x-1 px-4 sm:px-6 lg:px-8">
                  {[
                    { id: 'exportFiles', label: 'Manage Export Files', icon: FileText },
                    { id: 'exportProfile', label: 'Export Profile', icon: Server },
                    { id: 'fieldMapping', label: 'Export File Field Mapping', icon: MapPin },
                  ].map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id as any)}
                        className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap ${
                          activeSection === section.id
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {section.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                {/* Manage Export Files Section */}
                {activeSection === 'exportFiles' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900">Manage Export Files</h2>
                      <button
                        onClick={() => {
                          setSelectedExportFile(null);
                          setIsExportFileModalOpen(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
                      >
                        <Plus className="w-4 h-4" />
                        Add Export File
                      </button>
                    </div>

                    {/* Search Bar */}
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-all">
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={exportFileSearchQuery}
                          onChange={(e) => setExportFileSearchQuery(e.target.value)}
                          placeholder="Search All Fields"
                          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                        <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>

                    {/* Export Files Table */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">A</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Al En...</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Id</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">SiteName</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">ExportName</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">File Name</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Path</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">S-FTP</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Deli...</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">SortB</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {exportFiles
                              .filter(file => 
                                Object.values(file).some(val => 
                                  String(val).toLowerCase().includes(exportFileSearchQuery.toLowerCase())
                                )
                              )
                              .map((file) => (
                                <tr
                                  key={file.id}
                                  className="hover:bg-blue-50/50 transition-colors cursor-pointer"
                                  onClick={() => {
                                    setSelectedExportFile(file);
                                    setIsExportFileModalOpen(true);
                                  }}
                                >
                                  <td className="px-4 py-3">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleExportFileActive(file.id);
                                      }}
                                      className={`w-3 h-3 rounded-full ${file.isActive ? 'bg-green-500' : 'bg-red-500'} hover:opacity-80 transition-opacity`}
                                    ></button>
                                  </td>
                                  <td className="px-4 py-3">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleExportFileAllEnabled(file.id);
                                      }}
                                    >
                                      {file.isAllEnabled ? (
                                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                                      ) : (
                                        <div className="w-4 h-4 rounded-full border-2 border-red-500 flex items-center justify-center">
                                          <Minus className="w-3 h-3 text-red-500" />
                                        </div>
                                      )}
                                    </button>
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-900">{file.id}</td>
                                  <td className="px-4 py-3 text-sm text-gray-900">{file.siteName}</td>
                                  <td className="px-4 py-3 text-sm text-gray-900">{file.exportName}</td>
                                  <td className="px-4 py-3 text-sm text-gray-600">{file.fileName}</td>
                                  <td className="px-4 py-3 text-sm text-gray-600">{file.path}</td>
                                  <td className="px-4 py-3 text-sm text-gray-600">{file.sftp}</td>
                                  <td className="px-4 py-3 text-sm text-gray-600">{file.delimiter || '-'}</td>
                                  <td className="px-4 py-3 text-sm text-gray-600">{file.sortBy}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* Export Profile Section */}
                {activeSection === 'exportProfile' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900">Export Profile</h2>
                      <button
                        onClick={() => {
                          setSelectedExportProfile(null);
                          setIsExportProfileModalOpen(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
                      >
                        <Plus className="w-4 h-4" />
                        Add Profile
                      </button>
                    </div>

                    {/* Search Bar */}
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-all">
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={exportProfileSearchQuery}
                          onChange={(e) => setExportProfileSearchQuery(e.target.value)}
                          placeholder="Search All Fields"
                          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                        <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>

                    {/* Export Profiles Table */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Active</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">ID</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">DisplayName</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Protocol</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">ServerName</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">UserName</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">ModifiedOn</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {exportProfiles
                              .filter(profile => 
                                Object.values(profile).some(val => 
                                  String(val).toLowerCase().includes(exportProfileSearchQuery.toLowerCase())
                                )
                              )
                              .map((profile) => (
                                <tr
                                  key={profile.id}
                                  className="hover:bg-blue-50/50 transition-colors cursor-pointer"
                                  onClick={() => {
                                    setSelectedExportProfile(profile);
                                    setIsExportProfileModalOpen(true);
                                  }}
                                >
                                  <td className="px-4 py-3">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleExportProfileActive(profile.id);
                                      }}
                                      className={`w-3 h-3 rounded-full ${profile.isActive ? 'bg-green-500' : 'bg-red-500'} hover:opacity-80 transition-opacity`}
                                    ></button>
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-900">{profile.id}</td>
                                  <td className="px-4 py-3 text-sm text-gray-900">{profile.displayName}</td>
                                  <td className="px-4 py-3 text-sm text-gray-600">{profile.protocol}</td>
                                  <td className="px-4 py-3 text-sm text-gray-600">{profile.serverName}</td>
                                  <td className="px-4 py-3 text-sm text-gray-600">{profile.userName}</td>
                                  <td className="px-4 py-3 text-sm text-gray-600">{profile.modifiedOn}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* Export File Field Mapping Section */}
                {activeSection === 'fieldMapping' && (
                  <div className="space-y-4">
                    {/* Header with Dropdowns */}
                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                      <div className="flex flex-wrap items-center gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Customers</label>
                          <select
                            value={selectedCustomer}
                            onChange={(e) => setSelectedCustomer(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-sm"
                          >
                            <option>Potpourri</option>
                            <option>Customer 2</option>
                            <option>Customer 3</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Sites</label>
                          <select
                            value={selectedSiteForMapping}
                            onChange={(e) => setSelectedSiteForMapping(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-sm"
                          >
                            <option>Back In The Saddle</option>
                            <option>Site 2</option>
                            <option>Site 3</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Exports</label>
                          <select
                            value={selectedExportForMapping}
                            onChange={(e) => setSelectedExportForMapping(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-sm"
                          >
                            <option>Bing Export</option>
                            <option>CJ Export</option>
                            <option>Google Export</option>
                            <option>Criteo Export</option>
                            <option>Commission Junction Export</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900">Export File Field Mapping</h2>
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200">
                          <Plus className="w-4 h-4" />
                          Add New
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200">
                          <Save className="w-4 h-4" />
                          Save
                        </button>
                      </div>
                    </div>

                    {/* Search Bar */}
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-all">
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={fieldMappingSearchQuery}
                          onChange={(e) => setFieldMappingSearchQuery(e.target.value)}
                          placeholder="Search All Fields"
                          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                        <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>

                    {/* Field Mapping Table */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">ID</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Mapped?</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">DB Field</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Export Field Name</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Sort Order</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {exportFieldMappings
                              .filter(mapping => 
                                Object.values(mapping).some(val => 
                                  String(val).toLowerCase().includes(fieldMappingSearchQuery.toLowerCase())
                                )
                              )
                              .map((mapping) => (
                                <tr key={mapping.id} className="hover:bg-blue-50/50 transition-colors">
                                  <td className="px-4 py-3 text-sm text-gray-900">{mapping.id}</td>
                                  <td className="px-4 py-3">
                                    {mapping.isMapped ? (
                                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                                    ) : (
                                      <Circle className="w-5 h-5 text-gray-300" />
                                    )}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-900">{mapping.dbField}</td>
                                  <td className="px-4 py-3 text-sm text-gray-600">{mapping.exportFieldName}</td>
                                  <td className="px-4 py-3 text-sm text-gray-600">{mapping.sortOrder}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Export File Modal */}
      {isExportFileModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsExportFileModalOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full sm:w-[600px] bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Edit Record</h2>
              <button
                onClick={() => setIsExportFileModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-all"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ID</label>
                  <input
                    type="text"
                    defaultValue={selectedExportFile?.id || ''}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site</label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer bg-white">
                    <option>Select Site...</option>
                    <option>Signals</option>
                    <option>Basbleu</option>
                    <option>Natures Jewelry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ExportName <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    defaultValue={selectedExportFile?.exportName || ''}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LocalFilePath <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    defaultValue={selectedExportFile?.path || ''}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LocalFileName <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    defaultValue={selectedExportFile?.fileName || ''}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ExportProfileId</label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer bg-white">
                    <option>Select Profile...</option>
                    <option>FTP for Signals</option>
                    <option>FTP for Basbleu</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Delimiter <span className="text-red-500">*</span></label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer bg-white">
                    <option>TAB</option>
                    <option>,</option>
                    <option>PIPE</option>
                    <option>XML</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SortBy <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    defaultValue={selectedExportFile?.sortBy || 'id'}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort Direction <span className="text-red-500">*</span></label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer bg-white">
                    <option>Ascending</option>
                    <option>Descending</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Export Method <span className="text-red-500">*</span></label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer bg-white">
                    <option>SFTP</option>
                    <option>FTP</option>
                    <option>Local</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Export SQL</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Use AI</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      defaultChecked={selectedExportFile?.isActive || false}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">isActive</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 p-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setIsExportFileModalOpen(false)}
                className="px-6 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsExportFileModalOpen(false)}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Profile Modal */}
      {isExportProfileModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsExportProfileModalOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full sm:w-[600px] bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Edit Record</h2>
              <button
                onClick={() => setIsExportProfileModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-all"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ID</label>
                  <input
                    type="text"
                    defaultValue={selectedExportProfile?.id || ''}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">DisplayName <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    defaultValue={selectedExportProfile?.displayName || ''}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Protocol <span className="text-red-500">*</span></label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer bg-white">
                    <option>FTP</option>
                    <option>SFTP</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ServerName <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    defaultValue={selectedExportProfile?.serverName || ''}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">UserName <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    defaultValue={selectedExportProfile?.userName || ''}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pwd <span className="text-red-500">*</span></label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">hostkey <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Operation <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">DestinationPath <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Schedule <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      defaultChecked={selectedExportProfile?.isActive || false}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">isActive</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 p-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setIsExportProfileModalOpen(false)}
                className="px-6 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsExportProfileModalOpen(false)}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

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

