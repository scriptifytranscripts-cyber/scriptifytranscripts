import React, { useState } from 'react';
import {
  User,
  LogOut,
  ShieldCheck,
  ChevronDown,
  Lock,
  Menu,
  X,
  Scale,
  Building2,
  Clock,
  FolderLock,
  ArrowRight
} from 'lucide-react';
import { ClientUser } from '../types';

export type ViewType = 'overview' | 'services' | 'clients' | 'pricing' | 'security' | 'portal';

interface NavbarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  currentUser: ClientUser | null;
  onOpenAuth: () => void;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onViewChange,
  currentUser,
  onOpenAuth,
  onSignOut,
}) => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ViewType; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Overview', icon: Scale },
    { id: 'services', label: 'Services & Depositions', icon: Scale },
    { id: 'clients', label: 'Case Studies', icon: Building2 },
    { id: 'pricing', label: 'Pricing & Estimator', icon: Clock },
    { id: 'security', label: 'Security & HIPAA', icon: ShieldCheck },
    { id: 'portal', label: 'Client Portal', icon: FolderLock },
  ];

  const handleNavClick = (viewId: ViewType) => {
    onViewChange(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-3">
        {/* Left: Brand Identity */}
        <button
          onClick={() => handleNavClick('overview')}
          className="flex items-center gap-2.5 sm:gap-3 text-left whitespace-nowrap shrink-0 cursor-pointer group"
        >
          <img
            src="/src/assets/images/scriptify_polished_logo_1794312499371.jpg"
            alt="Scriptify Transcripts"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg object-contain bg-white p-0.5 border border-cyan-400/40 group-hover:border-cyan-400 transition-colors shrink-0"
          />
          <div className="leading-tight">
            <span className="text-base sm:text-lg font-extrabold tracking-tight text-white block">
              SCRIPTIFY<span className="text-cyan-400 text-[11px] sm:text-xs font-semibold ml-1.5 uppercase tracking-wider">Transcripts</span>
            </span>
            <span className="hidden sm:block text-[9px] font-mono text-slate-400 tracking-wider">
              Legal, Corporate & Clinical Transcription
            </span>
          </div>
        </button>

        {/* Center: Desktop Navigation Tabs (View-Based, No Full Scroll) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-xs font-medium text-slate-300">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3 py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                currentView === item.id
                  ? 'bg-slate-900 text-cyan-400 font-semibold border border-slate-800 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right: Distinct Actions & Authentication */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* User Account / Sign In */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-xl text-left transition-all cursor-pointer group"
                aria-label="User account menu"
              >
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="hidden md:block text-left leading-tight max-w-[120px]">
                  <span className="text-white font-semibold text-xs truncate block">
                    {currentUser.name.split(',')[0]}
                  </span>
                  <span className="text-[10px] text-cyan-400 truncate block">
                    {currentUser.organization.split('(')[0]}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-transform" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-3 space-y-2.5 z-50 text-xs">
                  <div className="p-2.5 bg-slate-950 rounded-lg space-y-1">
                    <div className="text-white font-bold">{currentUser.name}</div>
                    <div className="text-slate-400 text-[11px] truncate">{currentUser.email}</div>
                    <div className="text-cyan-400 text-[11px] font-mono">{currentUser.organization}</div>
                    {currentUser.matterRef && (
                      <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                        Matter: {currentUser.matterRef}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        handleNavClick('portal');
                      }}
                      className="w-full text-left px-3 py-2 text-slate-200 hover:text-cyan-400 hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer"
                    >
                      Open Case Dockets
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onSignOut();
                      }}
                      className="w-full text-left px-3 py-2 text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-2.5 sm:px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              Client Sign In
            </button>
          )}

          {/* Primary Action Button - Clearly Labeled to avoid duplication */}
          {currentView !== 'portal' ? (
            <button
              onClick={() => handleNavClick('portal')}
              className="px-3.5 sm:px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-all shadow-sm hover:shadow-cyan-500/20 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Start Deposition Order
            </button>
          ) : (
            <button
              onClick={() => handleNavClick('overview')}
              className="px-3.5 sm:px-4 py-2 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Back to Overview
            </button>
          )}

          {/* Mobile & Tablet Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors cursor-pointer"
            aria-label="Toggle mobile navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Slide-Down Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950/98 px-6 py-5 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
            Navigation Menu
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-left text-xs font-medium transition-colors cursor-pointer ${
                    currentView === item.id
                      ? 'bg-slate-900 text-cyan-400 font-semibold border border-slate-800'
                      : 'text-slate-300 hover:bg-slate-900/60 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2.5">
            {!currentUser ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-semibold rounded-xl text-center cursor-pointer"
              >
                Sign In to Law Firm Account
              </button>
            ) : (
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1 text-xs">
                <div className="font-bold text-white">{currentUser.name}</div>
                <div className="text-cyan-400 text-[11px]">{currentUser.organization}</div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSignOut();
                  }}
                  className="text-rose-400 text-[11px] hover:underline pt-1 block cursor-pointer"
                >
                  Sign Out of Account
                </button>
              </div>
            )}

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span>30 N Gould St, Sheridan, WY</span>
              <span>Rule 30(b)(6) Standards</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
