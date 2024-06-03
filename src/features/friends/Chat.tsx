import { useParams } from "react-router-dom";
import { useProfileData } from "../../contexts/ProfileDataContext";
import { useGetProfileByUsername } from "../../hooks/useGetProfileByUsername";
import { ProfileData } from "../../types/ProfileData";

import ChatTop from "./ChatTop";
import ChatContent from "./ChatContent";
import ChatInput from "./ChatInput";
import { useConversationId } from "./hooks/useConversationId";
import { useState } from "react";

function Chat() {
  const {
    profileData: { username: currentUsername },
  } = useProfileData();

  const { username } = useParams();

  const { profileData, isPending } = useGetProfileByUsername(
    username as string, // this assertion is correct because this page is displayed ony when username param is set
  );

  const [isInputExpanded, setIsInputExpanded] = useState<boolean>(false);

  const { conversation_id, isPending: isPendingConversationId } =
    useConversationId({
      username_1: currentUsername,
      username_2: username as string, // same as above
    });

  if (isPending || isPendingConversationId) return <p>Loading...</p>;

  const {
    name,
    last_name,
    profile_pic,
    username: aliasUsername,
  } = profileData as ProfileData; // assertion is correct because !isPending

  return (
    <div className="flex h-dvh flex-col overflow-hidden  md:rounded-lg">
      <ChatTop
        name={name}
        last_name={last_name}
        profile_pic={profile_pic}
        username={aliasUsername}
      />
      <ChatContent
        username={aliasUsername}
        currentUsername={currentUsername}
        conversation_id={conversation_id}
        profile_pic={profile_pic}
        isInputExpanded={isInputExpanded}
      />

      <ChatInput
        username={aliasUsername}
        currentUsername={currentUsername}
        conversation_id={conversation_id}
        isInputExpanded={isInputExpanded}
        setIsInputExpanded={setIsInputExpanded}
      />
    </div>
  );
}

export default Chat;
