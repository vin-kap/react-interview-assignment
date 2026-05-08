import React, { useEffect, useMemo, useState } from "react";
import { getUsers} from "../service/userService";
import { User } from "../types/user";
const Users = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [searchEmail, setSearchEmail] = useState<string>("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getUsers(page);
      setUsers(data);
    } catch (error) {
      setError("Failed to fetch users");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.email.toLowerCase().includes(searchEmail.toLowerCase())
    );
  }, [users, searchEmail]);

  if (loading) {
    return <h2>the emails are loading</h2>;
  }
  if (error) {
    return <h2>{error}</h2>;
  }
  return (
    <div style={{ padding: "20px" }}>
      <h1>Users List</h1>
      <input
        type="text"
        placeholder="Search by email"
        value={searchEmail}
        onChange={(e) => setSearchEmail(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
        }}
      />
      <table
        border={1}
        cellPadding={10}
        cellSpacing={0}
        width="100%"
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No Users Found</td>
            </tr>
          )}
        </tbody>
      </table>
      
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>

        <span>Page: {page}</span>

        <button onClick={() => setPage((prev) => prev + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};
export default Users;
