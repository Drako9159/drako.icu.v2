import { useEffect, useState } from "react";
import { getUsersList } from "../../api/user";

export default function ListUser() {
  const [users, setUsers] = useState();
  useEffect(() => {
    async function getUsers() {
      const users = await getUsersList();
      console.log(users);
    }
    getUsers()
  });

  return <div style={{ color: "black" }}>lol</div>;
}
