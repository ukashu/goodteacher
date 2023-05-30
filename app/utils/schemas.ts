import z from 'zod'

export const classSchema = z.object({
  name: z.string({
    required_error: 'Name is required'
  }).min(1, 'Name must be at least 1 character long').max(25, 'Name must be less than 25 characters long'),
})

export const studentSchema = z.object({
  email: z.string().email("Not a valid email"),
  alias: z.string().min(1, "Alias must be at least 1 character long").max(25, "Alias must be at most 25 characters long")
})

export const taskSchema = z.object({
  title: z.string().min(1, "Title must be at least 1 character long").max(25, "Title must be at most 25 characters long"),
  description: z.string().min(1, "Description must be at least 1 character long").max(140, "Description must be at most 140 characters long")
})

export type CreateClassInput = z.infer<typeof classSchema>

export type AddStudentToClassInput = z.infer<typeof studentSchema>

export type CreateTaskInput = z.infer<typeof taskSchema>