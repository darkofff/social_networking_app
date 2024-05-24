import { GetUsername } from "../features/search/searchTypes";
import { supabase } from "./supabaseClient";

export async function getProfiles() {
  console.log("im in getProfilesApi");
  let { data: profiles, error } = await supabase.from("profiles").select("*");
  if (error) throw new Error("Couldn' load users ");

  return profiles;
}

export async function getUsername({ index, currentUserUsername }: GetUsername) {
  const { data, error } = (await supabase
    .from("profiles")
    .select("username")
    .not("username", "eq", currentUserUsername) // Exclude users own profile
    .order("id", { ascending: true })
    .range(index, index)) as any;

  if (error) throw new Error("Couldn't fetch new profile");

  const currentUsername = data.at(0).username;

  return { currentUsername, index };
}

interface GetProfileProps {
  username: string | undefined;
}

export async function getProfile({ username }: GetProfileProps) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username);

  if (error) throw new Error("Couldn't fetch user data");

  return data.at(0);
}

// IDEAS ON HOW TO SOLVE THIS DATA FETCHING

/* 
    get total number of records
    select one at random 
    save both values 
    fetch profile of selected index
    prefetch next one 
    
  */

/* 
  get total number of records
  start with first one
  fetch 10 usernames    
    - excluse username = username
  set 1 username as searchParam
  based on search params fetch user data 

  const totalNumberOfUsers()
  fetchNames()

*/

/* 
---fetching---
  #rename it later
  useFetchData() {
    const totalNumberOfProfiles :state
    const tenProfileUsernamesArray :state
    const currentIndex :state
    const howManyFetches - same as number of collected usernames /10

    function nextProfile(){
      current index+=1
      if index = 10{
        fetchNewData
      }
    }

    return {currentProfileUsername}
  }

---DisplayProfiles---
  onClick(()=>nextProfile())

  nextProfile(){
    setSearchParams({name: currentProfileUsername.name})
  }

  profileData = [] :state

  useEffect(()=>{
    mutateProfileData
  },[searchParams])



*/
