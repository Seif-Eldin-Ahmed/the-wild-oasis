import supabase from "../services/supabase";

export const isDemoMode = import.meta.env.VITE_DEMO_MODE === "true";

export async function isDemoVisitor() {
  if (!isDemoMode) return false;

  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return !data.session;
}

export async function rejectDemoMutation() {
  if (await isDemoVisitor()) {
    throw new Error("Changes are disabled in the public demo.");
  }
}
