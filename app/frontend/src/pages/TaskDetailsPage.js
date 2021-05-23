import { useQuery, gql, useMutation } from "@apollo/client";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Card, InfoCard } from "../components";

const TaskDetailsPageQuery = gql`
  query TaskDetailsPageQuery($projectId: ID!, $taskId: ID!) {
    project(id: $projectId) {
      id
      title
      task(id: $taskId) {
        id
        title
        description
        assignee {
          name
        }
        toBeFinishedAt
        state
      }
    }
  }
`;

const UpdateTaskStateMutation = gql`
  mutation UpdateTaskStateMutation($taskId: ID!, $newState: TaskState!) {
    updateTaskState(taskId: $taskId, newState: $newState) {
      id
      state
    }
  }
`;
export default function TaskDetailsPage() {
  const { projectId, taskId } = useParams();
  const { loading, error, data } = useQuery(TaskDetailsPageQuery, {
    variables: { projectId, taskId },
  });

  const [updateTaskState] = useMutation(UpdateTaskStateMutation);

  function handleUpdateTaskState(newState) {
    updateTaskState({
      variables: {
        taskId,
        newState,
      },
    });
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error || !data) {
    return <h2>Sorry... Something failed while loading data </h2>;
  }

  if (!data.project) {
    return <h2>Project not found!</h2>;
  }

  const projectListLink = <Link to="/">All Projects</Link>;
  const titleLink = (
    <Link to={`/project/${data.project.id}/tasks`}>{data.project.title}</Link>
  );

  return (
    <div className="TaskPage">
      <header>
        <h1>
          {projectListLink} &gt; {titleLink} &gt; {data.project.task?.title}
        </h1>
      </header>
      {data.project.task ? (
        <TaskView
          task={data.project.task}
          onTaskStateChange={handleUpdateTaskState}
        />
      ) : (
        <h2>Task cannot be found</h2>
      )}
    </div>
  );
}

function TaskView({ task, onTaskStateChange }) {
  const finishedUntil = new Date(Date.parse(task.toBeFinishedAt));
  const finishedUntilString = finishedUntil.toLocaleDateString(); // LfinishedUntil.format("MMM D, YYYY");

  const actions = [
    {
      label: "Start",
      onExecute: () => onTaskStateChange("RUNNING"),
    },
    {
      label: "Stop",
      onExecute: () => onTaskStateChange("FINISHED"),
    },
  ];

  return (
    <>
      <div className="Cardboard TaskStateCardboard">
        <InfoCard label="To be finished until" title={finishedUntilString} />
        <InfoCard label={"Assignee"} title={task.assignee.name} />
        <InfoCard label="State" title={task.state} actions={actions} />
      </div>

      <h1>Description</h1>
      <Card>{task.description}</Card>
    </>
  );
}
