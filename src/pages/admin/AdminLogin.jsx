/**
 * AdminLogin.jsx — Écran de connexion de l'espace admin (/admin).
 *
 * ⚠️ SÉCURITÉ — À LIRE
 * ------------------------------------------------------------------
 * En mode LOCAL (API PHP non joignable, ex. développement local),
 * l'identifiant/mot de passe est comparé à une valeur de démonstration
 * (voir adminAuth.js). Ce n'est PAS une vraie sécurité : c'est un écran
 * pour tester l'interface.
 *
 * En ligne, la connexion passe par l'API PHP (api/index.php?action=login) :
 * le mot de passe est vérifié côté serveur (hachage BCRYPT) et devient une
 * authentification réelle.
 */
import { useState } from 'react';
import { signIn, authMode } from '../../admin/adminAuth';
import { Logo } from '../../components/Logo';

export function AdminLogin({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await signIn(email, password);
      onSuccess();
    } catch (err) {
      setError(err.message || 'Connexion impossible.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo officiel */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <Logo className="h-14 w-auto" variant="dark" />
          <p className="text-primary-500 text-xs font-semibold tracking-widest uppercase">Espace admin</p>
        </div>

        <form onSubmit={submit} className="bg-white rounded-xl shadow-2xl p-8">
          <h1 className="text-xl font-bold text-gray-900 mb-1">Connexion</h1>
          <p className="text-sm text-gray-500 mb-6">Accès réservé à l’équipe D-SOMAGUE.</p>

          {authMode() === 'local' && (
            <div className="mb-5 text-xs bg-amber-50 border border-amber-200 text-amber-800 rounded-lg px-3 py-2.5 leading-relaxed">
              <strong>Mode démonstration.</strong> L’API PHP n’est pas encore
              joignable : utilisez <code className="font-mono">admin@dsomague.tg</code> /{' '}
              <code className="font-mono">admin</code>.
            </div>
          )}

          {error && (
            <div className="mb-5 text-sm bg-red-50 border border-red-200 text-red-700 rounded-lg px-3 py-2.5">
              {error}
            </div>
          )}

          <label className="block text-sm font-medium text-gray-700 mb-2">Adresse e-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="vous@dsomague.tg"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-6 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="••••••••"
          />

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            {busy ? 'Connexion…' : 'Se connecter'}
          </button>

          <a href="/" className="block text-center text-sm text-gray-500 hover:text-primary-600 mt-5">
            ← Retour au site public
          </a>
        </form>
      </div>
    </div>
  );
}
