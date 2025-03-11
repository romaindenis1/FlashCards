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
    const { name, description, teacherIds } = request.only(['name', 'description', 'teacherIds'])

    const section = await Section.create({ name, description })
    if (teacherIds) {
      await section.related('teachers').attach(teacherIds)
    }

    session.flash('success', 'Section created successfully!')
    return response.redirect().toRoute('sections.index')
  }

  public async navigateTeacher({ params, view, request }: HttpContext) {
    const section = await Section.query()
      .where('id', params.id)
      .preload('teachers') // Preload all teachers for the section
      .firstOrFail()

    const currentTeacherIndex = parseInt(request.input('teacherIndex', '0')) // Get the teacher index from the query parameters
    const teachers = section.teachers

    // Get the next or previous teacher based on the navigation
    let nextTeacherIndex = currentTeacherIndex
    if (request.input('direction') === 'next') {
      nextTeacherIndex =
        currentTeacherIndex + 1 < teachers.length ? currentTeacherIndex + 1 : currentTeacherIndex
    } else if (request.input('direction') === 'previous') {
      nextTeacherIndex =
        currentTeacherIndex - 1 >= 0 ? currentTeacherIndex - 1 : currentTeacherIndex
    }

    const currentTeacher = teachers[nextTeacherIndex]

    return view.render('sections/show', {
      section,
      currentTeacher,
      currentTeacherIndex: nextTeacherIndex,
      teachers,
    })
  }
  public async show({ params, view }: HttpContext) {
    // Get the section by ID
    const section = await Section.query()
      .where('id', params.sectionId)
      .preload('teachers') // Preload teachers related to the section
      .firstOrFail()

    // Get the teacher index
    const teacherIndex = parseInt(params.teacherIndex, 10)
    const teachers = section.teachers

    // Get the current teacher (first teacher or based on index)
    const currentTeacher = teachers[teacherIndex] || null

    // Get the next and previous teacher indices
    const nextTeacherIndex = teacherIndex + 1 < teachers.length ? teacherIndex + 1 : teacherIndex
    const prevTeacherIndex = teacherIndex > 0 ? teacherIndex - 1 : teacherIndex

    return view.render('sections/show', {
      section,
      currentTeacher,
      nextTeacherIndex,
      prevTeacherIndex,
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
    const { name, description, teacherIds } = request.only(['name', 'description', 'teacherIds'])

    section.name = name
    section.description = description
    await section.save()

    if (teacherIds) {
      await section.related('teachers').sync(teacherIds)
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
