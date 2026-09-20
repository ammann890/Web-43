import React, { useState, useEffect } from 'react';
import {
  Package,
  MapPin,
  User,
  Ruler,
  Clock,
  Copy,
  Check,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import { ShipmentDetails } from '../types';

interface PackageInfoProps {
  shipment: ShipmentDetails;
  onNewSearch: () => void;
}

export const PackageInfo: React.FC<PackageInfoProps> = ({ shipment, onNewSearch }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isLoadingSkeleton, setIsLoadingSkeleton] = useState<boolean>(true);

  // 1.5-second skeleton loading for package dimensions and consignee areas
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingSkeleton(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyId = () => {
    navigator.clipboard.writeText(shipment.trackingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="package-info-page" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sky-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shadow-xs rounded-none">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Tracking Code</span>
              {/* Button retains rounded corners */}
              <button
                id="copy-tracking-id-btn"
                onClick={handleCopyId}
                className="inline-flex items-center gap-1 text-xs text-sky-600 hover:text-sky-700 bg-sky-50 hover:bg-sky-100 px-2 py-0.5 rounded-md transition-colors"
                title="Copy tracking number"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-mono text-slate-900 tracking-tight">
              {shipment.trackingId}
            </h1>
          </div>
        </div>

        <div>
          {/* Button retains rounded corners */}
          <button
            id="new-search-btn"
            onClick={onNewSearch}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-md border border-slate-300 transition-colors shadow-xs"
          >
            <span>New Search</span>
          </button>
        </div>
      </div>

      {/* Main Status & Route Banner - Sharp borders */}
      <div className="mt-6 bg-white border border-slate-200 shadow-xs p-6 sm:p-8 rounded-none">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200 rounded-none">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
                {shipment.status}
              </span>
              <span className="text-xs text-slate-400 font-medium">{shipment.serviceType}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              In Transit &bull; Freight Consignment Processing
            </h2>
          </div>

          {/* Estimated Delivery shows calculating indefinitely */}
          <div className="md:text-right bg-sky-50/60 md:bg-transparent p-4 md:p-0 border md:border-none border-sky-100 rounded-none">
            <span className="text-xs font-medium text-slate-500 block">Estimated Delivery</span>
            <div className="flex items-center md:justify-end gap-1.5 mt-0.5">
              <Loader2 className="w-4 h-4 text-sky-500 animate-spin" />
              <span className="text-base sm:text-lg font-bold text-sky-700 font-mono tracking-tight">
                Calculating...
              </span>
            </div>
          </div>
        </div>

        {/* Origin to Destination Route Flow - Sharp corners */}
        <div className="pt-6 grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          {/* Origin */}
          <div className="md:col-span-4 bg-slate-50 p-4 border border-slate-200 rounded-none">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-600 uppercase tracking-wider mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Origin</span>
            </div>
            <div className="text-base font-bold text-slate-900">{shipment.origin.state}</div>
            <div className="text-xs text-slate-500 mt-0.5">{shipment.origin.city}, {shipment.origin.state}</div>
            <div className="text-[11px] text-slate-400 mt-1">{shipment.origin.hubName}</div>
          </div>

          {/* Transit Connector */}
          <div className="md:col-span-3 flex flex-col items-center justify-center px-2 py-2">
            <div className="w-full flex items-center justify-between text-[11px] font-semibold text-sky-600 mb-1">
              <span>Alabama</span>
              <span className="text-slate-400">&rarr;</span>
              <span>Indiana</span>
            </div>
            <div className="relative w-full h-2 bg-slate-100 rounded-none overflow-hidden border border-slate-200">
              <div className="absolute top-0 left-0 h-full bg-sky-500 w-[65%]" />
            </div>
            <span className="text-[10px] text-slate-400 mt-1">Interstate Transit Dispatch</span>
          </div>

          {/* Destination */}
          <div className="md:col-span-4 bg-slate-50 p-4 border border-slate-200 rounded-none">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              <MapPin className="w-3.5 h-3.5 text-sky-600" />
              <span>Destination</span>
            </div>
            <div className="text-base font-bold text-slate-900">{shipment.destination.name}</div>
            <div className="text-xs text-slate-700 font-medium mt-0.5">{shipment.destination.street}</div>
            <div className="text-xs text-slate-600">{shipment.destination.city}, {shipment.destination.state} {shipment.destination.zip}</div>
          </div>
        </div>
      </div>

      {/* Grid of Key Shipping Details: Dimensions and Consignee Information */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Package Dimensions Card (with 1.5s skeleton UI loading) */}
        <div className="bg-white border border-slate-200 shadow-xs p-6 rounded-none">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-sky-50 text-sky-600 flex items-center justify-center rounded-none border border-sky-100">
                <Ruler className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Package Dimensions</h3>
            </div>
            <span className="text-xs font-medium px-2.5 py-0.5 bg-sky-50 text-sky-700 border border-sky-200 rounded-none">
              Certified Spec
            </span>
          </div>

          {isLoadingSkeleton ? (
            /* Skeleton UI Loading for Dimensions (1.5 seconds) */
            <div className="mt-5 space-y-3.5 animate-pulse" role="status" aria-label="Loading package dimensions">
              <div className="grid grid-cols-2 gap-3.5">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-slate-50 p-3.5 border border-slate-200 rounded-none space-y-2">
                    <div className="h-3 bg-slate-200 w-16" />
                    <div className="h-5 bg-slate-300 w-28" />
                    <div className="h-2.5 bg-slate-200 w-20" />
                  </div>
                ))}
              </div>
              <div className="p-4 bg-slate-100 border border-slate-200 rounded-none space-y-2">
                <div className="h-3 bg-slate-300 w-32" />
                <div className="h-3 bg-slate-200 w-full" />
              </div>
            </div>
          ) : (
            /* Actual Package Dimensions */
            <div className="mt-5 space-y-3.5">
              <div className="grid grid-cols-2 gap-3.5">
                <div className="bg-slate-50 p-3.5 border border-slate-200 rounded-none">
                  <span className="text-[11px] font-medium text-slate-500 block">Length</span>
                  <span className="text-sm sm:text-base font-bold text-slate-900 block mt-0.5">
                    {shipment.dimensions.length}
                  </span>
                  <span className="text-[10px] text-slate-400">251 in / 6.37 m</span>
                </div>

                <div className="bg-slate-50 p-3.5 border border-slate-200 rounded-none">
                  <span className="text-[11px] font-medium text-slate-500 block">Width</span>
                  <span className="text-sm sm:text-base font-bold text-slate-900 block mt-0.5">
                    {shipment.dimensions.width}
                  </span>
                  <span className="text-[10px] text-slate-400">82 in / 2.08 m</span>
                </div>

                <div className="bg-slate-50 p-3.5 border border-slate-200 rounded-none">
                  <span className="text-[11px] font-medium text-slate-500 block">Height</span>
                  <span className="text-sm sm:text-base font-bold text-slate-900 block mt-0.5">
                    {shipment.dimensions.height}
                  </span>
                  <span className="text-[10px] text-slate-400">80 in / 2.03 m</span>
                </div>

                <div className="bg-sky-50/70 p-3.5 border border-sky-200 rounded-none">
                  <span className="text-[11px] font-semibold text-sky-700 block">Shipping Weight</span>
                  <span className="text-sm sm:text-base font-extrabold text-sky-950 block mt-0.5">
                    {shipment.dimensions.weight}
                  </span>
                  <span className="text-[10px] text-sky-700/80">3,175 kg (Gross)</span>
                </div>
              </div>

              <div className="p-4 bg-slate-900 text-white rounded-none border border-slate-800">
                <div className="flex items-center justify-between text-xs text-sky-300 font-semibold mb-1">
                  <span>Heavy Freight Classification</span>
                  <span>7,000 lb Payload</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Consignment requires certified heavy freight equipment and tie-down protocols during transit and offload.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Consignee & Recipient Information Card (with 1.5s skeleton UI loading) */}
        <div className="bg-white border border-slate-200 shadow-xs p-6 rounded-none">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="w-8 h-8 bg-sky-50 text-sky-600 flex items-center justify-center rounded-none border border-sky-100">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Consignee & Recipient Info</h3>
              <span className="text-xs text-slate-400">Delivery verification record</span>
            </div>
          </div>

          {isLoadingSkeleton ? (
            /* Skeleton UI Loading for Consignee Area (1.5 seconds) */
            <div className="mt-5 space-y-4 animate-pulse" role="status" aria-label="Loading consignee information">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <div className="h-3.5 bg-slate-200 w-24" />
                <div className="h-4 bg-slate-300 w-36" />
              </div>
              <div className="flex justify-between items-start pb-3 border-b border-slate-100">
                <div className="h-3.5 bg-slate-200 w-28" />
                <div className="space-y-1.5 w-48">
                  <div className="h-3.5 bg-slate-300 w-full ml-auto" />
                  <div className="h-3.5 bg-slate-200 w-3/4 ml-auto" />
                </div>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <div className="h-3.5 bg-slate-200 w-20" />
                <div className="h-4 bg-slate-300 w-20" />
              </div>
              <div className="flex justify-between items-center pb-1">
                <div className="h-3.5 bg-slate-200 w-24" />
                <div className="h-4 bg-slate-300 w-32" />
              </div>
              <div className="mt-4 p-3 bg-slate-100 border border-slate-200 rounded-none h-12" />
            </div>
          ) : (
            /* Actual Consignee & Recipient Info */
            <div className="mt-5 space-y-4 text-xs">
              <div className="flex justify-between items-start pb-3 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Recipient Name:</span>
                <span className="font-bold text-slate-900 text-sm text-right">
                  {shipment.destination.name}
                </span>
              </div>

              <div className="flex justify-between items-start pb-3 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Delivery Address:</span>
                <span className="font-semibold text-slate-800 text-right max-w-[260px] leading-relaxed">
                  {shipment.destination.address}
                </span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Recipient Age:</span>
                <span className="font-semibold text-slate-900 bg-sky-50 px-2 py-0.5 text-sky-800 border border-sky-100 rounded-none">
                  {shipment.destination.age}
                </span>
              </div>

              <div className="flex justify-between items-center pb-1">
                <span className="text-slate-500 font-medium">Date of Birth:</span>
                <span className="font-semibold text-slate-900 font-mono">
                  {shipment.destination.dob}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 text-slate-700 text-[11px] rounded-none">
                <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Recipient Age Verification (62 yrs old &bull; DOB Oct 23, 1963) registered for delivery release.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
