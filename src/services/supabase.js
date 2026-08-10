// import { createClient } from "@supabase/supabase-js";

// export const supabaseUrl =
//   "https://jcxzeioeysjytndryoxm.supabase.co";
// const supabaseKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjeHplaW9leXNqeXRuZHJ5b3htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4OTI3NDksImV4cCI6MjEwMDQ2ODc0OX0.UfFkdKW8H1M5dLYqU0oAJ7uXPq2QM7XWqmooRPkuHWQ";
// const supabase = createClient(supabaseUrl, supabaseKey);

// export default supabase;

import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env
  .VITE_SUPABASE_URL;

const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
