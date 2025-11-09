import { z } from 'zod'

export const Schema = z.object({
    name: z.string()
            .min(1, {message: 'El nombre de la tarea es requerido'})
            .max(140, {message: 'El nombre de la tarea debe de contener como maximo 140 caracteres'}),
    description: z.string()
                    .min(1, {message: 'La descripcion de la tarea es requerida'})        
})