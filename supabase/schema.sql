-- ============================================================================
--  D. SOMAGUE INGÃƒÆ’Ã¢â‚¬Â°NIERIE ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â SchÃƒÆ’Ã‚Â©ma Supabase de l'espace admin
-- ============================================================================
--  COMMENT L'EXÃƒÆ’Ã¢â‚¬Â°CUTER (une seule fois) :
--   1. Ouvrir votre projet sur https://supabase.com
--   2. Menu de gauche ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Ãƒâ€šÃ‚Â« SQL Editor Ãƒâ€šÃ‚Â» ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Ãƒâ€šÃ‚Â« New query Ãƒâ€šÃ‚Â»
--   3. Coller TOUT le contenu de ce fichier, puis cliquer Ãƒâ€šÃ‚Â« Run Ãƒâ€šÃ‚Â»
--
--  Ce script crÃƒÆ’Ã‚Â©e :
--   ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ la table `properties` (biens immobiliers)
--   ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ la table `news`       (actualitÃƒÆ’Ã‚Â©s)
--   ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ les rÃƒÆ’Ã‚Â¨gles de sÃƒÆ’Ã‚Â©curitÃƒÆ’Ã‚Â© (RLS) : lecture publique, ÃƒÆ’Ã‚Â©criture rÃƒÆ’Ã‚Â©servÃƒÆ’Ã‚Â©e
--     aux utilisateurs connectÃƒÆ’Ã‚Â©s (vos admins)
--   ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ le bucket de stockage Ãƒâ€šÃ‚Â« media Ãƒâ€šÃ‚Â» pour les photos
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. BIENS IMMOBILIERS
-- ---------------------------------------------------------------------------
create table if not exists public.properties (
  id          uuid primary key default gen_random_uuid(),
  title       text        not null,
  location    text,
  price       text,
  offer       text        not null default 'location',  -- 'location' | 'vente'
  type        text        not null default 'maison',    -- maison, terrain, vehicule...
  image       text,
  created_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 2. ACTUALITÃƒÆ’Ã¢â‚¬Â°S
-- ---------------------------------------------------------------------------
create table if not exists public.news (
  id          uuid primary key default gen_random_uuid(),
  title       text        not null,
  category    text,
  date        date        not null default current_date,
  excerpt     text,
  body        text,
  image       text,
  created_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 3. SÃƒÆ’Ã¢â‚¬Â°CURITÃƒÆ’Ã¢â‚¬Â° (RLS ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Row Level Security)
--    Principe : TOUT LE MONDE peut LIRE le site public ;
--               SEULS LES ADMINS CONNECTÃƒÆ’Ã¢â‚¬Â°S peuvent AJOUTER / MODIFIER / SUPPRIMER.
-- ---------------------------------------------------------------------------
alter table public.properties enable row level security;
alter table public.news       enable row level security;

-- --- Biens immobiliers ---
drop policy if exists "properties_lecture_publique" on public.properties;
create policy "properties_lecture_publique"
  on public.properties for select
  using (true);

drop policy if exists "properties_ecriture_admin" on public.properties;
create policy "properties_ecriture_admin"
  on public.properties for all
  to authenticated
  using (true) with check (true);

-- --- ActualitÃƒÆ’Ã‚Â©s ---
drop policy if exists "news_lecture_publique" on public.news;
create policy "news_lecture_publique"
  on public.news for select
  using (true);

drop policy if exists "news_ecriture_admin" on public.news;
create policy "news_ecriture_admin"
  on public.news for all
  to authenticated
  using (true) with check (true);

-- ---------------------------------------------------------------------------
-- 4. STOCKAGE DES IMAGES (bucket Ãƒâ€šÃ‚Â« media Ãƒâ€šÃ‚Â»)
--    Les photos sont lisibles par tous, mais seul un admin connectÃƒÆ’Ã‚Â© peut
--    en tÃƒÆ’Ã‚Â©lÃƒÆ’Ã‚Â©verser ou en supprimer.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media_lecture_publique" on storage.objects;
create policy "media_lecture_publique"
  on storage.objects for select
  using (bucket_id = 'media');

drop policy if exists "media_upload_admin" on storage.objects;
create policy "media_upload_admin"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media');

drop policy if exists "media_modif_admin" on storage.objects;
create policy "media_modif_admin"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media');

drop policy if exists "media_suppr_admin" on storage.objects;
create policy "media_suppr_admin"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media');

-- ---------------------------------------------------------------------------
-- 5. (OPTIONNEL) Quelques biens de dÃƒÆ’Ã‚Â©monstration
--    Supprimez ce bloc si vous ne voulez pas d'exemples.
-- ---------------------------------------------------------------------------
insert into public.properties (title, location, price, offer, type, image) values
  ('Villa 4 chambres avec cour', 'AgoÃƒÆ’Ã‚Â¨, LomÃƒÆ’Ã‚Â©',    '350 000 F/mois',   'location', 'maison',      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'),
  ('Terrain titrÃƒÆ’Ã‚Â© 500 mÃƒâ€šÃ‚Â²',       'AgoÃƒÆ’Ã‚Â¨-NyivÃƒÆ’Ã‚Â©',    '18 000 000 F',     'vente',    'terrain',     'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'),
  ('Pick-up 4x4 utilitaire',     'LomÃƒÆ’Ã‚Â©',          '45 000 F/jour',    'location', 'vehicule',    'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80')
on conflict do nothing;

insert into public.news (title, category, date, excerpt, body, image) values
  ('Livraison d''une villa R+1 ÃƒÆ’Ã‚Â  AgoÃƒÆ’Ã‚Â¨', 'Chantier', current_date,
   'D-SOMAGUE INGÃƒÆ’Ã¢â‚¬Â°NIERIE a livrÃƒÆ’Ã‚Â© une villa R+1 de 4 chambres ÃƒÆ’Ã‚Â  AgoÃƒÆ’Ã‚Â¨.',
   'AprÃƒÆ’Ã‚Â¨s six mois de travaux, notre pÃƒÆ’Ã‚Â´le IngÃƒÆ’Ã‚Â©nierie & BTP a livrÃƒÆ’Ã‚Â© une villa R+1 ÃƒÆ’Ã‚Â  AgoÃƒÆ’Ã‚Â¨ (LomÃƒÆ’Ã‚Â©). Le client a reÃƒÆ’Ã‚Â§u le procÃƒÆ’Ã‚Â¨s-verbal de rÃƒÆ’Ã‚Â©ception et le dossier des plans d''exÃƒÆ’Ã‚Â©cution.',
   'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80')
on conflict do nothing;
