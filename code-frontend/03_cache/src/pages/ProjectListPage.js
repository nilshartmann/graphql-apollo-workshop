import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const ProjectListPageQuery = gql`
  query ProjectListPageQuery {
    projects {
      id
      title
      owner {
        name
      }
      category {
        name
      }
    }
  }
`;

export default function ProjectListPage() {
  const { loading, error, data } = useQuery(ProjectListPageQuery);

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <>
      <header>
        <h1>All Projects</h1>
      </header>
      <ProjectListTable projects={data.projects} />
    </>
  );
}

function ProjectListTable({ projects }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Owner</th>
          <th>Category</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project.id}>
            <td>{project.title}</td>
            <td>{project.owner.name}</td>
            <td>{project.category.name}</td>
            <td>
              <Link to={`/project/${project.id}/tasks`}>Tasks</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
