/**
 * Admin.jsx — Point d'entrée de l'espace admin (/admin).
 *
 * ⚠️ SÉPARÉ DU SITE PUBLIC : cette page n'utilise NI le Header, NI le Footer,
 * NI le bouton WhatsApp du site public (voir App.jsx : route hors <Layout>).
 *
 * Rôle : vérifier la session, puis afficher soit l'écran de connexion,
 * soit le tableau de bord.
 */
import { useEffect, useState } from "react";
import { getSession, onAuthChange } from "../admin/adminAuth";
import { AdminLogin } from "./admin/AdminLogin";
import { AdminDashboard } from "./admin/AdminDashboard";

export function Admin() {
  const [session, setSession] = useState(undefined); // undefined = en cours de vérification

  useEffect(() => {
    let alive = true;
    getSession().then((s) => {
      if (alive) setSession(s);
    });
    const off = onAuthChange((s) => {
      if (alive) setSession(s);
    });
    return () => {
      alive = false;
      off();
    };
  }, []);

  // Pendant la vérification, on n'affiche rien (évite un flash login/dashboard).
  if (session === undefined) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session)
    return <AdminLogin onSuccess={() => setSession({ mode: "local" })} />;
  return <AdminDashboard onLogout={() => setSession(null)} />;
}
