import { supabase } from "../services/supabaseClient";
import Button from "../ui/Button";

function LogCurrentSession() {
  async function curSes() {
    const { data, error } = await supabase.auth.getSession();

    console.log(data);
    if (error) console.error(error);
  }
  return (
    <div>
      <Button callback={curSes}>Log Current Session</Button>
    </div>
  );
}

export default LogCurrentSession;
