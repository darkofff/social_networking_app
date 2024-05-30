import Main from "../ui/Main";
import { Outlet } from "react-router-dom";

function Friends() {
  return (
    <Main>
      <Outlet />
    </Main>
  );
}

export default Friends;
