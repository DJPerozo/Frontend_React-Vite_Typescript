import { isAxiosError } from "axios";
import { TasksSchema, type ProjectType, type TasksCreateFormType, type TasksType } from "../types";
import api from "../lib/axios";


type CreateTasksType = {
  formData: TasksCreateFormType
  project_id: ProjectType['id']
}

export async function Create_tasks( { formData, project_id }: CreateTasksType ) {
  const token = localStorage.getItem('AUTH_TOKEN')
  try {
    
    const url = `/tasks`
    const { data } = await api.post<string>(url, {
      name: formData.name,
      description: formData.description,
      project_id: project_id
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

export async function Get_by_id_task(taskId: TasksType['id']) {
  const token = localStorage.getItem('AUTH_TOKEN')
  try {
    
    const url = `/tasks/${taskId}`
    const { data } = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const response = TasksSchema.safeParse(data)
    if (response.success) {
      return response.data
    }
 
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    } else {
      throw new Error('Error desconocido tasksApi')
    }
  }
}


type UpdateTasksPatchId = {
  taskId: TasksType['id']
  status: string
}
export async function update_tasks_id_patch_( { taskId, status }: UpdateTasksPatchId ) {
  const token = localStorage.getItem('AUTH_TOKEN')
  try {
    
    const url = `/tasks/${taskId}`
    const { data } = await api.patch<string>(url, {
      status: status
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return data

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    } else{
      throw new Error('Error desconocido')
    }
  }
}

type UpdateTasks = {
  taskId: TasksType['id']
  formData: TasksCreateFormType
}
export async function Update_tasks( { taskId, formData }: UpdateTasks ) {
  const token = localStorage.getItem('AUTH_TOKEN')
  try {

    const url = `/tasks/${taskId}`
    const { data } = await api.put<string>(url, {
      name: formData.name,
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
    } else {
      throw new Error('Error desconocido')
    }
  }
}


export async function Delete_tasks(taskId: TasksType['id']) {
  const token = localStorage.getItem('AUTH_TOKEN')
  try {
    
    const url = `/tasks/${taskId}`
    const { data } = await api.delete<string>(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    
    return data

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    } else {
      throw new Error('error desconocido')
    }
  }
}

