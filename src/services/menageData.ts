import { UpdateProfileData } from "../types/UpdateProfileData";
import { supabase } from "./supabaseClient";

/* 
  For menaging user data but not auth
*/

interface Data extends UpdateProfileData {
  user_id: string;
}
interface DataOptional extends UpdateProfileData {
  user_id?: string;
}

export async function updateProfileData(formData: Data) {
  const user_id = formData.user_id;
  const updateObj: DataOptional = formData;
  delete updateObj.user_id;

  const { data, error } = await supabase
    .from("users")
    .update(updateObj)
    .eq("user_id", user_id)
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function getProfileData() {
  console.log("god plz not");
  let { data, error } = await supabase.from("users").select("*");
  if (error) throw new Error(error.message);
  const profileData = data?.at(0);

  return profileData;
}
