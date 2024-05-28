import { useParams } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";
import ChatTop from "./ChatTop";
import ChatContent from "./ChatContent";
import ChatInput from "./ChatInput";

function Chat() {
  const { username } = useParams();

  const { profile, isPending } = useProfile(username as string);

  if (isPending) return <p>Loading...</p>;

  const { name, last_name, profile_pic, username: aliasUsername } = profile;
  return (
    <div className="flex h-dvh flex-col overflow-hidden  md:rounded-lg">
      <ChatTop
        name={name}
        last_name={last_name}
        profile_pic={profile_pic}
        username={aliasUsername}
      />
      <ChatContent />

      <ChatInput />
    </div>
  );
}

export default Chat;
