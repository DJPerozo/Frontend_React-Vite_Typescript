import { isAxiosError } from "axios";
import api from "../lib/axios";
import { ProjectResponseWithTasks, projectResposeWithSchema, ProjectsSchema, type ProjectCreateFormType, type ProjectType } from "../types";


export async function Create_project( formData: ProjectCreateFormType ) {
    const token = localStorage.getItem('AUTH_TOKEN')
    try {
      
    const url = `/projects`
    const { data } = await api.post<string>(url, {
      projectName: formData.projectName,
      clientName: formData.clientName,
      description: formData.description
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return data

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}


export async function Get_all_project() {
  const token = localStorage.getItem('AUTH_TOKEN')
  try {
    const url = `/projects/with-tasks`
    const { data } = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const response = projectResposeWithSchema.safeParse(data)
    if (response.success) {
      return response.data
    }

  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}


export async function Get_by_id_projects(id: ProjectType['id']) {
  const token = localStorage.getItem('AUTH_TOKEN')
  try {
    
    const url = `/projects/${id}`
    const { data } = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const responde = ProjectsSchema.safeParse(data);
    if (responde.success) {
      return responde.data
    }

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}


type UpdateType = {
  projectId: ProjectType['id']
  formData: ProjectCreateFormType
}

export async function Update_projects( { projectId, formData }: UpdateType ) {
  const token = localStorage.getItem('AUTH_TOKEN')
  try {
    
    const url = `/projects/${projectId}`
    const { data } = await api.put<string>(url, {
      projectName: formData.projectName,
      clientName: formData.clientName,
      description: formData.description
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return data

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}


export async function Delete_project(projectId: ProjectType['id']) {
  const token = localStorage.getItem('AUTH_TOKEN')
  try {

    const url = `/projects/${projectId}`
    const { data } = await api.delete<string>(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return data

    
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

//#################
      //Project_with_tasks
//#################



export async function Get_project_id_with_tasks(projectId: ProjectType['id']) {
  const token = localStorage.getItem('AUTH_TOKEN')
  try {

    const url = `/projects/${projectId}/with-tasks`
    const { data } = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const response = ProjectResponseWithTasks.safeParse(data)
    if (response.success) {
      return response.data
    }
    
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
