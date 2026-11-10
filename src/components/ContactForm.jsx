import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { SITE, waUrlForBranch } from '../config';
import { createMessage } from '../admin/adminMessages';
import { isApiAvailable } from '../admin/apiClient';

export function ContactForm() {
  const { t } = useLanguage();
  const cf = t.contactForm;
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', branch: '', message: '', attachment: null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const branchValues = ['architecture', 'ingenierie', 'immobilier', 'transit', 'topographie'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    const { name, phone, email, branch, message } = formData;
    try {
      if (await isApiAvailable()) {
        // En ligne, l'API enregistre le message et envoie les e-mails via SMTP.
        await createMessage({ name, phone, email, branch, message });
      } else if (SITE.formEndpoint) {
        await createMessage({ name, phone, email, branch, message });
        const r = await fetch(SITE.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name, phone, email, branch, message }),
        });
        if (!r.ok) throw new Error('send');
      } else {
        await createMessage({ name, phone, email, branch, message });
        const text = `Demande de devis - ${name}\nTél : ${phone}\nEmail : ${email}\nDomaine : ${branch || '-'}\n\n${message}`;
        window.open(waUrlForBranch(branch, text), '_blank', 'noopener');
      }
      setIsSuccess(true);
      setFormData({ name: '', phone: '', email: '', branch: '', message: '', attachment: null });
    } catch (err) {
      setError(err.message || cf.errSend);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{cf.successTitle}</h3>
        <p className="text-gray-600">{cf.successText}</p>
        <button onClick={() => setIsSuccess(false)} className="mt-6 text-primary-600 font-semibold hover:text-primary-700">{cf.sendAnother}</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{cf.name}</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder={cf.namePh} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{cf.phone}</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder={cf.phonePh} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{cf.email}</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder={cf.emailPh} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{cf.branch}</label>
        <select name="branch" value={formData.branch} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
          <option value="">{cf.branchPh}</option>
          {cf.branches.map((b, i) => (<option key={branchValues[i]} value={branchValues[i]}>{b}</option>))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{cf.message}</label>
        <textarea name="message" value={formData.message} onChange={handleChange} required rows="5" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none" placeholder={cf.messagePh} />
      </div>
      <button type="submit" disabled={isSubmitting} className="w-full bg-primary-600 text-white py-3 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
        {isSubmitting ? cf.sending : cf.submit}
      </button>
      <p className="text-xs text-gray-500">{cf.privacy}</p>
    </form>
  );
}
