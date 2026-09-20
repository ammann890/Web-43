import React from 'react';
import { Globe, Shield, Phone, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="main-footer" className="mt-auto bg-white border-t border-slate-200 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 rounded-none">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-sky-500 flex items-center justify-center text-white rounded-none">
            <Globe className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-slate-800 tracking-tight">Global Express</span>
          <span className="text-slate-300">|</span>
          <span>Interstate & National Logistics Network</span>
        </div>

        {/* Support & Security */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-slate-500">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-sky-500" />
            <span>Certified Consignment Release</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-sky-500" />
            <span>24/7 Dispatch Control</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-sky-500" />
            <span>1-800-GLOBAL-EX</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-slate-400">
          &copy; {new Date().getFullYear()} Global Express Freight Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
