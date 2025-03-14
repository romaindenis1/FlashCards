import vine from '@vinejs/vine'

const loginUserValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .trim()
      .minLength(3)
      .maxLength(30), // You can also add maxLength here if needed

    userpassword: vine.string().minLength(6), // You can adjust the password length requirement as needed
  })
);

const registerUserValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .trim()
      .minLength(3)
      .maxLength(30)
      .unique({ table: 't_user', column: 'username' }),

    userpassword: vine.string().minLength(6), 
    confirmUserPassword: vine.string().minLength(6),
  })
)

export { loginUserValidator, registerUserValidator }
