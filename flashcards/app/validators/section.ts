import vine from '@vinejs/vine'

export default class SectionValidator {
  public static createOrUpdateSchema = vine.compile(
    vine.object({
      name: vine.string().trim().minLength(3).maxLength(100),
      description: vine.string().optional().maxLength(255),
      teacherIds: vine.array(vine.number()).optional(),
    })
  )
}