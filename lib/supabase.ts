import { createClient } from "@supabase/supabase-js";

export function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url) throw new Error("Missing env: NEXT_PUBLIC_SUPABASE_URL");
  if (!key) throw new Error("Missing env: SUPABASE_SERVICE_KEY");
  return createClient(url, key, { auth: { persistSession: false } });
}

export function getPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url) throw new Error("Missing env: NEXT_PUBLIC_SUPABASE_URL");
  if (!key) throw new Error("Missing env: NEXT_PUBLIC_SUPABASE_ANON_KEY");
  return createClient(url, key);
}

export type StudioLeadStatus = "new" | "in_progress" | "done";

export interface StudioLead {
  id: string;
  created_at: string;
  service_type: "website" | "motion";
  domeniu: string;
  // Website
  are_website: boolean | null;
  website_link: string | null;
  scopuri: string[] | null;
  stil: string | null;
  buget: string | null;
  // Motion
  scop_video: string[] | null;
  footage_existent: string | null;
  footage_link: string | null;
  vibe: string | null;
  culori_brand: string | null;
  // Contact
  nume_afacere: string;
  nume: string;
  email: string | null;
  whatsapp: string | null;
  status: StudioLeadStatus;
}
