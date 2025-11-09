import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./Layouts/DashboardLayout/DashboardLayout";
import DashboardPage from "./Page/Dashboard/Home/DashboardPage";
import CreateProjectPage from "./Page/Projects/CreateProject/CreateProjectPage";
import UpdateProjectPage from "./Page/Projects/UpdateProject/UpdateProjectPage";
import NotFoundPage from "./Page/404/NotFoundPage";
import ProjectDetailsPage from "./Page/Projects/ProjectDetailsPage/ProjectDetailsPage";
import CreateTasksPage from "./Page/tasks/CreateTasks/CreateTasksPage";
import UpdateTasksPage from "./Page/tasks/UpdateTasks/UpdateTasksPage";
import AuthLayout from "./Layouts/Auth/AuthLayout";
import AuthRegisterPage from "./Page/Auth/Register/AuthRegisterPage";
import AuthLoginPage from "./Page/Auth/Login/AuthLoginPage";


export default function Routers() {
  return (
    <>
        <BrowserRouter>
          <Routes>

            <Route element={<AuthLayout />} >
              <Route path="/auth/register" element={<AuthRegisterPage />} />
              <Route path="/auth/login" element={<AuthLoginPage />} />
            </Route>


            <Route element={<DashboardLayout />} >
              <Route path="/" index element={<DashboardPage />}  />
              <Route path="/create-project" element={<CreateProjectPage />} />
              <Route path="/update-project/:projectId" element={<UpdateProjectPage />} />
              <Route path="/project-details/:project_id" element={<ProjectDetailsPage />} />

              <Route path="/Create-tasks" element={<CreateTasksPage />} />
              <Route path="/update-tasks/:taskId" element={<UpdateTasksPage />} />
            </Route>


            <Route path="/404" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
    </>
  )
}
