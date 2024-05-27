import { supabase } from "./supabaseClient";

import { CreateAccData } from "../types/CreateAccData";
import { LoginData } from "../types/LoginData";
import { RegisterData } from "../types/RegisterData";

export async function loginWithPassword({ email, password }: LoginData) {
  // Login user and return user obj
  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error.message);
    throw new Error("Couldn't log in");
  }

  // Is account registered
  const is_registration_complete = await isUserRegistered();

  return {
    is_registration_complete,
    ...user,
  };
}

export async function signup({ email, password }: CreateAccData) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  // Is user logged in?
  const { data: dataAuth, error } = await supabase.auth.getSession();
  if (error) {
    throw new Error(error.message);
    console.error(error?.message);
  }

  // If not return null
  if (!dataAuth.session) return null;

  // If user is logged in return user obj
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // This should't happen except maybe in case when user deleted account
  if (!user) {
    // !!! HANDLE THIS EXCEPTION !!!
    return user;
  }

  // Is account registered
  const is_registration_complete = await isUserRegistered();

  return {
    is_registration_complete,
    ...user,
  };
}

interface RegisterProps extends RegisterData {
  user_id: string;
}

export async function registerAccount({
  name,
  last_name,
  username,
  user_id,
}: RegisterProps) {
  // Insert additional data to users row
  const { data: dataRegister, error: errorRegister } = await supabase
    .from("users")
    .update({ name, last_name, username })
    .eq("user_id", user_id)
    .select();

  if (errorRegister) {
    console.error(errorRegister.message);
    throw new Error("Couldn't register user");
  }

  // If added correctly confirm that user is registered
  const { data: dataConfirm, error: errorConfirm } = await supabase
    .from("users")
    .update({ is_registration_complete: true })
    .eq("user_id", user_id)
    .select();

  if (errorConfirm) {
    console.error(errorConfirm.message);
    throw new Error("Couldn't register user");
  }

  return "Success";
}

// Suplemantory Api call that checks whether user registered account. This means that user added name, last_name and nickname
async function isUserRegistered() {
  let { data: dataPublic, error: errorPublic } = (await supabase
    .from("users")
    .select("is_registration_complete")) as any;

  if (errorPublic) {
    console.error(errorPublic.message);
    throw new Error("");
  }
  const is_registration_complete = dataPublic?.at(0).is_registration_complete;
  return is_registration_complete;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();

  if (error) throw new Error("Couldn't logout");
}
