-- ============================================================================
--  MIGRATION : table `messages` (messagerie visiteur → admin)
--  À exécuter dans l'éditeur SQL de Supabase APRÈS schema.sql.
-- ============================================================================
--  • Le visiteur ANONYME peut INSÉRER un message (formulaire / newsletter).
--  • Seul un admin CONNECTÉ peut LIRE / MODIFIER / SUPPRIMER.
--  • Le champ `status` suit le cycle : unread → read → replied.
-- ============================================================================

create table if not exists public.messages (
  id          uuid primary key default gen_random_uuid(),
  name        text        not null,
  email       text,
  phone       text,
  branch      text,                       -- architecture | ingenierie | immobilier | transit | topographie | newsletter
  message     text        not null,
  status      text        not null default 'unread',   -- unread | read | replied
  reply       text,                        -- réponse rédigée par l'admin
  replied_at  timestamptz,                 -- date d'envoi de la réponse
  created_at  timestamptz not null default now()
);

alter table public.messages enable row level security;

-- Insertion publique (le visiteur qui remplit le formulaire).
drop policy if exists "messages_insert_public" on public.messages;
create policy "messages_insert_public"
  on public.messages for insert
  to anon, authenticated
  with check (true);

-- Lecture réservée aux admins connectés.
drop policy if exists "messages_select_admin" on public.messages;
create policy "messages_select_admin"
  on public.messages for select
  to authenticated
  using (true);

-- Modification (statut / réponse) réservée aux admins.
drop policy if exists "messages_update_admin" on public.messages;
create policy "messages_update_admin"
  on public.messages for update
  to authenticated
  using (true) with check (true);

-- Suppression réservée aux admins.
drop policy if exists "messages_delete_admin" on public.messages;
create policy "messages_delete_admin"
  on public.messages for delete
  to authenticated
  using (true);
