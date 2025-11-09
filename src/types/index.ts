import { z } from 'zod'


export const AuthUserSchemas = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    password: z.string(),
    password_conformation: z.string(),
    role: z.string(),
    is_active: z.boolean()
})

export type AuthUser = z.infer< typeof AuthUserSchemas >
export type RegisterUserFormType = Pick<AuthUser, 'name' | 'email' | 'password' | 'password_conformation'>
export type LoginUserFormType = Pick< AuthUser, 'email' | 'password' >



//#########################
        // profile
//#########################   

export const AuthProfileSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    role: z.string()
})


//#########################
        // projects
//#########################      
export const ProjectsSchema = z.object({
    id: z.number(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string()
})
export type ProjectType = z.infer<typeof ProjectsSchema>;
export type ProjectCreateFormType = Pick< ProjectType, 'projectName' | 'clientName' | 'description' >
export const projectResposeWithSchema = z.array(ProjectsSchema)


//#########################
        // Tasks 
//#########################        
const TasksStatus = z.enum(['pending', 'onHold', 'isProgress', 'underReview', 'complete'])

export const TasksSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    status: TasksStatus,
    project_id: z.number()
})
export type TasksType = z.infer< typeof TasksSchema >
export type TasksCreateFormType = Pick< TasksType, 'name' | 'description'>


//#########################
        // Schemas Relations  Projects and Tasks
//#########################
export const ProjectResponseWithTasks = ProjectsSchema.extend({
    tasks: z.array(TasksSchema)
})












