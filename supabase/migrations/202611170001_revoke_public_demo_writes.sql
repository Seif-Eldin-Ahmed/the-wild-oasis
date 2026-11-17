-- Public demo mode reads bundled synthetic fixtures and does not need database
-- write access. This revokes direct writes from anonymous and PUBLIC roles while
-- leaving authenticated grants and all existing RLS policies unchanged.
REVOKE INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER
ON TABLE public.bookings, public.guests, public.cabins, public.settings
FROM anon, PUBLIC;

-- Prevent anonymous uploads, replacements, and deletes in Supabase Storage.
REVOKE INSERT, UPDATE, DELETE
ON TABLE storage.objects
FROM anon, PUBLIC;
