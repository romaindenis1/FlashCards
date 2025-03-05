import Section from '#models/section'
import Teacher from '#models/teacher'
import { loginUserValidator, registerUserValidator } from '#validators/auth'
import { teacherValidator } from '#validators/teacher'
import type { HttpContext } from '@adonisjs/core/http'

export default class TeachersController {
  /**
   * Afficher la liste des enseignants
   */
  async index({ view }: HttpContext) {
    // Récupérer la liste des enseignants triés par ordre alphabétique sur le nom
    const teachers = await Teacher.query().orderBy('lastname', 'asc')

    // Appel de la vue
    return view.render('pages/home', { teachers })
  }

  /**
   * Afficher le formulaire pour créer un nouvel enseignant
   */
  async create({ view }: HttpContext) {
    // Appel de la vue
    return view.render('pages/teachers/create', { title: "Ajout d'un enseignant" })
  }

  /**
   * Gérer la soumission du formulaire pour la création d'un enseignant
   */
  async store({ request, session, response }: HttpContext) {
    // Validation des données saisies par l'utilisateur
    const { lastname, nickname, origine } = await request.validate(teacherValidator)

    // Création du nouvel enseignant
    await Teacher.create({ lastname, nickname, origine })

    // Afficher un message à l'utilisateur
    session.flash('success', 'Le nouvel enseignant a été ajouté avec succès !')

    // Rediriger vers la homepage
    return response.redirect().toRoute('home')
  }

  /**
   * Afficher les détails d'un enseignant (y compris le nom de sa section)
   */
  async show({ params, view }: HttpContext) {
    // Sélectionner l'enseignant dont on veut afficher les détails
    // On veut également pouvoir afficher la section de l'enseignant
    const teacher = await Teacher.findOrFail(params.id)

    // Afficher la vue
    return view.render('pages/teachers/show', { title: "Détail d'un enseignant", teacher })
  }

  /**
   * Afficher le formulaire permettant la mise à jour d'un enseignant
   */
  async edit({ params, view }: HttpContext) {
    // Sélectionner l'enseignant dont on veut mettre à jour des informations
    const teacher = await Teacher.findOrFail(params.id)

    // Récupération des sections triées par le nom
    const sections = await Section.query().orderBy('name', 'asc')

    // Afficher la vue
    return view.render('pages/teachers/edit', {
      title: 'Modifier un enseignant',
      teacher,
      sections,
    })
  }

  /**
   * Gérer la soumission du formulaire pour la mise à jour d'un enseignant
   */
  async update({ params, request, session, response }: HttpContext) {
    // Validation des données saisies par l'utilisateur
    const { lastname, nickname, origine } = await request.validate(teacherValidator)

    // Sélectionner l'enseignant dont on veut mettre à jour des informations
    const teacher = await Teacher.findOrFail(params.id)

    // Si un enseignant correspond à l'id
    if (teacher) {
      // Met à jour les infos de l'enseignant
      await teacher.merge({ lastname, nickname, origine }).save()
    }

    // Afficher un message à l'utilisateur
    session.flash('success', "L'enseignant a été mis à jour avec succès !")

    // Redirige l'utilisateur sur la home
    return response.redirect().toRoute('home')
  }

  /**
   * Supprimer un enseignant
   */
  async destroy({ params, session, response }: HttpContext) {
    // Sélectionne l'enseignant à supprimer
    const teacher = await Teacher.findOrFail(params.id)

    // Supprime l'enseignant
    await teacher.delete()

    // Afficher un message à l'utilisateur
    session.flash('success', "L'enseignant a été supprimé avec succès !")

    // Redirige l'utilisateur sur la home
    return response.redirect().toRoute('home')
  }
}
