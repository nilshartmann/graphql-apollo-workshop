import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";

const TaskListPageQuery = gql`
  query TaskListPageQuery($projectId: ID!) {
    project(id: $projectId) {
      title
      id
      tasks {
        id
        title
        assignee {
          name
        }
        state
      }
    }
  }
`;

export default function TaskListPage() {
  const { projectId } = useParams();

  const { loading, error, data } = useQuery(TaskListPageQuery, {
    fetchPolicy: "cache-and-network",
    variables: { projectId },
  });

  console.log("HUCH", loading, error, data);

  if (loading) {
    return <h2>Loading...</h2>;
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
      <TasksTable projectId={data.project.id} tasks={data.project.tasks} />
      {/* <Button onClick={e => navigator.openAddTaskPage(projectId)} icon={ChevronRight}>
          Add Task
        </Button>
      </div> */}
    </div>
  );
}

function TasksTable({ projectId, tasks }) {
  return (
    <table>
      <thead>
        <tr>
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
