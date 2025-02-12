import { createClient } from "@supabase/supabase-js";

// Load variables from .env
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export default supabase;
