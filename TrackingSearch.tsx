import React, { useState } from 'react';
import { Search, Package, ArrowRight, X, AlertCircle } from 'lucide-react';
import { VALID_TRACKING_ID } from '../data/shipmentData';

interface TrackingSearchProps {
  onSearch: (trackingId: string) => void;
}

export const TrackingSearch: React.FC<TrackingSearchProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = inputValue.trim().toUpperCase();

    if (!cleanInput) {
      setError('Please enter a tracking number.');
      return;
    }

    // Only GE-849204812US will work as strictly required
    if (cleanInput !== VALID_TRACKING_ID) {
      setError(`Tracking ID "${inputValue.trim()}" not found. Please verify your consignment code and try again.`);
      return;
    }

    setError('');
    onSearch(cleanInput);
  };

  return (
    <div id="tracking-search-section" className="w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Search Container with sharp borders (no rounded corners except buttons) */}
      <div className="bg-white border border-slate-200 shadow-xs p-6 sm:p-12 rounded-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold mb-4 rounded-none">
          <Package className="w-3.5 h-3.5 text-sky-500" />
          <span>Global Express Consignment Tracking</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Track Your Shipment
        </h1>
        <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-xl leading-relaxed">
          Enter your official Global Express tracking number to access freight specifications and consignee delivery details.
        </p>

        {/* Tracking Form */}
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5 text-sky-500" />
              </div>
              <input
                id="tracking-id-input"
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter Tracking ID (e.g. GE-849204812US)"
                className="w-full pl-11 pr-10 py-4 text-base font-medium text-slate-900 bg-white border-2 border-slate-300 rounded-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all placeholder:text-slate-400 outline-hidden"
                autoFocus
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={() => {
                    setInputValue('');
                    setError('');
                  }}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 rounded-md"
                  title="Clear input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Submit Button retains rounded corners as specified ("except for buttons") */}
            <button
              id="submit-tracking-btn"
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white font-semibold text-base rounded-md transition-all shadow-xs hover:shadow-sky-200 cursor-pointer"
            >
              <span>Track</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="mt-3 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-medium flex items-center gap-2 rounded-none">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <div className="mt-4 text-xs text-slate-400 pt-3 border-t border-slate-100">
            <span>Official Carrier Tracking System &bull; Active Consignment Dispatch Network</span>
          </div>
        </form>
      </div>
    </div>
  );
};
