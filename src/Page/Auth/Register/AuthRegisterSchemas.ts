import { z } from 'zod'

export const Schema = z.object({
    name: z.string()
            .min(1, {message: 'El nombre es requerido'})
            .max(99, {message: 'El nombre debe de contener como maximo 99 caracteres'}),
    email: z.string()
            .min(1, {message: 'El email es requerido'})
            .email({message: 'El email no es valido'}),
    password: z.string()
                .min(8, {message: 'El password es muy corto minimo 8 caracteres'}),
    password_conformation: z.string()            
}).refine((data) => data.password === data.password_conformation, {
    message: 'Los password no son iguales',
    path: ['password_conformation']
})