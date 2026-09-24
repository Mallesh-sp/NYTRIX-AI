import React, { useState } from 'react';
import './premium-navbar.css';
import { Menu, X, LogOut } from 'lucide-react';
import Logo from './Logo';

type NavItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
};

type Props = {
  navItems: NavItem[];
  currentPage: string;
  onNavigate: (id: string) => void;
  currentUser?: { email?: string; role?: string } | null;
  onLogout: () => void;
};

const PremiumNavbar: React.FC<Props> = ({ navItems, currentPage, onNavigate, currentUser, onLogout }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="premium-navbar" aria-label="NYTRIX AI INDIA header">
      <div className="premium-navbar__inner glass-effect" style={{ height: '76px' }}>
        {/* LEFT: Logo + Brand */}
        <div className="premium-navbar__left" role="region" aria-label="brand">
          <div className="premium-navbar__logoWrap" aria-hidden>
            <Logo size={48} />
          </div>
          <div className="premium-navbar__brand">
            <div className="brand-title">NYTRIX AI INDIA</div>
            <div className="brand-sub">Legal Intelligence • Enterprise</div>
          </div>
        </div>

        {/* CENTER: Navigation - evenly spaced */}
        <nav className="premium-navbar__center" aria-label="Main navigation">
          <div className="nav-items-wrapper" role="menubar">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`nav-item ${currentPage === item.id ? 'active' : ''} ${item.id === 'analyzer' ? 'ai-pill' : ''}`}
                aria-current={currentPage === item.id ? 'page' : undefined}
                role="menuitem"
                aria-label={item.label}
              >
                <span className="nav-icon" aria-hidden>{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* RIGHT: User info + actions */}
        <div className="premium-navbar__right" role="region" aria-label="user">
          <div className="user-info">
            <div className="avatar" aria-hidden />
            <div className="user-meta">
              <div className="user-email">{currentUser?.email || 'guest@nytrix.ai'}</div>
              <div className="user-role">{currentUser?.role ? currentUser.role.toUpperCase() : 'USER'}</div>
            </div>
          </div>

          <div className="actions">
            <button className="logout-btn" onClick={onLogout} title="Logout">
              <LogOut className="logout-icon" />
              <span className="logout-text">Logout</span>
            </button>
            <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="premium-navbar__mobile">
          <nav className="mobile-nav">
            {navItems.map((n) => (
              <button key={n.id} onClick={() => { onNavigate(n.id); setMobileOpen(false); }} className={`mobile-item ${currentPage === n.id ? 'active' : ''}`}>
                <span className="mobile-label">{n.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default PremiumNavbar;
