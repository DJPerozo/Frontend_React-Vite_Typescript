import { isAxiosError } from "axios";
import { AuthProfileSchema, type LoginUserFormType, type RegisterUserFormType } from "../types";
import api from "../lib/axios";


export async function Register_user(formData: RegisterUserFormType) {
  try {

    const url = `/auth/register`
    const { data } = await api.post<string>(url, {
      name: formData.name,
      email: formData.email,
      password: formData.password
    })

    return data
        
  } catch (error) {
      if(isAxiosError(error) && error.response) {
        throw new Error(error.response.data.detail)
      }
    }
}

export async function Login_user( formData: LoginUserFormType ) {
  try {

    const url = `auth/login`

    const params = new URLSearchParams()
    params.append('username', formData.email)
    params.append('password', formData.password)

    const { data } = await api.post<string>(url,params , {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })

    localStorage.setItem('AUTH_TOKEN', data)
    
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.detail)
    }
  }
}

export async function Profile_user() {
  const token = localStorage.getItem('AUTH_TOKEN')
  try {

    const url = `/auth/profile`
    const { data } = await api.get(url, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })

    const response = AuthProfileSchema.safeParse(data)
    if (response.success) {
      return response.data
    }
    
    
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.detail)
    }
  }
}