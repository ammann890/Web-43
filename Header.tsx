import React from 'react';
import { Globe, ArrowLeft, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currentView: 'search' | 'details';
  onResetToSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onResetToSearch }) => {
  return (
    <header id="main-header" className="sticky top-0 z-40 bg-white border-b border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo & Brand */}
          <button
            id="brand-logo-btn"
            onClick={onResetToSearch}
            className="flex items-center gap-3 text-left focus:outline-hidden focus:ring-2 focus:ring-sky-400 rounded-md p-1 -ml-1 transition-transform hover:opacity-95"
            title="Global Express Home"
          >
            <div className="w-10 h-10 bg-sky-500 flex items-center justify-center text-white shadow-xs">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  Global<span className="text-sky-500">Express</span>
                </span>
              </div>
              <span className="text-[11px] font-medium text-sky-600 tracking-wider uppercase block -mt-1">
                Logistics & Freight Services
              </span>
            </div>
          </button>

          {/* Right Navigation */}
          <div className="flex items-center gap-3 sm:gap-4">
            {currentView === 'details' && (
              <button
                id="header-back-btn"
                onClick={onResetToSearch}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md border border-slate-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>New Search</span>
              </button>
            )}

            <div className="hidden md:flex items-center gap-2 pl-3 border-l border-slate-200 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-sky-500" />
              <span>Verified Transport Network</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
