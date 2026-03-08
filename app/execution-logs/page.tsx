'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, RotateCcw, Plus, CheckCircle2, AlertTriangle, 
  Info, Download, Box, List, FileText, Upload, X, 
  RefreshCw, Filter, Search, ChevronLeft, ChevronRight,
  BarChart3, Activity
} from 'lucide-react';

interface Batch {
  id: number;
  createdOn: string;
  status: 'success' | 'error';
}

interface ExecutionLog {
  id: number;
  executionId: number;
  site: string;
  info: string;
  runTime: string;
  executionStart: string;
  executionEnd?: string;
  duration?: string;
  status: 'success' | 'failed' | 'pending';
  type: 'download' | 'load' | 'transform' | 'create' | 'upload';
}

export default function ExecutionLogsPage() {
  const [selectedBatch, setSelectedBatch] = useState<number>(895);
  const [showSSISLogs, setShowSSISLogs] = useState(true);
  const [showTransformLogs, setShowTransformLogs] = useState(true);
  const [showTroubleshoot, setShowTroubleshoot] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const batches: Batch[] = [
    { id: 898, createdOn: 'Feb 21 2026 7:00AM', status: 'error' },
    { id: 897, createdOn: 'Feb 20 2026 7:00AM', status: 'error' },
    { id: 896, createdOn: 'Feb 19 2026 7:00AM', status: 'error' },
    { id: 895, createdOn: 'Feb 18 2026 7:00AM', status: 'success' },
    { id: 894, createdOn: 'Feb 17 2026 7:00AM', status: 'success' },
    { id: 893, createdOn: 'Feb 16 2026 7:00AM', status: 'success' },
    { id: 892, createdOn: 'Feb 15 2026 7:00AM', status: 'error' },
    { id: 891, createdOn: 'Feb 14 2026 7:00AM', status: 'success' },
    { id: 890, createdOn: 'Feb 13 2026 7:00AM', status: 'success' },
    { id: 889, createdOn: 'Feb 12 2026 7:00AM', status: 'success' },
    { id: 888, createdOn: 'Feb 11 2026 7:00AM', status: 'success' },
    { id: 887, createdOn: 'Feb 10 2026 7:00AM', status: 'success' },
    { id: 886, createdOn: 'Feb 9 2026 7:00AM', status: 'success' },
    { id: 885, createdOn: 'Feb 8 2026 7:00AM', status: 'success' },
    { id: 884, createdOn: 'Feb 7 2026 7:00AM', status: 'success' },
  ];

  const executionLogs: ExecutionLog[] = [
    { 
      id: 898, 
      executionId: 157590, 
      site: 'Sagefinds', 
      info: '4 Sec | SageFinds.xml from sftp.blocklogic.tech incoming to C:\\Production\\ProcessFiles\\Imports\\Po...', 
      runTime: 'Feb 18 2026 7:00AM',
      executionStart: 'Feb 18 2026 7:05AM',
      duration: '4 Sec',
      status: 'success',
      type: 'download'
    },
    { 
      id: 897, 
      executionId: 157934, 
      site: 'Sagefinds', 
      info: '5 Sec | [Google Shopping Export] Loading C:\\Production\\ProcessFiles\\Imports\\Potpourri\\SageFinds....', 
      runTime: 'Feb 18 2026 7:00AM',
      executionStart: 'Feb 18 2026 7:05AM',
      duration: '5 Sec',
      status: 'success',
      type: 'load'
    },
    { 
      id: 896, 
      executionId: 157935, 
      site: 'Sagefinds', 
      info: '163 Sec | [Google Shopping Export] Applying 1428 Transform Rules on SagefindsWorkingTable', 
      runTime: 'Feb 18 2026 7:00AM',
      executionStart: 'Feb 18 2026 7:05AM',
      duration: '163 Sec',
      status: 'success',
      type: 'transform'
    },
    { 
      id: 895, 
      executionId: 157936, 
      site: 'Sagefinds', 
      info: '2 Sec | [Google Shopping Export] Creating File: C:\\Production\\ProcessFiles\\Exports\\Sagefinds\\Googl...', 
      runTime: 'Feb 18 2026 7:00AM',
      executionStart: 'Feb 18 2026 7:07AM',
      duration: '2 Sec',
      status: 'success',
      type: 'create'
    },
    { 
      id: 894, 
      executionId: 157937, 
      site: 'Sagefinds', 
      info: '28 Sec | [Google Shopping Export] sagefinds.txt Uplaoded to partnerupload.google.com:19321//', 
      runTime: 'Feb 18 2026 7:00AM',
      executionStart: 'Feb 18 2026 7:07AM',
      duration: '28 Sec',
      status: 'success',
      type: 'upload'
    },
    { 
      id: 893, 
      executionId: 157938, 
      site: 'Sagefinds', 
      info: '4 Sec | [Bing Export] Loading C:\\Production\\ProcessFiles\\Imports\\Potpourri\\SageFinds.xml in Sagefi...', 
      runTime: 'Feb 18 2026 7:00AM',
      executionStart: 'Feb 18 2026 7:08AM',
      duration: '4 Sec',
      status: 'success',
      type: 'load'
    },
    { 
      id: 892, 
      executionId: 157939, 
      site: 'Sagefinds', 
      info: '164 Sec | [Bing Export] Applying 1428 Transform Rules on SagefindsWorkingTable', 
      runTime: 'Feb 18 2026 7:00AM',
      executionStart: 'Feb 18 2026 7:08AM',
      duration: '164 Sec',
      status: 'success',
      type: 'transform'
    },
    { 
      id: 891, 
      executionId: 157940, 
      site: 'Sagefinds', 
      info: '1 Sec | [Bing Export] Creating File: C:\\Production\\ProcessFiles\\Exports\\Sagefinds\\sagefinds_micro.txt', 
      runTime: 'Feb 18 2026 7:00AM',
      executionStart: 'Feb 18 2026 7:11AM',
      duration: '1 Sec',
      status: 'success',
      type: 'create'
    },
    { 
      id: 890, 
      executionId: 157941, 
      site: 'Sagefinds', 
      info: '10 Sec | [Bing Export] sagefinds_micro.txt Uplaoded to feeds.adcenter.microsoft.com//', 
      runTime: 'Feb 18 2026 7:00AM',
      executionStart: 'Feb 18 2026 7:11AM',
      duration: '10 Sec',
      status: 'success',
      type: 'upload'
    },
    { 
      id: 889, 
      executionId: 157942, 
      site: 'Sagefinds', 
      info: '5 Sec | [Criteo Export] Loading C:\\Production\\ProcessFiles\\Imports\\Potpourri\\SageFinds.xml in Sage...', 
      runTime: 'Feb 18 2026 7:00AM',
      executionStart: 'Feb 18 2026 7:11AM',
      duration: '5 Sec',
      status: 'success',
      type: 'load'
    },
    { 
      id: 888, 
      executionId: 157943, 
      site: 'Sagefinds', 
      info: '179 Sec | [Criteo Export] Applying 1430 Transform Rules on SagefindsWorkingTable', 
      runTime: 'Feb 18 2026 7:00AM',
      executionStart: 'Feb 18 2026 7:11AM',
      duration: '179 Sec',
      status: 'success',
      type: 'transform'
    },
    { 
      id: 887, 
      executionId: 157944, 
      site: 'Sagefinds', 
      info: '1 Sec | [Criteo Export] Creating File: C:\\Production\\ProcessFiles\\Exports\\Sagefinds\\SagefindsCriteo.t...', 
      runTime: 'Feb 18 2026 7:00AM',
      executionStart: 'Feb 18 2026 7:14AM',
      duration: '1 Sec',
      status: 'success',
      type: 'create'
    },
    { 
      id: 886, 
      executionId: 157945, 
      site: 'Sagefinds', 
      info: '9 Sec | [Criteo Export] SagefindsCriteo.txt Uplaoded to data-sftp.criteo.com//', 
      runTime: 'Feb 18 2026 7:00AM',
      executionStart: 'Feb 18 2026 7:14AM',
      duration: '9 Sec',
      status: 'success',
      type: 'upload'
    },
    { 
      id: 885, 
      executionId: 157946, 
      site: 'Sagefinds', 
      info: '5 Sec | [Commission Junction] Loading C:\\Production\\ProcessFiles\\Imports\\Potpourri\\SageFinds.xml...', 
      runTime: 'Feb 18 2026 7:00AM',
      executionStart: 'Feb 18 2026 7:14AM',
      duration: '5 Sec',
      status: 'success',
      type: 'load'
    },
    { 
      id: 884, 
      executionId: 157947, 
      site: 'Sagefinds', 
      info: '179 Sec | [Commission Junction] Applying 1428 Transform Rules on SagefindsWorkingTable', 
      runTime: 'Feb 18 2026 7:00AM',
      executionStart: 'Feb 18 2026 7:14AM',
      duration: '179 Sec',
      status: 'success',
      type: 'transform'
    },
  ];

  const selectedBatchData = batches.find(b => b.id === selectedBatch);
  const filteredLogs = executionLogs.filter(log => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        log.site.toLowerCase().includes(query) ||
        log.info.toLowerCase().includes(query) ||
        log.executionId.toString().includes(query)
      );
    }
    return true;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'download':
        return <Download className="w-4 h-4 text-gray-600" />;
      case 'load':
        return <Box className="w-4 h-4 text-gray-600" />;
      case 'transform':
        return <List className="w-4 h-4 text-gray-600" />;
      case 'create':
        return <FileText className="w-4 h-4 text-gray-600" />;
      case 'upload':
        return <Upload className="w-4 h-4 text-gray-600" />;
      default:
        return <Info className="w-4 h-4 text-gray-600" />;
    }
  };

  const failedCount = executionLogs.filter(log => log.status === 'failed').length;

  return (
    <div className="min-h-screen bg-[#FBF9F7] flex relative">
      {/* Left Navigation Sidebar */}
      <aside className={`${mounted && isSidebarOpen ? 'w-64' : mounted ? 'w-20' : 'w-64'} bg-[#FBF9F7] border-r border-gray-200 flex flex-col sticky top-0 h-screen transition-all duration-300 ease-in-out`} suppressHydrationWarning>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <Link href="/dashboard" className={`flex items-center gap-3 ${!isSidebarOpen ? 'justify-center w-full' : ''}`}>
              <div className="w-10 h-10 bg-gradient-to-br from-[#000000] to-[#000000] rounded-lg flex items-center justify-center hover:from-[#000000] hover:to-[#000000] transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg flex-shrink-0">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              {isSidebarOpen && (
                <div>
                  <h1 className="text-lg font-bold text-gray-900">FeedForge</h1>
                  <p className="text-xs text-gray-500">Data Feeding Portal</p>
                </div>
              )}
            </Link>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/dashboard" className={`flex items-center ${isSidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-2.5 text-sm font-medium text-gray-700 hover:text-[#000000]  rounded-lg transition-colors duration-200`}>
            <BarChart3 className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span>Dashboard</span>}
          </Link>
          <Link href="/imports" className={`flex items-center ${isSidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-2.5 text-sm font-medium text-gray-700 hover:text-[#000000]  rounded-lg transition-colors duration-200`}>
            <Download className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span>Imports</span>}
          </Link>
          <Link href="/exports" className={`flex items-center ${isSidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-2.5 text-sm font-medium text-gray-700 hover:text-[#000000]  rounded-lg transition-colors duration-200`}>
            <Upload className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span>Exports</span>}
          </Link>
          <Link href="/sites" className={`flex items-center ${isSidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-2.5 text-sm font-medium text-gray-700 hover:text-[#000000]  rounded-lg transition-colors duration-200`}>
            <Building2 className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span>Sites</span>}
          </Link>
          <Link href="/reports" className={`flex items-center ${isSidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-2.5 text-sm font-medium text-gray-700 hover:text-[#000000]  rounded-lg transition-colors duration-200`}>
            <FileText className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span>Reports</span>}
          </Link>
          <Link href="/execution-logs" className={`flex items-center ${isSidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-2.5 text-sm font-medium text-white bg-[#000000] rounded-lg transition-colors duration-200`}>
            <Activity className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span>Execution Logs</span>}
          </Link>
        </nav>
      </aside>

      {/* Sidebar Toggle Button - Attached to sidebar edge */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`absolute ${mounted && isSidebarOpen ? 'left-64' : mounted ? 'left-20' : 'left-64'} top-1/2 -translate-y-1/2 z-30 bg-[#FBF9F7] border border-gray-300 ${mounted && isSidebarOpen ? 'rounded-r-lg rounded-l-none' : 'rounded-l-lg rounded-r-none'} p-2 shadow-md hover:bg-[#FBF9F7] transition-all duration-300 ease-in-out hover:shadow-lg`}
        title={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        suppressHydrationWarning
      >
        {mounted && isSidebarOpen ? (
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-600" />
        )}
      </button>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-[#FBF9F7] border-b border-gray-200 sticky top-0 z-20 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Execution Logs</h1>
                <p className="text-xs sm:text-sm text-gray-500">View batch execution history and logs</p>
              </div>
              <Link 
                href="/dashboard" 
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    
                  }
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-all duration-200 flex items-center gap-1.5 shadow-sm"
              >
                <FileText className="w-4 h-4" />
                Onboarding
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content - Two Panel Layout */}
        <main className="flex-1 flex overflow-hidden">
        {/* Left Panel - Batches */}
        <div className="w-80 border-r border-gray-200 bg-[#FBF9F7] flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-[#FBF9F7]">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-900">Batches</h2>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-[#FBF9F7] rounded transition-all">
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#000000] text-white rounded-lg hover:bg-[#000000] transition-all duration-200 text-sm font-medium">
                  <Plus className="w-4 h-4" />
                  Add Batch
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <table className="w-full">
              <thead className="bg-[#FBF9F7] border-b border-gray-200 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">#</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Created On</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-[#FBF9F7] divide-y divide-gray-200">
                {batches.map((batch, index) => {
                  const isSelected = selectedBatch === batch.id;
                  return (
                  <tr
                    key={batch.id}
                    onClick={() => setSelectedBatch(batch.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#000000] text-white'
                        : 'hover:bg-[#FBF9F7]'
                    }`}
                  >
                    <td className={`px-4 py-3 text-sm ${isSelected ? 'text-white' : 'text-gray-900'}`}>{batch.id}</td>
                    <td className={`px-4 py-3 text-sm ${isSelected ? 'text-white' : 'text-gray-600'}`}>{batch.createdOn}</td>
                    <td className="px-4 py-3">
                      {batch.status === 'success' ? (
                        <CheckCircle2 className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-[#000000]'}`} />
                      ) : (
                        <AlertTriangle className={`w-5 h-5 ${isSelected ? 'text-red-300' : 'text-red-600'}`} />
                      )}
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel - Execution Summary */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#FBF9F7]">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Execution Summary Batch #{selectedBatch}
              </h2>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-[#FBF9F7] rounded transition-all">
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showSSISLogs}
                  onChange={(e) => setShowSSISLogs(e.target.checked)}
                  className="w-4 h-4 text-[#000000] border-gray-300 rounded focus:ring-[#000000]"
                />
                <div className="flex items-center gap-1">
                  <span className="text-sm text-gray-700">SSIS Logs</span>
                  <Info className="w-3.5 h-3.5 text-gray-400" />
                </div>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showTransformLogs}
                  onChange={(e) => setShowTransformLogs(e.target.checked)}
                  className="w-4 h-4 text-[#000000] border-gray-300 rounded focus:ring-[#000000]"
                />
                <span className="text-sm text-gray-700">Transform Logs</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showTroubleshoot}
                  onChange={(e) => setShowTroubleshoot(e.target.checked)}
                  className="w-4 h-4 text-[#000000] border-gray-300 rounded focus:ring-[#000000]"
                />
                <span className="text-sm text-gray-700">Troubleshoot</span>
              </label>

              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 hover:bg-[#FBF9F7] rounded transition-all">
                <X className="w-4 h-4" />
                Delete Instruction
              </button>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showFailed}
                  onChange={(e) => setShowFailed(e.target.checked)}
                  className="w-4 h-4 text-[#000000] border-gray-300 rounded focus:ring-[#000000]"
                />
                <span className="text-sm text-gray-700">Failed ({failedCount})</span>
              </label>

              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 hover:bg-[#FBF9F7] rounded transition-all">
                <RefreshCw className="w-4 h-4" />
                Re-Run
              </button>

              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 hover:bg-[#FBF9F7] rounded transition-all">
                <Info className="w-4 h-4" />
                Instruction Logs
              </button>

              {/* Search */}
              <div className="relative ml-auto">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg bg-[#FBF9F7] focus:ring-2 focus:ring-[#000000] focus:border-[#000000] outline-none text-sm w-48"
                />
              </div>
            </div>
          </div>

          {/* Execution Logs Table */}
          <div className="flex-1 overflow-y-auto">
            <table className="w-full">
              <thead className="bg-[#FBF9F7] border-b border-gray-200 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">#</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Site</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Info</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Run Time</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">ExecutionStart</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Execution</th>
                </tr>
              </thead>
              <tbody className="bg-[#FBF9F7] divide-y divide-gray-200">
                {filteredLogs.map((log, index) => (
                  <tr key={log.id} className="/50 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-900">{log.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{log.executionId}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Info className="w-4 h-4 text-gray-400" />
                        {getTypeIcon(log.type)}
                        <span className="text-sm text-gray-900">{log.site}</span>
                        {log.status === 'success' && (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 max-w-md">
                      <div className="truncate" title={log.info}>{log.info}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{log.runTime}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{log.executionStart}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{log.duration || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      </div>
    </div>
  );
}

