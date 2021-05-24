/* eslint-disable */
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

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
    </div>
  );
}

function UserDetails({ userId }) {}
