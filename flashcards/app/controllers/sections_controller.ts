import { HttpContext } from '@adonisjs/core/http'
import Section from '#models/section'
import Teacher from '#models/teacher'

export default class SectionsController {
  public async index({ view }: HttpContext) {
    const sections = await Section.query().preload('teachers')
    return view.render('pages/home', { sections })
  }

  public async create({ view }: HttpContext) {
    const teachers = await Teacher.all()
    return view.render('sections/create', { teachers })
  }

  public async store({ request, session, response }: HttpContext) {
    const payload = await request.validate({
      schema: {
        name: 'string|required|min:3|max:100',
        description: 'string|max:255',
        teacherIds: 'array',
      },
    })

    try {
      const section = await Section.create({ name: payload.name, description: payload.description })

      if (payload.teacherIds?.length) {
        await section.related('teachers').attach(payload.teacherIds)
      }

      session.flash('success', 'Section created successfully!')
      return response.redirect().toRoute('sections.index')
    } catch (error) {
      session.flash('error', 'Failed to create section.')
      return response.redirect().back()
    }
  }

  public async navigateTeacher({ params, view, request }: HttpContext) {
    const section = await Section.query()
      .where('id', params.id)
      .preload('teachers')
      .firstOrFail()

    const teachers = section.teachers
    const currentIndex = parseInt(request.input('teacherIndex', '0'), 10)

    const nextIndex = Math.min(currentIndex + 1, teachers.length - 1)
    const prevIndex = Math.max(currentIndex - 1, 0)

    return view.render('sections/show', {
      section,
      currentTeacher: teachers[currentIndex] ?? null,
      currentTeacherIndex: currentIndex,
      teachers,
      nextTeacherIndex: nextIndex,
      prevTeacherIndex: prevIndex,
    })
  }

  public async show({ params, view }: HttpContext) {
    const section = await Section.query()
      .where('id', params.sectionId)
      .preload('teachers')
      .firstOrFail()

    const teachers = section.teachers
    const teacherIndex = parseInt(params.teacherIndex, 10)
    const currentTeacher = teachers[teacherIndex] ?? null

    return view.render('sections/show', {
      section,
      currentTeacher,
      nextTeacherIndex: Math.min(teacherIndex + 1, teachers.length - 1),
      prevTeacherIndex: Math.max(teacherIndex - 1, 0),
      teachers,
      teacherIndex,
    })
  }

  public async edit({ params, view }: HttpContext) {
    const section = await Section.findOrFail(params.id)
    const teachers = await Teacher.all()
    return view.render('sections/edit', { section, teachers })
  }

  public async update({ params, request, session, response }: HttpContext) {
    const section = await Section.findOrFail(params.id)
    const payload = await request.validate({
      schema: {
        name: 'string|required|min:3|max:100',
        description: 'string|max:255',
        teacherIds: 'array',
      },
    })

    section.merge({ name: payload.name, description: payload.description })
    await section.save()

    if (payload.teacherIds?.length) {
      await section.related('teachers').sync(payload.teacherIds)
    }

    session.flash('success', 'Section updated successfully!')
    return response.redirect().toRoute('sections.index')
  }

  public async destroy({ params, session, response }: HttpContext) {
    const section = await Section.findOrFail(params.id)
    await section.delete()

    session.flash('success', 'Section deleted successfully!')
    return response.redirect().toRoute('sections.index')
  }
}
