import { useState } from "react";
import DisplayProfiles from "../features/search/DisplayProfiles";
import ConfirmScreen from "../features/search/ConfirmScreen";

function Search() {
  //initial is true, should be taken form db
  const [displayConfirmScreen, setDisplayConfirmScreen] =
    useState<boolean>(true);
  // context is navbar shown

  if (!displayConfirmScreen) return <DisplayProfiles />;

  return <ConfirmScreen confirm={() => setDisplayConfirmScreen(true)} />;
}

export default Search;
