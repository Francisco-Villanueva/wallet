import { useContext } from "react";
import { UserContext } from "../redux/context/user.jsx";

export function useUsers() {
  const context = useContext(UserContext);
  return context;
}
 