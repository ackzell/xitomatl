import { z } from 'zod/v4';

const DESCRIPTION_MAX_LENGTH = 256;

export const taskSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().max(DESCRIPTION_MAX_LENGTH).optional()
})

export type Task = z.infer<typeof taskSchema>;