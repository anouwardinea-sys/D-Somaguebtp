/**
 * useReveal.js - Hook d'animation au scroll (reveal on scroll)
 *
 * Utilisation :
 *   const { ref, visible } = useReveal();
 *   <div ref={ref} className={`reveal ${visible ? 'reveal-visible' : ''}`}>
 *
 * Repose sur IntersectionObserver (natif, aucune dépendance).
 * Une fois visible, l'élément le reste (pas de va-et-vient).
 */
import { useEffect, useRef, useState } from 'react';

export function useReveal(options = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -40px 0px' } = options;
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    // Éléments déjà dans (ou proches de) la fenêtre au chargement : on les
    // affiche tout de suite, sans animation d'apparition. Cela évite qu'un
    // contenu visible reste masqué si l'observer tarde à se déclencher.
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh * 0.95) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    // Filet de sécurité : si l'observer n'a toujours rien signalé après 1,2 s
    // (élément jamais intersecté, observer bloqué, capture hors écran...),
    // on force l'affichage pour ne jamais laisser une section vide.
    const fallback = setTimeout(() => setVisible(true), 1200);
    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [threshold, rootMargin]);

  return { ref, visible };
}

/**
 * useCountUp - Compteur animé déclenché quand l'élément devient visible.
 *
 * @param {number} target - Valeur cible à atteindre
 * @param {boolean} start - true pour lancer l'animation
 * @param {number} duration - Durée en ms (défaut 1600)
 * @returns {number} Valeur courante arrondie
 */
export function useCountUp(target, start, duration = 1600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      // Easing easeOutCubic pour un ralenti élégant en fin de compteur
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return value;
}

/**
 * Reveal - Wrapper d'animation au scroll (apparition en douceur).
 *
 * Exemples :
 *   <Reveal className="ma-classe" delay={1}>...</Reveal>
 *   <Reveal as={Link} to="/services" delay={2}>...</Reveal>
 *
 * @param {string|Component} as - Élément ou composant à rendre (défaut 'div')
 * @param {number} delay - Délai en cascade : 0, 1, 2 ou 3 (défaut 0)
 */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const { ref, visible } = useReveal();
  const delayClass = delay ? ` reveal-delay-${delay}` : '';
  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? ' reveal-visible' : ''}${delayClass}${className ? ` ${className}` : ''}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
