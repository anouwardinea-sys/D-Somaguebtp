/**
 * AdminDashboard.jsx — Tableau de bord de l'espace admin.
 *
 * Coquille avec barre latérale de navigation, en-tête, et deux sections :
 *   • Biens immobiliers  (ajout / modification / suppression + photo)
 *   • Actualités         (ajout / modification / suppression + photo)
 *
 * ⚠️ SÉPARÉ DU SITE PUBLIC : aucune Header/Footer publique ici.
 */
import { useState } from 'react';
import { signOut, authMode } from '../../admin/adminAuth';
import { Logo } from '../../components/Logo';
import { AdminProperties } from './AdminProperties';
import { AdminNews } from './AdminNews';
import { AdminMessages } from './AdminMessages';

export function AdminDashboard({ onLogout }) {
  const [tab, setTab] = useState('messages');

  const handleLogout = async () => {
    await signOut();
    onLogout();
  };

  const nav = [
    { id: 'messages', label: 'Messages', icon: '✉️' },
    { id: 'properties', label: 'Biens immobiliers', icon: '🏠' },
    { id: 'news', label: 'Actualités', icon: '📰' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 lg:flex">
      {/* ===== BARRE LATÉRALE ===== */}
      <aside className="lg:w-64 bg-neutral-950 text-white flex-shrink-0">
        <div className="p-5 border-b border-white/10">
          <Logo className="h-10 w-auto" variant="dark" />
          <p className="text-primary-500 text-[11px] font-semibold tracking-widest uppercase mt-2">Administration</p>
        </div>

        <nav className="p-3 space-y-1">
          {nav.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors text-left ${
                tab === item.id ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-3 mt-4 border-t border-white/10 space-y-2">
          <a href="/" className="block px-4 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition-colors">
            ↗ Voir le site public
          </a>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-red-300 hover:bg-red-500/15 transition-colors"
          >
            ⏻ Se déconnecter
          </button>
        </div>

        {authMode() === 'local' && (
          <div className="p-4 text-[11px] text-amber-300/80 leading-relaxed border-t border-white/10">
            Mode démonstration (données locales à ce navigateur). Installez
            l’API PHP (dossier /api) pour publier réellement.
          </div>
        )}
      </aside>

      {/* ===== CONTENU ===== */}
      <main className="flex-1 min-w-0">
        <header className="bg-white border-b border-gray-200 px-5 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-lg font-bold text-gray-900">
            {nav.find((n) => n.id === tab)?.label}
          </h1>
          <span className="text-xs text-gray-500">
            {authMode() === 'api' ? 'Connecté (base MySQL)' : 'Mode local'}
          </span>
        </header>

        <div className="p-5 sm:p-8">
          {tab === 'messages' && <AdminMessages />}
          {tab === 'properties' && <AdminProperties />}
          {tab === 'news' && <AdminNews />}
        </div>
      </main>
    </div>
  );
}
