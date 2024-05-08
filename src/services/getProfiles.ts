import { supabase } from "./supabaseClient";

export async function getProfiles() {
  console.log("im in getProfilesApi");
  let { data: profiles, error } = await supabase.from("profiles").select("*");
  if (error) throw new Error("Couldn' load users ");

  return profiles;
}
