-- Shanvi Insurance Services: PI + enquiry backend setup
-- Run once in Supabase SQL Editor.

create table if not exists public.pi_requests (
  id text primary key,
  name text not null,
  email text not null,
  mobile text not null,
  vehicle text not null,
  utr text not null,
  status text not null default 'Received',
  payment_verified boolean not null default false,
  source text not null default 'Public PI Page',
  files jsonb not null default '{}'::jsonb,
  video_link text,
  submitted_at timestamptz not null default now()
);

alter table public.pi_requests enable row level security;

drop policy if exists "Public can submit PI requests" on public.pi_requests;
create policy "Public can submit PI requests"
on public.pi_requests for insert to anon, authenticated
with check (true);

drop policy if exists "Authenticated can view PI requests" on public.pi_requests;
create policy "Authenticated can view PI requests"
on public.pi_requests for select to authenticated
using (true);

insert into storage.buckets (id, name, public)
values ('INSURANCE', 'INSURANCE', true)
on conflict (id) do nothing;

drop policy if exists "Public can upload PI documents" on storage.objects;
create policy "Public can upload PI documents"
on storage.objects for insert to anon, authenticated
with check (bucket_id = 'INSURANCE');

-- The existing INSURANCE bucket is public in this project.
-- For production, consider making it private and using signed URLs for document access.
