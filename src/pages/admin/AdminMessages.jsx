/**
 * AdminMessages.jsx — Boîte de réception des messages (visiteurs + newsletter).
 *
 * • Liste des messages reçus depuis le formulaire de contact et la newsletter.
 * • Filtres : tous / non lus / lus / répondus + recherche par nom ou e-mail.
 * • Lecture d'un message (marqué automatiquement « lu »).
 * • Réponse : enregistrée dans l'admin, et envoyée au client via WhatsApp
 *   (si numéro fourni) ou e-mail (mailto) en un clic.
 * • Suppression.
 *
 * Dépendances : admin/adminMessages.js (API PHP ou stockage local).
 */
import { useEffect, useMemo, useState } from 'react';
import {
  listMessages, updateMessage, removeMessage,
} from '../../admin/adminMessages';

const BRANCH_LABELS = {
  architecture: 'Architecture', ingenierie: 'Ingénierie', immobilier: 'Immobilier',
  transit: 'Transit', topographie: 'Topographie', newsletter: 'Newsletter',
};

const STATUS_STYLE = {
  unread: 'bg-blue-100 text-blue-700 border-blue-200',
  read: 'bg-gray-100 text-gray-600 border-gray-200',
  replied: 'bg-green-100 text-green-700 border-green-200',
};
const STATUS_LABEL = { unread: 'Non lu', read: 'Lu', replied: 'Répondu' };

/** Nettoie un numéro pour produire un lien wa.me (chiffres uniquement, +228 si local). */
function toWaNumber(phone = '') {
  const digits = String(phone).replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('228')) return digits;
  if (digits.length <= 8) return `228${digits}`; // numéro togolais local
  return digits;
}

export function AdminMessages() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [reply, setReply] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const list = await listMessages();
      setItems(list);
    } catch (e) {
      setMsg({ type: 'error', text: e.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((m) => {
      const okFilter =
        filter === 'all' ? true :
        filter === 'unread' ? m.status === 'unread' :
        filter === 'read' ? m.status === 'read' :
        filter === 'replied' ? m.status === 'replied' : true;
      const okQuery = !q ||
        (m.name || '').toLowerCase().includes(q) ||
        (m.email || '').toLowerCase().includes(q) ||
        (m.message || '').toLowerCase().includes(q);
      return okFilter && okQuery;
    });
  }, [items, filter, query]);

  const selected = items.find((m) => m.id === selectedId) || null;
  const unreadCount = items.filter((m) => m.status === 'unread').length;

  const openMessage = async (m) => {
    setSelectedId(m.id);
    setReply(m.reply || '');
    setMsg(null);
    if (m.status === 'unread') {
      // Marque comme lu (optimiste + persistance).
      setItems((prev) => prev.map((x) => (x.id === m.id ? { ...x, status: 'read' } : x)));
      try {
        await updateMessage(m.id, { status: 'read' });
      } catch { /* non bloquant */ }
    }
  };

  const closeMessage = () => { setSelectedId(null); setReply(''); };

  const sendReply = async () => {
    if (!selected) return;
    if (!reply.trim()) { setMsg({ type: 'error', text: 'La réponse est vide.' }); return; }
    setBusy(true);
    setMsg(null);
    try {
      const updated = await updateMessage(selected.id, { status: 'replied', reply: reply.trim() });
      setItems((prev) => prev.map((m) => (m.id === selected.id ? (updated || m) : m)));
      setMsg({ type: 'ok', text: 'Réponse enregistrée. Choisissez un canal pour l’envoyer au client.' });
    } catch (e) {
      setMsg({ type: 'error', text: e.message });
    } finally {
      setBusy(false);
    }
  };

  const remove = async (m) => {
    if (!window.confirm(`Supprimer le message de « ${m.name || m.email} » ?`)) return;
    try {
      await removeMessage(m.id);
      if (selectedId === m.id) closeMessage();
      await load();
      setMsg({ type: 'ok', text: 'Message supprimé.' });
    } catch (e) {
      setMsg({ type: 'error', text: e.message });
    }
  };

  const input = 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500';
  const tabBtn = (id, label) => (
    <button
      key={id}
      onClick={() => setFilter(id)}
      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
        filter === id ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-600 border-gray-300 hover:border-primary-400'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_460px] gap-8">
      {/* ===== LISTE (boîte de réception) ===== */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {tabBtn('all', `Tous (${items.length})`)}
          {tabBtn('unread', `Non lus (${unreadCount})`)}
          {tabBtn('read', 'Lus')}
          {tabBtn('replied', 'Répondus')}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un nom, e-mail, mot…"
            className="ml-auto flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {msg && (
          <div className={`text-sm rounded-lg px-3 py-2.5 mb-4 ${msg.type === 'ok' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {msg.text}
          </div>
        )}

        {loading && <p className="text-center text-gray-400 py-12 bg-white rounded-xl">Chargement…</p>}

        {!loading && filtered.length === 0 && (
          <p className="text-center text-gray-400 py-12 bg-white rounded-xl">Aucun message pour le moment.</p>
        )}

        <div className="space-y-3">
          {filtered.map((m) => (
            <button
              key={m.id}
              onClick={() => openMessage(m)}
              className={`w-full text-left bg-white rounded-xl shadow-sm p-4 border transition-colors ${
                selectedId === m.id ? 'border-primary-400 ring-1 ring-primary-200' : 'border-transparent hover:border-primary-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {m.status === 'unread' && <span className="w-2 h-2 rounded-full bg-primary-600 shrink-0" />}
                <span className="font-semibold text-gray-900 truncate">{m.name || '—'}</span>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-[2px] border ml-auto ${STATUS_STYLE[m.status] || STATUS_STYLE.read}`}>
                  {STATUS_LABEL[m.status] || m.status}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                {m.branch && (
                  <span className="font-semibold text-primary-600">{BRANCH_LABELS[m.branch] || m.branch}</span>
                )}
                <span>{new Date(m.created_at).toLocaleString('fr-FR')}</span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{m.message}</p>
            </button>
          ))}
        </div>
      </div>

      {/* ===== DÉTAIL + RÉPONSE ===== */}
      <div className="xl:sticky xl:top-24 h-fit">
        {!selected ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-400">
            <p className="text-4xl mb-3">📬</p>
            <p>Sélectionnez un message pour le lire et y répondre.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-bold text-gray-900">{selected.name || 'Sans nom'}</h2>
                <p className="text-xs text-gray-500">
                  {selected.branch ? (BRANCH_LABELS[selected.branch] || selected.branch) + ' · ' : ''}
                  {new Date(selected.created_at).toLocaleString('fr-FR')}
                </p>
              </div>
              <button onClick={closeMessage} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
            </div>

            {/* Coordonnées cliquables */}
            <div className="space-y-1.5 text-sm">
              {selected.phone && (
                <p><span className="text-gray-500">Tél :</span>{' '}
                  <a href={`tel:+${toWaNumber(selected.phone)}`} className="text-primary-600 font-semibold hover:text-primary-700">{selected.phone}</a>
                </p>
              )}
              {selected.email && (
                <p><span className="text-gray-500">E-mail :</span>{' '}
                  <a href={`mailto:${selected.email}`} className="text-primary-600 font-semibold hover:text-primary-700 break-all">{selected.email}</a>
                </p>
              )}
            </div>

            {/* Corps du message */}
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-800 whitespace-pre-wrap border border-gray-100">
              {selected.message}
            </div>

            {/* Réponse */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Votre réponse</label>
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                rows="5"
                className={`${input} resize-y`}
                placeholder="Bonjour, merci pour votre demande…"
              />
              <div className="flex gap-3 mt-3">
                <button
                  onClick={sendReply}
                  disabled={busy}
                  className="flex-1 bg-primary-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                  {busy ? 'Enregistrement…' : 'Enregistrer la réponse'}
                </button>
                <button
                  onClick={() => remove(selected)}
                  className="px-4 py-2.5 rounded-lg text-sm font-semibold border border-gray-300 text-red-600 hover:bg-red-50"
                >
                  Supprimer
                </button>
              </div>
            </div>

            {/* Envoi au client (canaux) */}
            <div className="pt-2 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Envoyer au client</p>
              <div className="flex flex-wrap gap-2">
                {toWaNumber(selected.phone) && (
                  <a
                    href={`https://wa.me/${toWaNumber(selected.phone)}?text=${encodeURIComponent(reply || '')}`}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-green-500 text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-green-600"
                  >
                    WhatsApp
                  </a>
                )}
                {selected.email && (
                  <a
                    href={`mailto:${selected.email}?subject=${encodeURIComponent('Re : votre demande — D-SOMAGUE INGÉNIERIE')}&body=${encodeURIComponent(reply || '')}`}
                    className="inline-flex items-center gap-1.5 bg-primary-600 text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-primary-700"
                  >
                    E-mail
                  </a>
                )}
              </div>
              <p className="text-[11px] text-gray-400 mt-2">
                Ouvre WhatsApp ou votre messagerie avec la réponse pré-remplie.
              </p>
            </div>

            {selected.reply && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
                <p className="font-semibold text-xs uppercase mb-1">Réponse envoyée</p>
                <p className="whitespace-pre-wrap">{selected.reply}</p>
                {selected.replied_at && <p className="text-[11px] text-green-600 mt-1">{new Date(selected.replied_at).toLocaleString('fr-FR')}</p>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
