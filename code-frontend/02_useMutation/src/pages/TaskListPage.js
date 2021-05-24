import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, LoadingIndicator } from "../components";

const TaskListPageQuery = gql`
  query TaskListPageQuery($projectId: ID!) {
    project(id: $projectId) {
      title
      id
      owner {
        id
      }
      tasks {
        id
        title
        assignee {
          id
          name
        }
        state
      }
    }
  }
`;

export default function TaskListPage() {
  const { projectId } = useParams();
  const history = useHistory();

  const { loading, error, data, refetch } = useQuery(TaskListPageQuery, {
    variables: { projectId },
  });

  if (loading) {
    return <LoadingIndicator>Loading Tasks...</LoadingIndicator>;
  }
  if (error) {
    return <h2>Sorry... Something failed while loading data </h2>;
  }

  if (!data.project) {
    return <h2>Project not found!</h2>;
  }

  return (
    <div className="TaskListPage">
      <header>
        <h1>
          <Link to="/">All Projects</Link> &gt; {data.project.title} Tasks
        </h1>
      </header>
      <TasksTable projectId={projectId} tasks={data.project.tasks} />
      <div className="ButtonBar">
        <Button onClick={() => history.push(`/project/${projectId}/addtaks`)}>
          Add new Task
        </Button>
      </div>
    </div>
  );
}

function TasksTable({ projectId, tasks }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Assignee</th>
          <th>State</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => {
          return (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.assignee.name}</td>
              <td>{task.state}</td>
              <td>
                <Link to={`/project/${projectId}/tasks/${task.id}`}>
                  Details
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const QuickAddTaskMutation = gql`
  mutation QuickAddTaskMutation(
    $projectId: ID!
    $assigneeId: ID!
    $description: String!
    $title: String!
  ) {
    newTask: addTask(
      projectId: $projectId
      input: {
        assigneeId: $assigneeId
        description: $description
        title: $title
      }
    ) {
      id
      state
      title
      description
    }
  }
`;

function QuickAddTaskForm({ projectId, assigneeId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [
    addTask,
    { loading: mutationRunning, error: addError, data: newTaskData, called },
  ] = useMutation(QuickAddTaskMutation);

  async function handleAdd() {
    const result = await addTask({
      variables: {
        projectId,
        assigneeId,
        description,
        title,
      },
    });

    if (result.data) {
      setTitle("");
      setDescription("");
    }
  }

  const inputEmpty = !title && !description;

  return (
    <div className="QuickAddTaskForm">
      <div className="Form">
        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>

        <label>
          Description
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <Button
          tertiary
          onClick={handleAdd}
          disabled={inputEmpty || mutationRunning}
        >
          Add
        </Button>
      </div>
      <div className="Msg">
        {addError && "Fehler!"}
        {called &&
          !addError &&
          inputEmpty &&
          `Task ${newTaskData.newTask.id} added!`}
      </div>
    </div>
  );
}
