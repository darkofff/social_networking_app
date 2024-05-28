import { Outlet } from "react-router-dom";
import Main from "../ui/Main";

function Friends() {
  return (
    <Main>
      <Outlet />
    </Main>
  );
}

export default Friends;
