import { Switch, Route, Link } from "react-router-dom";
import ProjectListPage from "./pages/ProjectListPage";
import TaskDetailsPage from "./pages/TaskDetailsPage";
import TaskListPage from "./pages/TaskListPage";

function Header() {
  return (
    <header>
      <Link to={"/"}>Personal Project Planning</Link>
    </header>
  );
}

export default function App() {
  return (
    <div className={"ProjectApp"}>
      <Header />
      <main>
        <Switch>
          <Route exact path={"/"}>
            <ProjectListPage />
          </Route>
          <Route exact path={"/project/:projectId/tasks"}>
            <TaskListPage />
          </Route>
          <Route exact path={"/project/:projectId/tasks/:taskId"}>
            <TaskDetailsPage />
          </Route>
          {/* <Route exact path={"/p"} component={ProjectsPageWithoutApollo} />
          <Route exact path={"/project/:projectId/tasks/:taskId"} component={TaskPage} />
          <Route exact path={"/project/:projectId/addtaks"} component={AddTaskPage} /> */}
        </Switch>
      </main>
    </div>
  );
}