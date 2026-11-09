/**
 * AdminProperties.jsx — Gestion des biens immobiliers (ajout / édition / suppression).
 *
 * Ce que l'admin ajoute ici est immédiatement visible sur la page publique
 * /domain/immobilier (via le store en mode local, ou via l'API PHP en mode connecté).
 */
import { useEffect, useState } from 'react';
import {
  listProperties, createProperty, updateProperty, removeProperty,
} from '../../admin/adminData';
import { ImageUpload } from './ImageUpload';

const EMPTY = {
  title: '', location: '', price: '',
  offer: 'location', type: 'maison', image: '',
};

const OFFERS = [
  { value: 'location', label: 'Location' },
  { value: 'vente', label: 'Vente' },
];

const TYPES = [
  { value: 'maison', label: 'Maison' },
  { value: 'appartement', label: 'Appartement' },
  { value: 'terrain', label: 'Terrain' },
  { value: 'bureau', label: 'Bureau' },
  { value: 'vehicule', label: 'Véhicule' },
];

export function AdminProperties() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);

  const load = async () => {
    try {
      setItems(await listProperties());
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
        await updateProperty(editingId, form);
        setMsg({ type: 'ok', text: 'Bien modifié.' });
      } else {
        await createProperty(form);
        setMsg({ type: 'ok', text: 'Bien ajouté.' });
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
      title: item.title || '', location: item.location || '', price: item.price || '',
      offer: item.offer || 'location', type: item.type || 'maison', image: item.image || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const remove = async (item) => {
    if (!window.confirm(`Supprimer « ${item.title} » ?`)) return;
    try {
      await removeProperty(item.id);
      await load();
      setMsg({ type: 'ok', text: 'Bien supprimé.' });
    } catch (err) {
      setMsg({ type: 'error', text: err.message });
    }
  };

  const input = 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500';

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_380px] gap-8">
      {/* ===== LISTE ===== */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">{items.length} bien(s) au catalogue</p>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 flex gap-4">
              <div className="w-24 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                {item.image && <img src={item.image} alt={item.title} className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-[2px] text-white ${item.offer === 'vente' ? 'bg-gray-900' : 'bg-primary-600'}`}>
                    {item.offer === 'vente' ? 'Vente' : 'Location'}
                  </span>
                  <span className="text-[11px] text-gray-500 capitalize">{item.type}</span>
                </div>
                <h3 className="font-bold text-gray-900 truncate">{item.title}</h3>
                <p className="text-sm text-gray-500 truncate">{item.location} · {item.price}</p>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                <button onClick={() => startEdit(item)} className="text-xs font-semibold text-primary-600 hover:text-primary-700">Modifier</button>
                <button onClick={() => remove(item)} className="text-xs font-semibold text-red-500 hover:text-red-700">Supprimer</button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-center text-gray-400 py-12 bg-white rounded-xl">Aucun bien pour le moment.</p>
          )}
        </div>
      </div>

      {/* ===== FORMULAIRE ===== */}
      <div className="xl:sticky xl:top-24 h-fit">
        <form onSubmit={submit} className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h2 className="font-bold text-gray-900">{editingId ? 'Modifier le bien' : 'Ajouter un bien'}</h2>

          {msg && (
            <div className={`text-sm rounded-lg px-3 py-2.5 ${msg.type === 'ok' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {msg.text}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Titre *</label>
            <input value={form.title} onChange={onChange('title')} className={input} placeholder="Villa 4 chambres avec cour" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Opération</label>
              <select value={form.offer} onChange={onChange('offer')} className={input}>
                {OFFERS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select value={form.type} onChange={onChange('type')} className={input}>
                {TYPES.map((ty) => <option key={ty.value} value={ty.value}>{ty.label}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
            <input value={form.location} onChange={onChange('location')} className={input} placeholder="Agoè, Lomé" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Prix</label>
            <input value={form.price} onChange={onChange('price')} className={input} placeholder="350 000 F/mois" />
          </div>

          <ImageUpload value={form.image} onChange={(url) => setForm((f) => ({ ...f, image: url }))} label="Photo du bien" />

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={busy} className="flex-1 bg-primary-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50">
              {busy ? 'Enregistrement…' : editingId ? 'Enregistrer' : 'Ajouter'}
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
