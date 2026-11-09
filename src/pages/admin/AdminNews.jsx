/**
 * AdminNews.jsx — Gestion des actualités (ajout / édition / suppression).
 *
 * Ce que l'admin publie ici apparaît sur la page publique /actualites.
 */
import { useEffect, useState } from 'react';
import { listNews, createNews, updateNews, removeNews } from '../../admin/adminData';
import { ImageUpload } from './ImageUpload';

const EMPTY = {
  title: '', category: 'Chantier', date: new Date().toISOString().slice(0, 10),
  excerpt: '', body: '', image: '',
};

const CATEGORIES = ['Chantier', 'Immobilier', 'Transit', 'Topographie', 'Architecture', 'Entreprise'];

export function AdminNews() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);

  const load = async () => {
    try {
      setItems(await listNews());
    } catch (e) {
      setMsg({ type: 'error', text: e.message });
    }
  };

  useEffect(() => { load(); }, []);

  const onChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const resetForm = () => { setForm(EMPTY); setEditingId(null); };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { setMsg({ type: 'error', text: 'Le titre est obligatoire.' }); return; }
    setBusy(true);
    setMsg(null);
    try {
      if (editingId) {
        await updateNews(editingId, form);
        setMsg({ type: 'ok', text: 'Actualité modifiée.' });
      } else {
        await createNews(form);
        setMsg({ type: 'ok', text: 'Actualité publiée.' });
      }
      resetForm();
      await load();
    } catch (err) {
      setMsg({ type: 'error', text: err.message });
    } finally {
      setBusy(false);
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title || '', category: item.category || 'Chantier',
      date: (item.date || '').slice(0, 10), excerpt: item.excerpt || '',
      body: item.body || '', image: item.image || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const remove = async (item) => {
    if (!window.confirm(`Supprimer « ${item.title} » ?`)) return;
    try {
      await removeNews(item.id);
      await load();
      setMsg({ type: 'ok', text: 'Actualité supprimée.' });
    } catch (err) {
      setMsg({ type: 'error', text: err.message });
    }
  };

  const input = 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500';

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_420px] gap-8">
      {/* ===== LISTE ===== */}
      <div className="space-y-3">
        <p className="text-sm text-gray-500 mb-4">{items.length} actualité(s) publiée(s)</p>

        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 flex gap-4">
            <div className="w-24 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              {item.image && <img src={item.image} alt={item.title} className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-[2px] text-white bg-primary-600">{item.category}</span>
                <span className="text-[11px] text-gray-500">{(item.date || '').slice(0, 10)}</span>
              </div>
              <h3 className="font-bold text-gray-900 truncate">{item.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{item.excerpt}</p>
            </div>
            <div className="flex flex-col gap-2 flex-shrink-0">
              <button onClick={() => startEdit(item)} className="text-xs font-semibold text-primary-600 hover:text-primary-700">Modifier</button>
              <button onClick={() => remove(item)} className="text-xs font-semibold text-red-500 hover:text-red-700">Supprimer</button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-center text-gray-400 py-12 bg-white rounded-xl">Aucune actualité pour le moment.</p>
        )}
      </div>

      {/* ===== FORMULAIRE ===== */}
      <div className="xl:sticky xl:top-24 h-fit">
        <form onSubmit={submit} className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h2 className="font-bold text-gray-900">{editingId ? 'Modifier l’actualité' : 'Publier une actualité'}</h2>

          {msg && (
            <div className={`text-sm rounded-lg px-3 py-2.5 ${msg.type === 'ok' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {msg.text}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Titre *</label>
            <input value={form.title} onChange={onChange('title')} className={input} placeholder="Livraison d’une villa R+1 à Agoè" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
              <select value={form.category} onChange={onChange('category')} className={input}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input type="date" value={form.date} onChange={onChange('date')} className={input} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Résumé (chapô)</label>
            <textarea value={form.excerpt} onChange={onChange('excerpt')} rows="2" className={`${input} resize-none`} placeholder="Une phrase qui résume l’article." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contenu</label>
            <textarea value={form.body} onChange={onChange('body')} rows="6" className={`${input} resize-y`} placeholder="Le texte de l’article. Séparez les paragraphes par une ligne vide." />
          </div>

          <ImageUpload value={form.image} onChange={(url) => setForm((f) => ({ ...f, image: url }))} label="Image de l’article" />

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={busy} className="flex-1 bg-primary-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50">
              {busy ? 'Enregistrement…' : editingId ? 'Enregistrer' : 'Publier'}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="px-4 py-2.5 rounded-lg text-sm font-semibold border border-gray-300 text-gray-600 hover:bg-gray-50">
                Annuler
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
