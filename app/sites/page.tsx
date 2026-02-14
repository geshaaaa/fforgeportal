'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, Filter, Plus, Building2, RotateCcw, XCircle
} from 'lucide-react';

interface Site {
  id: number;
  siteName: string;
  workingFile: string;
  sourceFileName: string;
  sftp: string;
  executeOn: string;
  modifiedOn: string;
  isActive: boolean;
  customerId?: number;
  workingFileTable?: string;
  sourceFilePath?: string;
  xmlFileId?: number;
  importProfileId?: number;
  joinFiles?: string;
}

export default function SitesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);

  const sites: Site[] = [
    { id: 1, siteName: 'NorthStyle', workingFile: 'NorthStyleWorkingTa...', sourceFileName: 'Northstyle.xml', sftp: 'sftp.blocklogic.tech I...', executeOn: '08:00', modifiedOn: '7/24/2025 1:41 pm', isActive: true },
    { id: 5, siteName: 'Magellans', workingFile: 'MagellansWorkingTa...', sourceFileName: 'Magellans.xml', sftp: 'sftp.blocklogic.tech I...', executeOn: '08:00', modifiedOn: '7/24/2025 1:41 pm', isActive: true },
    { id: 6, siteName: 'Back In The Saddle', workingFile: 'BackInTheSaddleWor...', sourceFileName: 'BackintheSaddle.xml', sftp: 'sftp.blocklogic.tech I...', executeOn: '08:00', modifiedOn: '7/24/2025 1:41 pm', isActive: true },
    { id: 7, siteName: 'Catalog Favorites', workingFile: 'CatalogFavoritesWor...', sourceFileName: 'CatalogFavorites.xml', sftp: 'sftp.blocklogic.tech I...', executeOn: '08:00', modifiedOn: '7/24/2025 1:41 pm', isActive: true },
    { id: 8, siteName: 'Chadwicks', workingFile: 'ChadwicksWorkingTa...', sourceFileName: 'Chadwicks.xml', sftp: 'sftp.blocklogic.tech I...', executeOn: '08:00', modifiedOn: '7/24/2025 1:41 pm', isActive: true },
    { id: 9, siteName: 'Country Store', workingFile: 'CountryStoreWorkin...', sourceFileName: 'CountryStore.xml', sftp: 'sftp.blocklogic.tech I...', executeOn: '08:00', modifiedOn: '7/24/2025 1:41 pm', isActive: true },
    { id: 10, siteName: 'Expressions', workingFile: 'ExpressionsWorking...', sourceFileName: 'Expressions.xml', sftp: 'sftp.blocklogic.tech I...', executeOn: '08:00', modifiedOn: '7/24/2025 1:41 pm', isActive: true },
    { id: 11, siteName: 'In The Company of D...', workingFile: 'ITCODWorkingTable', sourceFileName: 'InthCompanyofdogs....', sftp: 'sftp.blocklogic.tech I...', executeOn: '08:00', modifiedOn: '7/24/2025 1:41 pm', isActive: true },
    { id: 12, siteName: 'Natures Jewelry', workingFile: 'NaturesJewelryWorki...', sourceFileName: 'Natures.xml', sftp: 'sftp.blocklogic.tech I...', executeOn: '08:00', modifiedOn: '7/24/2025 1:41 pm', isActive: true },
    { id: 13, siteName: 'Pyramid', workingFile: 'PyramidWorkingTable', sourceFileName: 'Pyramid.xml', sftp: 'sftp.blocklogic.tech I...', executeOn: '08:00', modifiedOn: '7/24/2025 1:41 pm', isActive: true },
    { id: 14, siteName: 'Potpourri Gifts', workingFile: 'PotpourriGiftsWorkin...', sourceFileName: 'Potpourri.xml', sftp: 'sftp.blocklogic.tech I...', executeOn: '08:00', modifiedOn: '7/24/2025 1:41 pm', isActive: true },
    { id: 15, siteName: 'Serengeti', workingFile: 'SerengetiWorkingTa...', sourceFileName: 'Serengeti.xml', sftp: 'sftp.blocklogic.tech I...', executeOn: '08:00', modifiedOn: '7/24/2025 1:41 pm', isActive: true },
    { id: 16, siteName: 'Young Explorers', workingFile: 'YoungExplorersWork...', sourceFileName: 'YoungExplorers.xml', sftp: 'sftp.blocklogic.tech I...', executeOn: '08:00', modifiedOn: '7/24/2025 1:41 pm', isActive: true },
    { id: 17, siteName: 'Whatever Works', workingFile: 'WhateverWorksWork...', sourceFileName: 'Whateverworks.xml', sftp: 'sftp.blocklogic.tech I...', executeOn: '08:00', modifiedOn: '7/24/2025 1:41 pm', isActive: true },
    { id: 18, siteName: 'Stitchery', workingFile: 'StitcheryWorkingTable', sourceFileName: 'Stitchery.xml', sftp: 'sftp.blocklogic.tech I...', executeOn: '08:00', modifiedOn: '7/24/2025 1:41 pm', isActive: true },
    { id: 19, siteName: 'Sagefinds', workingFile: 'SagefindsWorkingTa...', sourceFileName: 'SageFinds.xml', sftp: 'sftp.blocklogic.tech I...', executeOn: '07:00', modifiedOn: '7/24/2025 1:42 pm', isActive: true },
    { id: 20, siteName: 'Signals', workingFile: 'SignalsWorkingTable', sourceFileName: 'Signals.xml', sftp: 'sftp.blocklogic.tech I...', executeOn: '08:00', modifiedOn: '10/21/2025 2:06 pm', isActive: true },
  ];

  const filteredSites = sites.filter(site =>
    Object.values(site).some(val =>
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const openModal = () => {
    setSelectedSite(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSite(null);
  };

  const openDrawer = (site: Site) => {
    setSelectedSite(site);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedSite(null);
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
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Manage Sites</h1>
                  <p className="text-xs sm:text-sm text-gray-500">Manage site configurations</p>
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
                <Link href="/sites" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200">
                  Sites
                </Link>
              </nav>
            </div>
            
            {/* Add Site Button */}
            <button
              onClick={() => openModal()}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 shadow-sm hover:shadow-md font-medium whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Site</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        {/* Search Bar */}
        <div className="flex items-center gap-2 mb-4">
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
        </div>

        {/* Sites Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Ac...</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Id</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">SiteName</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Working File</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">SourceFileName</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">S-FTP</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Execute ...</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">ModifiedOn</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSites.map((site) => (
                  <tr
                    key={site.id}
                    className="hover:bg-blue-50/50 transition-colors cursor-pointer"
                    onClick={() => openDrawer(site)}
                  >
                    <td className="px-4 py-3">
                      <div className={`w-3 h-3 rounded-full ${site.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{site.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{site.siteName}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{site.workingFile}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{site.sourceFileName}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{site.sftp}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{site.executeOn}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{site.modifiedOn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add Site Modal - Centered Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-out"
            onClick={closeModal}
          ></div>
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-lg shadow-2xl flex flex-col animate-scale-in">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Add Site</h2>
              <button
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-all duration-200"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 max-h-[calc(90vh-200px)]">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ID</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CustomerId</label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer bg-white">
                    <option>Select Customer...</option>
                    <option>Customer 1</option>
                    <option>Customer 2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SiteName <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">WorkingFileTable <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SourceFilePath <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ExecuteOn <span className="text-red-500">*</span></label>
                  <input
                    type="time"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SourceFileName <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">XML File Id <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ImportProfileId</label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer bg-white">
                    <option>Select Profile...</option>
                    <option>Profile 1</option>
                    <option>Profile 2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">JoinFiles</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">isActive</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 p-6 flex items-center justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-6 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={closeModal}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Site Drawer - Side Flyout */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeDrawer}></div>
          <div className="absolute right-0 top-0 h-full w-full sm:w-[600px] lg:w-[700px] bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Edit Record</h2>
              <button
                onClick={closeDrawer}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-all duration-200"
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
                    defaultValue={selectedSite?.id || ''}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CustomerId</label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer bg-white">
                    <option>Select Customer...</option>
                    <option>Customer 1</option>
                    <option>Customer 2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SiteName <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    defaultValue={selectedSite?.siteName || ''}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">WorkingFileTable <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    defaultValue={selectedSite?.workingFileTable || selectedSite?.workingFile || ''}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SourceFilePath <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    defaultValue={selectedSite?.sourceFilePath || ''}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ExecuteOn <span className="text-red-500">*</span></label>
                  <input
                    type="time"
                    defaultValue={selectedSite?.executeOn || ''}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SourceFileName <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    defaultValue={selectedSite?.sourceFileName || ''}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">XML File Id <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    defaultValue={selectedSite?.xmlFileId || ''}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ImportProfileId</label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer bg-white">
                    <option>Select Profile...</option>
                    <option>Profile 1</option>
                    <option>Profile 2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">JoinFiles</label>
                  <input
                    type="text"
                    defaultValue={selectedSite?.joinFiles || ''}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      defaultChecked={selectedSite?.isActive || false}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">isActive</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 p-6 flex items-center justify-end gap-3">
              <button
                onClick={closeDrawer}
                className="px-6 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={closeDrawer}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

