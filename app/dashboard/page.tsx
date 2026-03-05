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

  const maxValue = Math.max(...chartData.exports, ...chartData.imports);

  return (
    <div className="min-h-screen bg-[#fbf0ea] flex">
      {/* Left Navigation Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#fbf0ea] border-r border-gray-200 flex flex-col sticky top-0 h-screen transition-all duration-300 ease-in-out`}>
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
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-2 hover:bg-[#f5dcc4] rounded-lg transition-colors duration-200"
            title={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isSidebarOpen ? (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/dashboard" className={`flex items-center ${mounted && isSidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-2.5 text-sm font-medium text-white bg-[#1a0d3d] rounded-lg transition-colors duration-200`}>
            <BarChart3 className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span>Dashboard</span>}
          </Link>
          <Link href="/" className={`flex items-center ${mounted && isSidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-2.5 text-sm font-medium text-gray-700 hover:text-[#07011c]  rounded-lg transition-colors duration-200`}>
            <FileText className="w-5 h-5 flex-shrink-0" />
            {(!mounted || isSidebarOpen) && <span>Onboarding</span>}
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-[#fbf0ea] border-b border-gray-200 sticky top-0 z-20 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-xs sm:text-sm text-gray-500">Overview of your data feeding operations</p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg bg-[#fbf0ea] focus:ring-2 focus:ring-[#07011c] focus:border-[#07011c] outline-none text-sm"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>
                <button className="px-4 py-2 bg-[#07011c] text-white rounded-lg  transition-all duration-200 text-sm font-medium">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Export Report
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Total Sites */}
            <div className="bg-[#fbf0ea] rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-[#1a0d3d] rounded-lg">
                  <Building2 className="w-6 h-6 text-[#07011c]" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                  <TrendingUp className="w-3 h-3 inline mr-1" />
                  +12%
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{metrics.totalSites}</h3>
              <p className="text-sm text-gray-600">Total Sites</p>
            </div>

            {/* Active Imports */}
            <div className="bg-[#fbf0ea] rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Download className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                  <TrendingUp className="w-3 h-3 inline mr-1" />
                  +8%
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{metrics.activeImports}</h3>
              <p className="text-sm text-gray-600">Active Imports</p>
            </div>

            {/* Successful Exports */}
            <div className="bg-[#fbf0ea] rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Upload className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                  <TrendingUp className="w-3 h-3 inline mr-1" />
                  +15%
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{metrics.successfulExports}</h3>
              <p className="text-sm text-gray-600">Successful Exports</p>
            </div>

            {/* Success Rate */}
            <div className="bg-[#fbf0ea] rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Activity className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                  <TrendingUp className="w-3 h-3 inline mr-1" />
                  +2.1%
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{metrics.successRate}%</h3>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Exports & Imports Chart */}
            <div className="bg-[#fbf0ea] rounded-lg border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Exports & Imports Trend</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#07011c] rounded-full"></div>
                    <span className="text-sm text-gray-600">Exports</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Imports</span>
                  </div>
                </div>
              </div>
              <div className="h-64 flex items-end justify-between gap-2">
                {chartData.labels.map((label, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex flex-col justify-end gap-1" style={{ height: '200px' }}>
                      <div
                        className="w-full bg-[#07011c] rounded-t hover:bg-[#07011c] transition-colors"
                        style={{ height: `${(chartData.exports[index] / maxValue) * 100}%` }}
                        title={`Exports: ${chartData.exports[index]}`}
                      ></div>
                      <div
                        className="w-full bg-green-500 rounded-t hover:bg-green-600 transition-colors"
                        style={{ height: `${(chartData.imports[index] / maxValue) * 100}%` }}
                        title={`Imports: ${chartData.imports[index]}`}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Breakdown */}
            <div className="bg-[#fbf0ea] rounded-lg border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Status Breakdown</h2>
              <div className="space-y-4">
                {statusData.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      <span className="text-sm font-semibold text-gray-900">{item.value} ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-[#f5dcc4] rounded-full h-2.5">
                      <div
                        className={`${item.color} h-2.5 rounded-full transition-all duration-300`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{metrics.totalProcessed.toLocaleString()}</div>
                    <div className="text-xs text-gray-600 mt-1">Total Processed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{metrics.avgProcessingTime}</div>
                    <div className="text-xs text-gray-600 mt-1">Avg Time</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{metrics.activeChannels}</div>
                    <div className="text-xs text-gray-600 mt-1">Active Channels</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-[#fbf0ea] rounded-lg border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                <Link href="/execution-logs" className="text-sm text-[#07011c] hover:text-[#07011c] font-medium">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#f5dcc4] transition-colors">
                    <div className={`p-2 rounded-lg ${
                      activity.type === 'export' ? 'bg-purple-100' : 'bg-green-100'
                    }`}>
                      {activity.type === 'export' ? (
                        <Upload className={`w-4 h-4 ${activity.type === 'export' ? 'text-purple-600' : 'text-green-600'}`} />
                      ) : (
                        <Download className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{activity.site}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{activity.channel}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {activity.status === 'success' ? (
                          <CheckCircle2 className="w-3 h-3 text-green-600" />
                        ) : (
                          <XCircle className="w-3 h-3 text-red-600" />
                        )}
                        <span className={`text-xs font-medium ${
                          activity.status === 'success' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {activity.status === 'success' ? 'Success' : 'Failed'}
                        </span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-[#fbf0ea] rounded-lg border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#f5dcc4] rounded-lg">
                  <div className="flex items-center gap-3">
                    <Server className="w-5 h-5 text-[#07011c]" />
                    <span className="text-sm font-medium text-gray-700">Active Channels</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{metrics.activeChannels}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#f5dcc4] rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">Failed Exports</span>
                  </div>
                  <span className="text-lg font-bold text-red-600">{metrics.failedExports}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#f5dcc4] rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-orange-600" />
                    <span className="text-sm font-medium text-gray-700">Pending Tasks</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">2</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#f5dcc4] rounded-lg">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium text-gray-700">Total Sites</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{metrics.totalSites}</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="w-full px-4 py-2 bg-[#07011c] text-white rounded-lg  transition-all duration-200 font-medium">
                  View Detailed Reports
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

