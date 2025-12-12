import React, { useState } from 'react';
import { Save, LogOut, Edit3, X } from 'lucide-react';

export default function AdminPanel({ editableContent, updateContent, toggleEditingMode, handleLogout, editingMode, onClose }) {
  const [tempContent, setTempContent] = useState(editableContent);

  const handleSave = () => {
    // Simpan perubahan ke state utama
    Object.keys(tempContent).forEach(key => {
      if (key === 'name' || key === 'lpdpInfo' || key === 'universityInfo' || key === 'jobInfo') {
        updateContent('main', null, key, tempContent[key]);
      } else if (key === 'aboutCards' || key === 'contactCards') {
        tempContent[key].forEach((card, index) => {
          Object.keys(card).forEach(field => {
            updateContent(key, index, field, card[field]);
          });
        });
      }
    });
  };

  const handleChange = (section, index, field, value) => {
    setTempContent(prev => {
      const updated = { ...prev };
      if (section === 'main') {
        updated[field] = value;
      } else if (section === 'aboutCards' || section === 'contactCards') {
        updated[section][index][field] = value;
      }
      return updated;
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-lg z-50 overflow-y-auto">
      <div className="min-h-screen py-6 px-4 sm:py-8 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Admin Panel</h1>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button
                onClick={onClose}
                className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg font-medium transition-all text-sm sm:text-base"
              >
                <X size={16} className="sm:size-18" />
                <span className="hidden xs:inline">Tutup</span>
              </button>
              <button
                onClick={toggleEditingMode}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                  editingMode 
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                }`}
              >
                <Edit3 size={16} className="sm:size-18" />
                <span className="hidden xs:inline">{editingMode ? 'Matikan Edit Mode' : 'Aktifkan Edit Mode'}</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-lg font-medium transition-all text-sm sm:text-base"
              >
                <Save size={16} className="sm:size-18" />
                <span className="hidden xs:inline">Simpan</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg font-medium transition-all text-sm sm:text-base"
              >
                <LogOut size={16} className="sm:size-18" />
                <span className="hidden xs:inline">Logout</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-800/80 backdrop-blur rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-emerald-500/20">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Informasi Utama</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Nama</label>
                <input
                  type="text"
                  value={tempContent.name}
                  onChange={(e) => handleChange('main', null, 'name', e.target.value)}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Info LPDP</label>
                <input
                  type="text"
                  value={tempContent.lpdpInfo}
                  onChange={(e) => handleChange('main', null, 'lpdpInfo', e.target.value)}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Info Universitas</label>
                <input
                  type="text"
                  value={tempContent.universityInfo}
                  onChange={(e) => handleChange('main', null, 'universityInfo', e.target.value)}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Info Pekerjaan</label>
                <input
                  type="text"
                  value={tempContent.jobInfo}
                  onChange={(e) => handleChange('main', null, 'jobInfo', e.target.value)}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/80 backdrop-blur rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-emerald-500/20">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Kartu Tentang Saya</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {tempContent.aboutCards.map((card, index) => (
                <div key={index} className="bg-slate-700/50 rounded-xl p-3 sm:p-4 border border-slate-600">
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-slate-300 mb-1">Judul</label>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => handleChange('aboutCards', index, 'title', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-600/50 border border-slate-500 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Deskripsi</label>
                    <textarea
                      value={card.desc}
                      onChange={(e) => handleChange('aboutCards', index, 'desc', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 bg-slate-600/50 border border-slate-500 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/80 backdrop-blur rounded-2xl p-4 sm:p-6 border border-emerald-500/20">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Kartu Kontak</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {tempContent.contactCards.map((card, index) => (
                <div key={index} className="bg-slate-700/50 rounded-xl p-3 sm:p-4 border border-slate-600">
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-slate-300 mb-1">Judul</label>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => handleChange('contactCards', index, 'title', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-600/50 border border-slate-500 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Detail</label>
                    <input
                      type="text"
                      value={card.detail}
                      onChange={(e) => handleChange('contactCards', index, 'detail', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-600/50 border border-slate-500 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}