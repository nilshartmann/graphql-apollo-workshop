/* eslint-disable */
import { gql } from "@apollo/client";
import { useState } from "react";
import { Button } from "../components";

export function AddUserPage() {
  const [login, setLogin] = useState("");
  const [name, setName] = useState("");

  function handleAdd() {}
  return (
    <>
      <header>
        <h1>Add User</h1>
      </header>
      <div className="QuickAddTaskForm">
        <div className="Form">
          <label>
            Login
            <input value={login} onChange={(e) => setLogin(e.target.value)} />
          </label>

          <label>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>

          <Button onClick={handleAdd}>Add</Button>
        </div>
      </div>
    </>
  );
}
