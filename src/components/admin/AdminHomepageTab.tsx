import React, { useState } from 'react';
import { LayoutTemplate, Eye, EyeOff, Plus, Trash2, Check, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PendingConfirmation } from '../../types';

interface AdminHomepageTabProps {
  onRequestConfirmation: (pending: PendingConfirmation) => void;
}

export const AdminHomepageTab: React.FC<AdminHomepageTabProps> = ({
  onRequestConfirmation
}) => {
  const { homepageConfig, updateHomepageConfig, addHomepageSection, deleteHomepageSection } = useApp();

  const [headline, setHeadline] = useState(homepageConfig.heroHeadline);
  const [subheadline, setSubheadline] = useState(homepageConfig.heroSubheadline);
  const [announcement, setAnnouncement] = useState(homepageConfig.announcementBanner);

  // New section form
  const [newSecTitle, setNewSecTitle] = useState('');
  const [newSecSubtitle, setNewSecSubtitle] = useState('');

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    updateHomepageConfig({
      heroHeadline: headline,
      heroSubheadline: subheadline,
      announcementBanner: announcement
    });
  };

  const handleAddSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSecTitle.trim()) return;

    addHomepageSection({
      title: newSecTitle.trim(),
      subtitle: newSecSubtitle.trim() || 'Curated electronics selection',
      visible: true,
      productFilter: {
        category: 'laptops'
      }
    });

    setNewSecTitle('');
    setNewSecSubtitle('');
  };

  const handleDeleteSection = (title: string, id: string) => {
    onRequestConfirmation({
      action: 'deleteHomepageSection',
      targetId: id,
      targetName: title,
      message: `You are about to remove homepage section "${title}".`
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
        <h1 className="text-xl font-bold text-white tracking-tight font-display">
          Homepage Layout & Content
        </h1>
        <p className="text-xs text-slate-400">
          Configure storefront headlines, visibility of key merchandising blocks, and custom sections.
        </p>
      </div>

      {/* Hero Headline Editor */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg space-y-4">
        <h2 className="text-xs font-bold text-white uppercase tracking-wider">
          Storefront Hero Messaging
        </h2>

        <form onSubmit={handleSaveHero} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Hero Headline
            </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full bg-slate-950 text-white text-xs p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Hero Subheadline
            </label>
            <input
              type="text"
              value={subheadline}
              onChange={(e) => setSubheadline(e.target.value)}
              className="w-full bg-slate-950 text-white text-xs p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Announcement Top Banner
            </label>
            <input
              type="text"
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              className="w-full bg-slate-950 text-white text-xs p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all"
            >
              Save Hero Messaging
            </button>
          </div>
        </form>
      </div>

      {/* Merchandising Section Visibility Switches */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg space-y-4">
        <h2 className="text-xs font-bold text-white uppercase tracking-wider">
          Core Sections Visibility
        </h2>

        <div className="space-y-3">
          
          {/* Refurbished Section Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <div className="text-xs font-bold text-white">Refurbished & Pre-Owned Section</div>
              <p className="text-[11px] text-slate-400">Display verified renewed tech with 32-point inspection guarantees</p>
            </div>
            <button
              type="button"
              onClick={() => updateHomepageConfig({ showRefurbishedSection: !homepageConfig.showRefurbishedSection })}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                homepageConfig.showRefurbishedSection
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {homepageConfig.showRefurbishedSection ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{homepageConfig.showRefurbishedSection ? 'Visible' : 'Hidden'}</span>
            </button>
          </div>

          {/* Featured Section Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <div className="text-xs font-bold text-white">Featured Deals & Best-Sellers</div>
              <p className="text-[11px] text-slate-400">Highlight top-rated smartphones and high-performance notebooks</p>
            </div>
            <button
              type="button"
              onClick={() => updateHomepageConfig({ showFeaturedSection: !homepageConfig.showFeaturedSection })}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                homepageConfig.showFeaturedSection
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {homepageConfig.showFeaturedSection ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{homepageConfig.showFeaturedSection ? 'Visible' : 'Hidden'}</span>
            </button>
          </div>

          {/* Categories Row Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <div className="text-xs font-bold text-white">Category Exploration Grid</div>
              <p className="text-[11px] text-slate-400">Cards allowing customers to browse by device category</p>
            </div>
            <button
              type="button"
              onClick={() => updateHomepageConfig({ showCategoriesSection: !homepageConfig.showCategoriesSection })}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                homepageConfig.showCategoriesSection
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {homepageConfig.showCategoriesSection ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{homepageConfig.showCategoriesSection ? 'Visible' : 'Hidden'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Custom Sections Created by Admin / AI */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">
            Custom Merchandising Sections ({homepageConfig.customSections.length})
          </h2>
          <span className="text-[11px] text-slate-400">Sections generated by AI or Admin</span>
        </div>

        {/* Add Custom Section Form */}
        <form onSubmit={handleAddSection} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={newSecTitle}
              onChange={(e) => setNewSecTitle(e.target.value)}
              placeholder="Section Title (e.g. Best Laptops Under ₹50,000)"
              className="bg-slate-900 text-white text-xs p-2.5 rounded-lg border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              required
            />
            <input
              type="text"
              value={newSecSubtitle}
              onChange={(e) => setNewSecSubtitle(e.target.value)}
              placeholder="Subtitle (e.g. Verified performance workhorses)"
              className="bg-slate-900 text-white text-xs p-2.5 rounded-lg border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg shadow transition-all flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Section</span>
            </button>
          </div>
        </form>

        {/* List of Custom Sections */}
        <div className="space-y-2">
          {homepageConfig.customSections.map((sec) => (
            <div
              key={sec.id}
              className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-800"
            >
              <div>
                <h4 className="text-xs font-bold text-white">{sec.title}</h4>
                <p className="text-[11px] text-slate-400">{sec.subtitle}</p>
              </div>
              <button
                onClick={() => handleDeleteSection(sec.title, sec.id)}
                className="text-slate-400 hover:text-rose-400 p-1.5 rounded hover:bg-rose-500/10 transition-colors"
                title="Remove Section"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
