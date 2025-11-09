import { z } from 'zod'


export const Schema = z.object({
    projectName: z.string()
                .min(1, {message: 'El nombre no puede ir vacia'})
                .max(140, {message: 'El nombre del proyecto debe de contener como maximo 140 caracteres'}),
    clientName: z.string()
                .min(1, {message: 'El nombre del cliente es requerido'})
                .max(140, {message: 'El nombre del cliente debe de contener como maximo 140 caracteres'}),
    description: z.string()
                .min(1, {message: 'La descripcion es requerida'})               
})