import React, { useState } from 'react';
import {
  LogOut,
  ShieldCheck,
  ChevronDown,
  Menu,
  X,
  Scale,
  Building2,
  Clock,
  FolderLock,
  ArrowRight
} from 'lucide-react';
import { ClientUser } from '../types';
import scriptifyLogo from '../assets/images/scriptify_polished_logo_1794312499371.jpg';

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
    { id: 'services', label: 'Services', icon: Scale },
    { id: 'clients', label: 'Case Studies', icon: Building2 },
    { id: 'pricing', label: 'Pricing', icon: Clock },
    { id: 'security', label: 'Security & HIPAA', icon: ShieldCheck },
    { id: 'portal', label: 'Client Portal', icon: FolderLock },
  ];

  const handleNavClick = (viewId: ViewType) => {
    onViewChange(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#E2DED5] transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 px-3.5 sm:px-6 py-3">
        {/* Left: Native Brand Lockup — Logo blends seamlessly into light header */}
        <button
          onClick={() => handleNavClick('overview')}
          className="flex items-center gap-2 sm:gap-3 text-left min-w-0 shrink cursor-pointer group"
          title="Return to Home Overview"
          aria-label="Return to Home Overview"
        >
          <img
            src={scriptifyLogo}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/logo.jpg';
            }}
            alt="Scriptify Transcripts"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-contain bg-white border border-[#E2DED5] group-hover:border-[#0F2A4A]/40 transition-all shrink-0"
          />
          <span className="text-sm sm:text-lg font-extrabold tracking-tight text-[#0F2A4A] group-hover:text-[#173B66] transition-colors truncate">
            SCRIPTIFY <span className="font-semibold text-[#9A6B2F] text-[11px] sm:text-sm tracking-wider uppercase ml-0.5 sm:ml-1">Transcripts</span>
          </span>
        </button>

        {/* Center: Clean Editorial Text Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-[13px] font-medium text-slate-600">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`py-2 border-b-2 transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                currentView === item.id
                  ? 'border-[#0F2A4A] text-[#0F2A4A] font-bold'
                  : 'border-transparent text-slate-600 hover:text-[#0F2A4A] hover:border-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right: Sign In + Primary Action */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#FAF8F4] border border-[#E2DED5] hover:border-[#0F2A4A]/40 rounded-lg text-left transition-all cursor-pointer group"
                aria-label="User account menu"
              >
                <div className="w-7 h-7 rounded-md bg-[#0F2A4A] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="hidden md:block text-left leading-tight max-w-[130px]">
                  <span className="text-[#0F1E36] font-semibold text-xs truncate block">
                    {currentUser.name.split(',')[0]}
                  </span>
                  <span className="text-[10px] text-[#9A6B2F] font-medium truncate block">
                    {currentUser.organization.split('(')[0]}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#0F2A4A] transition-transform" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-[#E2DED5] rounded-xl shadow-xl p-3 space-y-2.5 z-50 text-xs">
                  <div className="p-2.5 bg-[#FAF8F4] rounded-lg border border-[#E2DED5]/70 space-y-1">
                    <div className="text-[#0F1E36] font-bold">{currentUser.name}</div>
                    <div className="text-slate-600 text-[11px] truncate">{currentUser.email}</div>
                    <div className="text-[#0F2A4A] text-[11px] font-mono font-medium">{currentUser.organization}</div>
                    {currentUser.matterRef && (
                      <div className="text-[10px] text-slate-600 pt-1 border-t border-[#E2DED5]">
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
                      className="w-full text-left px-3 py-2 text-[#0F1E36] hover:text-[#0F2A4A] hover:bg-[#FAF8F4] font-medium rounded-lg transition-colors cursor-pointer"
                    >
                      Open Case Dockets
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onSignOut();
                      }}
                      className="w-full text-left px-3 py-2 text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 font-medium"
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
              className="hidden md:inline-flex px-3.5 py-2 text-xs font-semibold text-[#0F2A4A] hover:bg-[#FAF8F4] bg-white border border-[#D4CFC4] hover:border-[#0F2A4A] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Client Sign In
            </button>
          )}

          {/* Primary Judicial Navy Action CTA */}
          <button
            onClick={() => handleNavClick('portal')}
            className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold text-white bg-[#0F2A4A] rounded-lg hover:bg-[#173B66] transition-colors shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            Start Deposition Order
          </button>

          {/* Mobile & Tablet Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-[#0F2A4A] rounded-lg hover:bg-[#FAF8F4] transition-colors cursor-pointer"
            aria-label="Toggle mobile navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#0F2A4A]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Slide-Down Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E2DED5] bg-[#FAF8F4] px-4 sm:px-6 py-5 space-y-4 shadow-lg">
          <div className="text-[11px] font-semibold text-[#9A6B2F] uppercase tracking-wider">
            Practice Navigation
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-lg text-left text-xs font-medium transition-colors cursor-pointer ${
                    currentView === item.id
                      ? 'bg-white text-[#0F2A4A] font-bold border border-[#D4CFC4] shadow-sm'
                      : 'text-slate-700 hover:bg-white hover:text-[#0F2A4A]'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#0F2A4A] shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#E2DED5] flex flex-col gap-2.5">
            <button
              onClick={() => handleNavClick('portal')}
              className="w-full py-2.5 bg-[#0F2A4A] hover:bg-[#173B66] text-white text-xs font-semibold rounded-lg text-center cursor-pointer shadow-sm"
            >
              Start Deposition Order
            </button>

            {!currentUser ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-2.5 bg-white border border-[#D4CFC4] hover:border-[#0F2A4A] text-[#0F2A4A] text-xs font-semibold rounded-lg text-center cursor-pointer"
              >
                Sign In to Law Firm Account
              </button>
            ) : (
              <div className="p-3 bg-white rounded-lg border border-[#E2DED5] space-y-1 text-xs">
                <div className="font-bold text-[#0F1E36]">{currentUser.name}</div>
                <div className="text-[#9A6B2F] text-[11px] font-medium">{currentUser.organization}</div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSignOut();
                  }}
                  className="text-rose-700 text-[11px] hover:underline pt-1 block cursor-pointer font-medium"
                >
                  Sign Out of Account
                </button>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 pt-1">
              <span>30 N Gould St, Sheridan, WY</span>
              <span>Rule 30(b)(6) Standards</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
