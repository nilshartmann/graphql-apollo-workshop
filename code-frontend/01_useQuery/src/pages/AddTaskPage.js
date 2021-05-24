import { gql, useMutation, useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router";
import { Select, Button } from "../components";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useMemo, useState } from "react";

dayjs.extend(customParseFormat);

const AddTaskPageQuery = gql`
  query AddTaskPageQuery($projectId: ID!) {
    project(id: $projectId) {
      id
      title
    }

    users {
      name
      id
    }
  }
`;

export default function AddTaskPage() {
  const { projectId } = useParams();
  const history = useHistory();

  const { loading, error, data } = useQuery(AddTaskPageQuery, {
    variables: { projectId },
  });

  if (loading) {
    return <h1>Loading!</h1>;
  }

  if (error) {
    console.error("Loading failed", error);
    return <h1>Loading Failed</h1>;
  }

  return (
    <div>
      <header>
        <h1>{data.project.title} - Add new Task</h1>
      </header>
      <AddTaskForm
        projectId={projectId}
        users={data.users}
        onFinish={() => history.push(`/project/${projectId}/tasks`)}
      />
    </div>
  );
}

function parseDate(dateString) {
  if (dateString === "") {
    return "";
  }

  const date = dayjs(dateString, "DD.MM.YYYY");

  if (!date.isValid()) {
    return "";
  }

  return date.toISOString(false);
}

const AddTaskMutation = gql`
  mutation AddTaskMutation($projectId: ID!, $newTask: AddTaskInput!) {
    addTask(projectId: $projectId, input: $newTask) {
      id
    }
  }
`;

function inFourteenDays() {
  const toBeFinishedAt = new Date();
  toBeFinishedAt.setDate(toBeFinishedAt.getDate() + 14);
  return dayjs(toBeFinishedAt).format("DD.MM.YYYY");
}

function AddTaskForm({ projectId, users, onFinish }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [toBeFinishedAt, setToBeFinishedAt] = useState(inFourteenDays);

  const [addTask, { loading }] = useMutation(AddTaskMutation);

  const assignSelectOptions = useMemo(
    () =>
      users.map((u) => ({
        label: u.name,
        value: u.id,
      })),
    [users]
  );

  const buttonDisabled =
    loading ||
    title === "" ||
    description === "" ||
    assigneeId === "" ||
    (toBeFinishedAt !== "" && parseDate(toBeFinishedAt) === "");

  async function handleSave() {
    await addTask({
      variables: {
        projectId,
        newTask: {
          title,
          description,
          toBeFinishedAt: parseDate(toBeFinishedAt),
          assigneeId,
        },
      },
    });

    onFinish();
  }

  return (
    <div className="AddTaskForm">
      <label>
        Name
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label>
        Finish until (DD.MM.YYYY)
        <input
          type="text"
          value={toBeFinishedAt}
          onChange={(e) => setToBeFinishedAt(e.target.value)}
        />
      </label>
      <Select
        label="Assign to"
        value={assigneeId}
        options={assignSelectOptions}
        onNewValue={setAssigneeId}
      />
      <label>
        Description
        <textarea
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
      </label>

      <div className="ButtonBar">
        <Button secondary onClick={() => onFinish()}>
          Cancel
        </Button>
        <Button disabled={buttonDisabled} onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}
