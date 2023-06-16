import z from 'zod'
import i18next from 'i18next';

export const classSchema = z.object({
  name: z.string({
    required_error: i18next.t('zodErrors.Name is required')
  }).min(1, i18next.t('zodErrors.Name must be at least 1 character long')).max(25, i18next.t('zodErrors.Name must be less than 25 characters long')),
})

export const studentSchema = z.object({
  email: z.string().email(i18next.t("zodErrors.Not a valid email")),
  alias: z.string().min(1, i18next.t("zodErrors.Alias must be at least 1 character long")).max(25, i18next.t("zodErrors.Alias must be less than 25 characters long"))
})

export const taskSchema = z.object({
  title: z.string().min(1, i18next.t("zodErrors.Title must be at least 1 character long")).max(25, i18next.t("zodErrors.Title must be less than 25 characters long")),
  description: z.string().min(1, i18next.t("zodErrors.Description must be at least 1 character long")).max(140, i18next.t("zodErrors.Description must be less than 140 characters long"))
})

const userTypes = z.enum(['STUDENT', 'TEACHER'])

export type UserTypes = z.infer<typeof userTypes>

export const registerUserSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: i18next.t('zodErrors.Name is required')
    }).min(1, i18next.t('zodErrors.Name must be at least 1 character long')).max(20, i18next.t('zodErrors.Name must be less than 20 characters long')),
    email: z.string({
      required_error: i18next.t('zodErrors.Email is required')
    }).email(i18next.t("zodErrors.Not a valid email")),
    password: z.string({
      required_error: i18next.t('zodErrors.Password is required')
    }).min(6, i18next.t('zodErrors.Password must be at least 6 characters long')).max(100, i18next.t('zodErrors.Password must be less than 100 characters long')),
    passwordConfirmation: z.string({
      required_error: i18next.t('zodErrors.Password confirmation is required')
    }),
    type: userTypes,
  }).refine(data => data.password === data.passwordConfirmation, {
    message: i18next.t('zodErrors.Passwords do not match')
  })
})

export const loginUserSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: i18next.t('zodErrors.Email is required')
    }).email(i18next.t("zodErrors.Not a valid email")),
    password: z.string({
      required_error: i18next.t('zodErrors.Password is required')
    }).min(6, i18next.t('zodErrors.Password must be at least 6 characters long')).max(100, i18next.t('zodErrors.Password must be less than 100 characters long')),
  })
})

export type RegisterUserInput = z.infer<typeof registerUserSchema>['body']

export type LoginUserInput = z.infer<typeof loginUserSchema>['body']

export type CreateClassInput = z.infer<typeof classSchema>

export type AddStudentToClassInput = z.infer<typeof studentSchema>

export type CreateTaskInput = z.infer<typeof taskSchema>