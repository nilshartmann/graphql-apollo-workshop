/* eslint-disable */
import { gql } from "@apollo/client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components";

export default function UserListPage() {
  const [selectedUserId, setSelectedUserId] = useState("");

  return (
    <div>
      <header>
        <h1>User List</h1>
      </header>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      {selectedUserId && <UserDetails userId={selectedUserId} />}
      <Link to="/users/add">Add User</Link>
    </div>
  );
}

function UserDetails({ userId }) {}
