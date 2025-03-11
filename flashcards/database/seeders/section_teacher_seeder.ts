import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { Database } from '@adonisjs/lucid/database'

export default class SectionTeacherSeeder extends BaseSeeder {
  public async run() {
    // Simulate section and teacher IDs (this data can be replaced with actual data)
    const sections = Array.from({ length: 6 }, (_, i) => ({ id: i + 1 })) // Simulating section IDs (1 to 6)
    const teachers = Array.from({ length: 25 }, (_, i) => ({ id: i + 1 })) // Simulating teacher IDs (1 to 25)

    // Prepare the data to insert (10 random relationships)
    const sectionTeacherData = []

    // Randomly pick 10 relationships from available sections and teachers
    for (let i = 0; i < 10; i++) {
      const randomSection = sections[Math.floor(Math.random() * sections.length)]
      const randomTeacher = teachers[Math.floor(Math.random() * teachers.length)]

      sectionTeacherData.push({
        section_id: randomSection.id,
        teacher_id: randomTeacher.id,
      })
    }

    // Insert the data into the section_teacher table using Database.from()
    if (sectionTeacherData.length > 0) {
      try {
        await Database.from('section_teacher').insert(sectionTeacherData)
        console.log('Data inserted into section_teacher table successfully.')
      } catch (error) {
        console.error('Error during seeding:', error)
      }
    } else {
      console.log('No relationships created.')
    }
  }
}

//TEMP
/*
INSERT INTO section_teacher (section_id, teacher_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(1, 7),
(2, 8),
(3, 9),
(4, 10),
(5, 11),
(6, 12),
(1, 13),
(2, 14),
(3, 15),
(4, 16),
(5, 17),
(6, 18),
(1, 19),
(2, 20),
(3, 21),
(4, 22),
(5, 23),
(6, 24),
(1, 25);
*/
