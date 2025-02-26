import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Deck from '#models/deck'
import Flashcard from '#models/flashcard'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    // Create a sample user
    const user = await User.create({
      password: 'password123',
      username: 'sampleuser',
    })

    // Create sample decks
    const deck1 = await Deck.create({
      title: 'Math',
      description: 'Simple math questions',
      user_id: user.id,
    })

    const deck2 = await Deck.create({
      title: 'Geography',
      description: 'Geography questions',
      user_id: user.id,
    })

    // Create sample flashcards for deck 1
    await Flashcard.createMany([
      { question: 'What is 2+2?', answer: '4', deck_id: deck1.id },
      { question: 'What is 3+5?', answer: '8', deck_id: deck1.id },
    ])

    // Create sample flashcards for deck 2
    await Flashcard.createMany([
      { question: 'What is the capital of France?', answer: 'Paris', deck_id: deck2.id },
      {
        question: 'What is the largest ocean on Earth?',
        answer: 'Pacific Ocean',
        deck_id: deck2.id,
      },
    ])
  }
}
