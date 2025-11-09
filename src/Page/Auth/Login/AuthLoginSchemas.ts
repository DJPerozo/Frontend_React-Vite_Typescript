import { z } from 'zod'

export const Schema = z.object({
    email: z.string()
            .min(1, {message: 'El email no puede ir vacio'})
            .email({message: 'El email no es valido'}),
    password: z.string()
                .min(1, {message: 'Es password no puede ir vacio'})        
})