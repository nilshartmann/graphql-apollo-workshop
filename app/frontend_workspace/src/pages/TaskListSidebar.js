/* eslint-disable */
import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { Button } from "../components";

const TaskListSidebarQuery = gql`
  query TaskListSidebarQuery($projectId: ID!) {
    project(id: $projectId) {
      id
      tasks {
        id
        title
        state
      }
    }
  }
`;

export default function TaskListSidebar() {
  const { projectId, taskId } = useParams();
  const { loading, data, error, refetch } = useQuery(TaskListSidebarQuery, {
    variables: {
      projectId,
    },
  });

  if (loading || error) {
    return null;
  }

  function handleRefresh() {
    refetch();
  }

  return (
    <div className="TaskListSidebar">
      <header>
        <h1>Tasks</h1>
        {/* <Button onClick={handleRefresh}>Refresh</Button> */}
      </header>
      {data.project.tasks.map((task) => (
        <div
          key={task.id}
          className={task.id === taskId ? "Task Active" : "Task"}
        >
          <Link to={`/project/${projectId}/tasks/${task.id}`}>
            {task.id} <b>{task.title}</b> ({task.state})
          </Link>
        </div>
      ))}
    </div>
  );
}
