import { z } from 'zod'

export const Schema = z.object({
    name: z.string()
                .min(1, {message: 'El nombre del proyecto es requerido'})
                .max(140, {message: 'El nombre de la tarea debe de contener 140 caracteres como maximo'}),
    description: z.string()
                .min(1, {message: 'La descripcion de la tarea no puede ir vacia'})            
})