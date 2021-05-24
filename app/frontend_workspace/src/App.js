/* eslint-disable */
import { Switch, Route, Link } from "react-router-dom";
import AddTaskPage from "./pages/AddTaskPage";
import { AddUserPage } from "./pages/AddUserPage";
import ProjectListPage from "./pages/ProjectListPage";
import TaskDetailsPage from "./pages/TaskDetailsPage";
import TaskListPage from "./pages/TaskListPage";
import TaskListSidebar from "./pages/TaskListSidebar";
import UserListPage from "./pages/UserListPage";

function Header() {
  return (
    <header>
      <Link to={"/"}>Personal Project Planning</Link>
      <Link to={"/users"}>User List</Link>
    </header>
  );
}

export default function App() {
  return (
    <div className={"ProjectApp"}>
      <Header />
      <div className="Layout">
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
            <Route exact path="/project/:projectId/addtaks">
              <AddTaskPage />
            </Route>
            <Route exact path="/users">
              <UserListPage />
            </Route>
            <Route exact path="/users/add">
              <AddUserPage />
            </Route>
          </Switch>
        </main>
        {/* <aside>
          <Route path={"/project/:projectId/(tasks)?/:taskId"}>
            <TaskListSidebar />
          </Route>
        </aside> */}
      </div>
      <footer>Apollo GraphQL Workshop</footer>
    </div>
  );
}
