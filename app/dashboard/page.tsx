'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, TrendingUp, TrendingDown, Activity, 
  CheckCircle2, XCircle, Clock, ArrowUp, ArrowDown,
  FileText, Upload, Download, BarChart3, PieChart,
  Calendar, AlertCircle, Users, Server, ChevronLeft, ChevronRight
} from 'lucide-react';

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [showImportConfig, setShowImportConfig] = useState(false);
  const [showExportConfig, setShowExportConfig] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mock data for metrics
  const metrics = {
    totalSites: 12,
    activeImports: 8,
    successfulExports: 245,
    failedExports: 3,
    totalProcessed: 125430,
    avgProcessingTime: '2.5m',
    successRate: 98.5,
    activeChannels: 15
  };

  // Chart data (simplified for visualization)
  const chartData = {
    exports: [45, 52, 48, 61, 55, 67, 73, 68, 75, 82, 78, 85],
    imports: [38, 42, 40, 45, 48, 52, 50, 55, 58, 62, 60, 65],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  };

  // Recent activity
  const recentActivity = [
    { id: 1, type: 'export', site: 'Sagefinds', status: 'success', time: '2 min ago', channel: 'Google Shopping' },
    { id: 2, type: 'import', site: 'Main Office', status: 'success', time: '15 min ago', channel: 'SFTP' },
    { id: 3, type: 'export', site: 'Warehouse A', status: 'failed', time: '1 hour ago', channel: 'Bing' },
    { id: 4, type: 'import', site: 'Retail Store', status: 'success', time: '2 hours ago', channel: 'API' },
    { id: 5, type: 'export', site: 'Sagefinds', status: 'success', time: '3 hours ago', channel: 'Criteo' },
  ];

  // Status breakdown
  const statusData = [
    { label: 'Success', value: 245, color: 'bg-green-500', percentage: 98 },
    { label: 'Failed', value: 3, color: 'bg-red-500', percentage: 1.2 },
    { label: 'Pending', value: 2, color: 'bg-yellow-500', percentage: 0.8 },
  ];

  const developedAreas = [
    { label: 'Feed freshness', value: 82, color: 'bg-[#07011c]' },
    { label: 'Import reliability', value: 91, color: 'bg-green-600' },
    { label: 'Export coverage', value: 74, color: 'bg-purple-600' },
    { label: 'Channel health', value: 68, color: 'bg-orange-500' },
    { label: 'Data quality', value: 88, color: 'bg-blue-500' },
  ];

  const maxValue = Math.max(...chartData.exports, ...chartData.imports);

  return (
    <div className="min-h-screen bg-[#FBF3EA] flex relative">
      {/* Left Navigation Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#FBF3EA] border-r border-gray-200 flex flex-col sticky top-0 h-screen transition-all duration-300 ease-in-out`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className={`flex items-center gap-3 ${mounted && !isSidebarOpen ? 'justify-center w-full' : ''}`}>
              <div className="w-10 h-10 bg-gradient-to-br from-[#07011c] to-[#07011c] rounded-lg flex items-center justify-center hover:from-[#07011c] hover:to-[#07011c] transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg flex-shrink-0">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              {(!mounted || isSidebarOpen) && (
                <div>
                  <h1 className="text-lg font-bold text-gray-900">FeedForge</h1>
                  <p className="text-xs text-gray-500">Data Feeding Portal</p>
                </div>
              )}
            </Link>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/dashboard" className={`flex items-center ${mounted && isSidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-2.5 text-sm font-medium text-white bg-[#1a0d3d] rounded-lg transition-colors duration-200`}>
            <BarChart3 className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span>Dashboard</span>}
          </Link>
          <Link href="/imports" className={`flex items-center ${mounted && isSidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-2.5 text-sm font-medium text-gray-700 hover:text-[#07011c]  rounded-lg transition-colors duration-200`}>
            <Download className="w-5 h-5 flex-shrink-0" />
            {(!mounted || isSidebarOpen) && <span>Imports</span>}
          </Link>
          <Link href="/exports" className={`flex items-center ${mounted && isSidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-2.5 text-sm font-medium text-gray-700 hover:text-[#07011c]  rounded-lg transition-colors duration-200`}>
            <Upload className="w-5 h-5 flex-shrink-0" />
            {(!mounted || isSidebarOpen) && <span>Exports</span>}
          </Link>
          <Link href="/sites" className={`flex items-center ${mounted && isSidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-2.5 text-sm font-medium text-gray-700 hover:text-[#07011c]  rounded-lg transition-colors duration-200`}>
            <Building2 className="w-5 h-5 flex-shrink-0" />
            {(!mounted || isSidebarOpen) && <span>Sites</span>}
          </Link>
          <Link href="/reports" className={`flex items-center ${mounted && isSidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-2.5 text-sm font-medium text-gray-700 hover:text-[#07011c]  rounded-lg transition-colors duration-200`}>
            <FileText className="w-5 h-5 flex-shrink-0" />
            {(!mounted || isSidebarOpen) && <span>Reports</span>}
          </Link>
          <Link href="/execution-logs" className={`flex items-center ${mounted && isSidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-2.5 text-sm font-medium text-gray-700 hover:text-[#07011c]  rounded-lg transition-colors duration-200`}>
            <Activity className="w-5 h-5 flex-shrink-0" />
            {(!mounted || isSidebarOpen) && <span>Execution Logs</span>}
          </Link>
        </nav>
      </aside>

      {/* Sidebar Toggle Button - Attached to sidebar edge */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`absolute ${isSidebarOpen ? 'left-64' : 'left-20'} top-1/2 -translate-y-1/2 z-30 bg-white border border-gray-300 ${isSidebarOpen ? 'rounded-r-lg rounded-l-none' : 'rounded-l-lg rounded-r-none'} p-2 shadow-lg hover:bg-[#FBF3EA] transition-all duration-300 ease-in-out hover:shadow-xl`}
        title={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        {isSidebarOpen ? (
          <ChevronLeft className="w-4 h-4 text-gray-700" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-700" />
        )}
      </button>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-[#FBF3EA] border-b border-gray-300 sticky top-0 z-20 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-10 py-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#07011c] via-[#1a0d3d] to-[#07011c] flex items-center justify-center shadow-lg ring-2 ring-[#07011c]/10">
                  <span className="text-lg font-bold text-white">FF</span>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-600 font-medium">Welcome back</p>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mt-0.5">FeedForge Overview</h1>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5">Your imports, exports and channel health at a glance</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative w-full sm:w-72">
                  <input
                    type="text"
                    placeholder="Search sites, channels, or feeds..."
                    className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#07011c]/20 focus:border-[#07011c] text-sm placeholder:text-gray-400 transition-all"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">⌘K</span>
                </div>
                <div className="flex items-center gap-2">
                  <Link 
                    href="/" 
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        sessionStorage.setItem('navigateToOnboarding', 'true');
                      }
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-700 text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200 flex items-center gap-1.5"
                  >
                    <FileText className="w-4 h-4" />
                    Onboarding
                  </Link>
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value as any)}
                    className="px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-xs sm:text-sm focus:ring-2 focus:ring-[#07011c]/20 focus:border-[#07011c] outline-none shadow-sm transition-all font-medium"
                  >
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                  </select>
                  <button className="px-5 py-2.5 rounded-xl bg-[#07011c] text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg hover:bg-[#1a0d3d] transition-all duration-200 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    Export summary
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-10 py-8 bg-gradient-to-b from-[#FBF3EA] to-[#FBF3EA]/50">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1.2fr)]">
            {/* Left main column */}
            <div className="space-y-6">
              {/* Top gradient cards row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Profile / environment card */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 px-6 py-5 flex flex-col justify-between group">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-[#07011c] via-[#1a0d3d] to-[#07011c] flex items-center justify-center shadow-lg ring-2 ring-[#07011c]/10 group-hover:scale-105 transition-transform">
                      <span className="text-white text-base font-bold">FF</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Environment</p>
                      <p className="text-sm font-bold text-gray-900 mt-0.5">Production feeds</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 font-medium mb-1">Sites</span>
                      <span className="text-xl font-bold text-gray-900">{metrics.totalSites}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 font-medium mb-1">Active imports</span>
                      <span className="text-xl font-bold text-gray-900">{metrics.activeImports}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 font-medium mb-1">Channels</span>
                      <span className="text-xl font-bold text-gray-900">{metrics.activeChannels}</span>
                    </div>
                  </div>
                </div>

                {/* Prioritized imports */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FBF3EA] via-[#FBF3EA] to-[#FBF3EA] border border-white/80 shadow-lg hover:shadow-2xl transition-all duration-300 px-6 py-5 flex flex-col justify-between group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                  <div className="relative flex items-center justify-between mb-6">
                    <div>
                      <p className="text-xs font-semibold text-[#7a3a16] uppercase tracking-wider mb-2">Prioritized imports</p>
                      <p className="text-4xl font-bold text-[#1b0b33] leading-none mb-1">{metrics.activeImports}</p>
                      <p className="text-xs text-[#7a3a16] font-medium">running on schedule</p>
                    </div>
                    <div className="w-14 h-14 rounded-xl bg-white/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Download className="w-6 h-6 text-[#1b0b33]" />
                    </div>
                  </div>
                  <div className="relative flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-[#1b0b33] font-semibold">
                      <TrendingUp className="w-4 h-4" />
                      +12% vs last month
                    </span>
                    <span className="text-[#7a3a16] font-medium">Top 3 feeds optimised</span>
                  </div>
                </div>

                {/* Additional checks */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#ffe0f0] via-[#ffe9ff] to-[#d3f0ff] border border-white/80 shadow-lg hover:shadow-2xl transition-all duration-300 px-6 py-5 flex flex-col justify-between group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                  <div className="relative flex items-center justify-between mb-6">
                    <div>
                      <p className="text-xs font-semibold text-[#28304f] uppercase tracking-wider mb-2">Additional checks</p>
                      <p className="text-4xl font-bold text-[#1b0b33] leading-none mb-1">{metrics.successRate}%</p>
                      <p className="text-xs text-[#28304f] font-medium">overall success rate</p>
                    </div>
                    <div className="w-14 h-14 rounded-xl bg-white/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Activity className="w-6 h-6 text-[#1b0b33]" />
                    </div>
                  </div>
                  <div className="relative flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-[#1b0b33] font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      Feeds healthy
                    </span>
                    <span className="text-[#28304f] font-medium">3 exports need review</span>
                  </div>
                </div>
              </div>

              {/* Focus / trends area */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-base font-bold text-gray-900">Feed Throughput</h2>
                    <p className="text-xs text-gray-600 mt-1">Imports vs exports across the last 12 months</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FBF3EA] px-4 py-1.5 text-xs font-semibold text-[#7a3a16] border border-gray-200">
                    <ArrowUp className="w-3.5 h-3.5" />
                    {metrics.totalProcessed.toLocaleString()} items processed
                  </span>
                </div>
                <div className="h-64 flex items-end justify-between gap-2.5 mb-4">
                  {chartData.labels.map((label, index) => (
                    <div key={label} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="w-full flex flex-col justify-end gap-1.5 hover:opacity-80 transition-opacity" style={{ height: '200px' }}>
                        <div
                          className="w-full rounded-t-lg bg-gradient-to-t from-[#07011c] via-[#1a0d3d] to-[#2d1a5c] shadow-md hover:shadow-lg transition-all cursor-pointer group-hover:scale-105"
                          style={{ height: `${(chartData.exports[index] / maxValue) * 100}%` }}
                          title={`Exports: ${chartData.exports[index]}`}
                        />
                        <div
                          className="w-full rounded-t-lg bg-gradient-to-t from-green-600 via-green-400 to-green-300 shadow-md hover:shadow-lg transition-all cursor-pointer group-hover:scale-105"
                          style={{ height: `${(chartData.imports[index] / maxValue) * 100}%` }}
                          title={`Imports: ${chartData.imports[index]}`}
                        />
                      </div>
                      <span className="text-xs text-gray-600 font-medium">{label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-2 rounded-full bg-gradient-to-r from-[#07011c] to-[#2d1a5c]" />
                      <span className="text-gray-700 font-semibold">Exports</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-2 rounded-full bg-gradient-to-r from-green-600 to-green-300" />
                      <span className="text-gray-700 font-semibold">Imports</span>
                    </span>
                  </div>
                  <span className="text-gray-500">Last updated 2 min ago</span>
                </div>
              </div>

              {/* Recent activity + status */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-base font-bold text-gray-900">Recent Activity</h2>
                    <Link href="/execution-logs" className="text-xs font-semibold text-[#07011c] hover:text-[#1a0d3d] hover:underline transition-colors">
                      View all →
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-[#FBF3EA]/50 transition-all duration-200 border border-transparent hover:border-gray-200 group"
                      >
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl shadow-sm group-hover:scale-110 transition-transform ${
                            activity.type === 'export' ? 'bg-purple-100' : 'bg-green-100'
                          }`}
                        >
                          {activity.type === 'export' ? (
                            <Upload className="w-5 h-5 text-purple-600" />
                          ) : (
                            <Download className="w-5 h-5 text-green-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-semibold text-gray-900 truncate">{activity.site}</p>
                            <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">{activity.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            {activity.status === 'success' ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                            ) : (
                              <XCircle className="w-3.5 h-3.5 text-red-600" />
                            )}
                            <span
                              className={`font-semibold ${
                                activity.status === 'success' ? 'text-green-600' : 'text-red-600'
                              }`}
                            >
                              {activity.status === 'success' ? 'Success' : 'Failed'}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-600">{activity.channel}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 p-6">
                  <h2 className="text-base font-bold text-gray-900 mb-5">Run Status</h2>
                  <div className="space-y-4 mb-6">
                    {statusData.map((item) => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">{item.label}</span>
                          <span className="text-sm font-bold text-gray-900">
                            {item.value} <span className="text-gray-500">({item.percentage}%)</span>
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                          <div
                            className={`${item.color} h-full rounded-full transition-all duration-500 shadow-sm`}
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-5 border-t border-gray-200 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-xl font-bold text-gray-900 mb-1">
                        {metrics.totalProcessed.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-600 font-medium">Total processed</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-900 mb-1">{metrics.avgProcessingTime}</p>
                      <p className="text-xs text-gray-600 font-medium">Avg time</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-900 mb-1">{metrics.activeChannels}</p>
                      <p className="text-xs text-gray-600 font-medium">Channels</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right rail column */}
            <div className="space-y-5">
              {/* Today's schedule */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-bold text-gray-900">Today&apos;s Schedule</h2>
                  <button className="text-xs font-semibold text-gray-500 hover:text-[#07011c] transition-colors">See all →</button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 text-right pt-1">
                      <p className="font-bold text-gray-900 text-sm">08:00</p>
                      <p className="text-gray-400 text-xs">AM</p>
                    </div>
                    <div className="flex-1 rounded-xl bg-[#FBF3EA] border border-gray-200 px-4 py-3 group-hover:shadow-md transition-all">
                      <p className="font-semibold text-gray-900 text-sm">Daily Google Shopping export</p>
                      <p className="mt-1 text-gray-600 text-xs">Potpourri & 3 other sites</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 text-right pt-1">
                      <p className="font-bold text-gray-900 text-sm">09:30</p>
                      <p className="text-gray-400 text-xs">AM</p>
                    </div>
                    <div className="flex-1 rounded-xl bg-purple-50 border border-purple-200 px-4 py-3 group-hover:shadow-md transition-all">
                      <p className="font-semibold text-gray-900 text-sm">Inventory import window</p>
                      <p className="mt-1 text-gray-600 text-xs">Warehouse SFTP profile</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 text-right pt-1">
                      <p className="font-bold text-gray-900 text-sm">02:00</p>
                      <p className="text-gray-400 text-xs">PM</p>
                    </div>
                    <div className="flex-1 rounded-xl bg-blue-50 border border-blue-200 px-4 py-3 group-hover:shadow-md transition-all">
                      <p className="font-semibold text-gray-900 text-sm">Channel health scan</p>
                      <p className="mt-1 text-gray-600 text-xs">Feed quality checks across sites</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Developed areas */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-base font-bold text-gray-900 mb-5">Developed Areas</h2>
                <div className="space-y-4">
                  {developedAreas.map((area) => (
                    <div key={area.label} className="flex items-center gap-4">
                      <div className="w-36 text-xs text-gray-700 font-medium">{area.label}</div>
                      <div className="flex-1 h-3 rounded-full bg-gray-200 overflow-hidden shadow-inner">
                        <div
                          className={`h-full rounded-full ${area.color} shadow-sm transition-all duration-500`}
                          style={{ width: `${area.value}%` }}
                        />
                      </div>
                      <div className="w-12 text-right text-xs text-gray-900 font-bold">
                        {area.value}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Import Configuration */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                <button
                  onClick={() => setShowImportConfig(!showImportConfig)}
                  className="w-full flex items-center justify-between p-6 hover:bg-[#FBF3EA]/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-[#07011c]" />
                    <h2 className="text-base font-bold text-gray-900">Configure Import</h2>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${showImportConfig ? 'rotate-90' : ''}`} />
                </button>
                {showImportConfig && (
                  <div className="px-6 pb-6 space-y-4 border-t border-gray-200 pt-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Import Source Type <span className="text-red-500">*</span>
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07011c] focus:border-[#07011c] outline-none text-sm bg-white">
                        <option>SFTP</option>
                        <option>FTP</option>
                        <option>API</option>
                        <option>File Upload</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          Server/Host <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07011c] focus:border-[#07011c] outline-none text-sm"
                          placeholder="sftp.example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Port</label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07011c] focus:border-[#07011c] outline-none text-sm"
                          placeholder="22"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          Username <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07011c] focus:border-[#07011c] outline-none text-sm"
                          placeholder="username"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          Password <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07011c] focus:border-[#07011c] outline-none text-sm"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Source Path <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07011c] focus:border-[#07011c] outline-none text-sm"
                        placeholder="/data/imports"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          File Format <span className="text-red-500">*</span>
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07011c] focus:border-[#07011c] outline-none text-sm bg-white">
                          <option>CSV</option>
                          <option>JSON</option>
                          <option>XML</option>
                          <option>Excel</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Schedule</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07011c] focus:border-[#07011c] outline-none text-sm bg-white">
                          <option>Daily</option>
                          <option>Hourly</option>
                          <option>Weekly</option>
                          <option>Manual</option>
                        </select>
                      </div>
                    </div>
                    <button className="w-full px-4 py-2 bg-[#07011c] text-white rounded-lg hover:bg-[#1a0d3d] transition-all text-sm font-medium">
                      Save Import Configuration
                    </button>
                  </div>
                )}
              </div>

              {/* Export Configuration */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                <button
                  onClick={() => setShowExportConfig(!showExportConfig)}
                  className="w-full flex items-center justify-between p-6 hover:bg-[#FBF3EA]/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Upload className="w-5 h-5 text-[#07011c]" />
                    <h2 className="text-base font-bold text-gray-900">Configure Export</h2>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${showExportConfig ? 'rotate-90' : ''}`} />
                </button>
                {showExportConfig && (
                  <div className="px-6 pb-6 space-y-4 border-t border-gray-200 pt-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Export Destination Type <span className="text-red-500">*</span>
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07011c] focus:border-[#07011c] outline-none text-sm bg-white">
                        <option>SFTP</option>
                        <option>FTP</option>
                        <option>Email</option>
                        <option>API/Webhook</option>
                        <option>Local Storage</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          Server/Host <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07011c] focus:border-[#07011c] outline-none text-sm"
                          placeholder="sftp.example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Port</label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07011c] focus:border-[#07011c] outline-none text-sm"
                          placeholder="22"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          Username <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07011c] focus:border-[#07011c] outline-none text-sm"
                          placeholder="username"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          Password <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07011c] focus:border-[#07011c] outline-none text-sm"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Destination Path <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07011c] focus:border-[#07011c] outline-none text-sm"
                        placeholder="/data/exports"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          Export Format <span className="text-red-500">*</span>
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07011c] focus:border-[#07011c] outline-none text-sm bg-white">
                          <option>CSV</option>
                          <option>JSON</option>
                          <option>XML</option>
                          <option>Excel</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Schedule</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07011c] focus:border-[#07011c] outline-none text-sm bg-white">
                          <option>Daily</option>
                          <option>Hourly</option>
                          <option>Weekly</option>
                          <option>Manual</option>
                        </select>
                      </div>
                    </div>
                    <button className="w-full px-4 py-2 bg-[#07011c] text-white rounded-lg hover:bg-[#1a0d3d] transition-all text-sm font-medium">
                      Save Export Configuration
                    </button>
                  </div>
                )}
              </div>

              {/* Quick export CTA */}
              <div className="relative overflow-hidden bg-gradient-to-br from-[#07011c] via-[#1a0d3d] to-[#2d1a5c] rounded-2xl text-white p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"></div>
                <div className="relative flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold">Need a Quick Export?</h2>
                  <ArrowUp className="w-5 h-5 rotate-45 text-white/60 group-hover:text-white/80 group-hover:scale-110 transition-all" />
                </div>
                <p className="text-xs text-white/90 mb-5 relative leading-relaxed">
                  Trigger an on-demand export for any site without leaving the dashboard.
                </p>
                <button className="w-full rounded-xl bg-white text-[#07011c] text-sm font-bold py-3 shadow-lg hover:bg-[#FBF3EA] hover:shadow-xl transition-all duration-200 group-hover:scale-105">
                  Open Exports Workspace
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

