/**
 * ImageUpload.jsx — Champ de téléversement d'image réutilisable.
 *
 * Affiche un aperçu de l'image courante et permet de :
 *  • téléverser un fichier depuis l'ordinateur,
 *  • OU coller une URL d'image directement.
 *
 * La valeur renvoyée est toujours une URL (dossier /uploads de l'hébergement
 * en mode connecté, data URL en mode local).
 */
import { useRef, useState } from 'react';
import { uploadImage } from '../../admin/adminData';

export function ImageUpload({ value, onChange, label = 'Photo' }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Aperçu */}
        <div className="w-full sm:w-40 h-28 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0 flex items-center justify-center">
          {value ? (
            <img src={value} alt="Aperçu" className="w-full h-full object-cover" />
          ) : (
            <span className="text-xs text-gray-400">Aucune image</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors disabled:opacity-50"
            >
              {busy ? 'Téléversement…' : 'Choisir une image'}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="px-4 py-2 rounded-lg text-sm font-semibold border border-gray-300 text-gray-600 hover:border-red-400 hover:text-red-600 transition-colors"
              >
                Retirer
              </button>
            )}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />

          <input
            type="url"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="…ou coller une URL d’image"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />

          {error && <p className="text-xs text-red-600">{error}</p>}
          <p className="text-xs text-gray-400">JPG/PNG/WEBP, 5 Mo maximum.</p>
        </div>
      </div>
    </div>
  );
}
