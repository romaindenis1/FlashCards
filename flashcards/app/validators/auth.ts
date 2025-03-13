import vine from '@vinejs/vine'

const loginUserValidator = vine.compile(
  vine.object({
    username: vine.string().minLength(3),
    userpassword: vine.string(),
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

    userPassword: vine.string().minLength(6), 
    confirmUserPassword: vine.string().minLength(6),
  })
)

export { loginUserValidator, registerUserValidator }
