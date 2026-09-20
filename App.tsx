import React, { useState } from 'react';
import { Header } from './components/Header';
import { TrackingSearch } from './components/TrackingSearch';
import { PackageInfo } from './components/PackageInfo';
import { LoadingScreen } from './components/LoadingScreen';
import { Footer } from './components/Footer';
import { getShipmentDetails, VALID_TRACKING_ID } from './data/shipmentData';
import { ShipmentDetails } from './types';

export default function App() {
  const [view, setView] = useState<'search' | 'details'>('search');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shipment, setShipment] = useState<ShipmentDetails>(getShipmentDetails());

  // Handler for tracking ID submission:
  // "when the id is submitted, there's a 2.5 second loading screen
  // (screen turns purely white with a spining semicircle line)
  // the page that opens is a package info page with all the shipping details"
  const handleSearch = (id: string) => {
    if (id !== VALID_TRACKING_ID) {
      return;
    }
    const loadedShipment = getShipmentDetails();
    setShipment(loadedShipment);
    setIsLoading(true);

    // Exactly 2.5 seconds (2500 ms)
    setTimeout(() => {
      setIsLoading(false);
      setView('details');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2500);
  };

  const handleResetToSearch = () => {
    setView('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans text-slate-900 selection:bg-sky-100 selection:text-sky-800 rounded-none">
      {/* 2.5 Second Pure White Screen with Spinning Semicircle Line */}
      {isLoading && <LoadingScreen />}

      {/* Main Header */}
      <Header
        currentView={view}
        onResetToSearch={handleResetToSearch}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {view === 'search' ? (
          <TrackingSearch onSearch={handleSearch} />
        ) : (
          <PackageInfo
            shipment={shipment}
            onNewSearch={handleResetToSearch}
          />
        )}
      </main>

      {/* Minimalist Footer */}
      <Footer />
    </div>
  );
}
