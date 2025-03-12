import vine from '@vinejs/vine'

const loginUserValidator = vine.compile(
  vine.object({
    username: vine.string().minLength(3),
    userpassword: vine.string(), // No validation here, just passing it through
  })
)

const registerUserValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .trim()
      .minLength(3)
      .maxLength(30)
      .unique({ table: 't_user', column: 'username' }),

    // Update the fields to match the correct case (userPassword and confirmUserPassword)
    userPassword: vine.string().optional(),
    confirmUserPassword: vine.string().optional(),
  })
)


export { loginUserValidator, registerUserValidator }
