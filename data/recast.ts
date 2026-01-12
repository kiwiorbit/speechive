
import { Activity } from '../types';

export const RECAST_ACTIVITY_POOL: Activity[] = [
  {
    id: 'rec-pool-1',
    title: 'Mealtimes & Snacks',
    image: '/public/images/activities/recast/mealtimes.webp',
    description: "Recast requests and comments during meals into questions.",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Child Says One Word → You add one or more words and rephrase that into a question format',
        dialogue: [
          { speaker: 'Child', line: 'Plate' }, { speaker: 'Parent', line: 'Do you want the plate?' },
          { speaker: 'Child', line: 'Rice' }, { speaker: 'Parent', line: 'Is the rice hot?' },
          { speaker: 'Child', line: 'Spoon' }, { speaker: 'Parent', line: 'Do you want the big spoon?' },
          { speaker: 'Child', line: 'Water' }, { speaker: 'Parent', line: 'Is the water cold?' },
          { speaker: 'Child', line: 'Cracker' }, { speaker: 'Parent', line: 'Is that your cracker?' },
          { speaker: 'Child', line: 'Sauce' }, { speaker: 'Parent', line: 'Is it sweet sauce?' },
          { speaker: 'Child', line: 'Hot' }, { speaker: 'Parent', line: 'Is the food hot?' },
          { speaker: 'Child', line: 'Messy' }, { speaker: 'Parent', line: 'Are your hands messy?' },
          { speaker: 'Child', line: 'Spill' }, { speaker: 'Parent', line: 'Did the milk spill?' }
        ]
      },
      {
        title: 'Child Says Two Words → You add one or more words and rephrase that into a question format',
        dialogue: [
          { speaker: 'Child', line: 'Eat apple' }, { speaker: 'Parent', line: 'Are you eating an apple?' },
          { speaker: 'Child', line: 'Eat banana' }, { speaker: 'Parent', line: 'Are you eating a yellow banana?' },
          { speaker: 'Child', line: 'Drink milk' }, { speaker: 'Parent', line: 'Are you drinking milk from a cup?' },
          { speaker: 'Child', line: 'Cold milk' }, { speaker: 'Parent', line: 'Do you want cold milk?' },
          { speaker: 'Child', line: 'Eat breakfast' }, { speaker: 'Parent', line: 'Are you eating breakfast now?' },
          { speaker: 'Child', line: 'Big apple' }, { speaker: 'Parent', line: 'Is that a big apple?' },
          { speaker: 'Child', line: 'Yummy food' }, { speaker: 'Parent', line: 'Is the food yummy?' },
          { speaker: 'Child', line: 'Done food' }, { speaker: 'Parent', line: 'Are you all done with your food?' },
          { speaker: 'Child', line: 'Table clean' }, { speaker: 'Parent', line: 'Should we wipe the table clean?' },
          { speaker: 'Child', line: 'Chair push' }, { speaker: 'Parent', line: 'Are you pushing the chair in?' }
        ]
      }
    ]
  },
  {
    id: 'rec-pool-2',
    title: 'Bath Time',
    image: '/public/images/activities/recast/bathtime.webp',
    description: "Recast actions and feelings during bath time into questions.",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Child Says One Word → You add one or more words and rephrase that into a question format',
        dialogue: [
          { speaker: 'Child', line: 'Hands' }, { speaker: 'Parent', line: 'Should we wash hands?' },
          { speaker: 'Child', line: 'Hair' }, { speaker: 'Parent', line: 'Is your hair wet?' },
          { speaker: 'Child', line: 'Eyes' }, { speaker: 'Parent', line: 'Can you close your eyes?' },
          { speaker: 'Child', line: 'Tummy' }, { speaker: 'Parent', line: 'Shall we wash your tummy?' },
          { speaker: 'Child', line: 'Pour' }, { speaker: 'Parent', line: 'Shall I pour water?' },
          { speaker: 'Child', line: 'Splash' }, { speaker: 'Parent', line: 'Did you make a big splash?' },
          { speaker: 'Child', line: 'Wet' }, { speaker: 'Parent', line: 'Are your hands wet?' },
          { speaker: 'Child', line: 'Cold' }, { speaker: 'Parent', line: 'Is the water cold?' },
          { speaker: 'Child', line: 'Hot / cold' }, { speaker: 'Parent', line: 'Is it too hot or too cold?' },
          { speaker: 'Child', line: 'Bubbles' }, { speaker: 'Parent', line: 'Do you see bubbles?' }
        ]
      },
      {
        title: 'Child Says Two Words → You add one or more words and rephrase that into a question format',
        dialogue: [
          { speaker: 'Child', line: 'Fun bath' }, { speaker: 'Parent', line: 'Is the bath fun?' },
          { speaker: 'Child', line: 'More bubbles' }, { speaker: 'Parent', line: 'Do you want more bubbles?' },
          { speaker: 'Child', line: 'Soft bubbles' }, { speaker: 'Parent', line: 'Do the bubbles feel soft?' },
          { speaker: 'Child', line: 'Bath done' }, { speaker: 'Parent', line: 'Is the bath done?' },
          { speaker: 'Child', line: 'Dry towel' }, { speaker: 'Parent', line: 'Is the towel dry?' },
          { speaker: 'Child', line: 'Cold air' }, { speaker: 'Parent', line: 'Does the air feel cold?' },
          { speaker: 'Child', line: 'Warm pyjamas' }, { speaker: 'Parent', line: 'Do the pyjamas feel warm?' },
          { speaker: 'Child', line: 'Water splash' }, { speaker: 'Parent', line: 'Did the water splash?' },
          { speaker: 'Child', line: 'Duck swim' }, { speaker: 'Parent', line: 'Is the duck swimming?' },
          { speaker: 'Child', line: 'Wet hair' }, { speaker: 'Parent', line: 'Is your hair wet?' }
        ]
      }
    ]
  },
  {
    id: 'rec-pool-3',
    title: 'Morning or Bedtime',
    image: '/public/images/activities/recast/dressing.webp',
    description: "Recast during dressing or bedtime routines into questions.",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Child Says One Word → You add one or more words and rephrase that into a question format',
        dialogue: [
          { speaker: 'Child', line: 'Shirt' }, { speaker: 'Parent', line: 'Is it a blue shirt?' },
          { speaker: 'Child', line: 'Socks' }, { speaker: 'Parent', line: 'Are they red socks?' },
          { speaker: 'Child', line: 'Hat' }, { speaker: 'Parent', line: 'Is it a warm hat?' },
          { speaker: 'Child', line: 'Pants' }, { speaker: 'Parent', line: 'Are they your favourite pants?' },
          { speaker: 'Child', line: 'Hands' }, { speaker: 'Parent', line: 'Are your hands clean?' },
          { speaker: 'Child', line: 'Shoes' }, { speaker: 'Parent', line: 'Are they big shoes?' },
          { speaker: 'Child', line: 'Shirt' }, { speaker: 'Parent', line: 'Do you want to put on the shirt?' },
          { speaker: 'Child', line: 'Button' }, { speaker: 'Parent', line: 'Is it the button on the shirt?' },
          { speaker: 'Child', line: 'Zip' }, { speaker: 'Parent', line: 'Is it the zip?' },
          { speaker: 'Child', line: 'Done' }, { speaker: 'Parent', line: 'Are you all done?' },
          { speaker: 'Child', line: 'Help' }, { speaker: 'Parent', line: 'Do you need help?' }
        ]
      },
      {
        title: 'Child Says Two Words → You add one or more words and rephrase that into a question format',
        dialogue: [
          { speaker: 'Child', line: 'Wake up' }, { speaker: 'Parent', line: 'Is it time to wake up?' },
          { speaker: 'Child', line: 'Bright sun' }, { speaker: 'Parent', line: 'Is the bright sun out?' },
          { speaker: 'Child', line: 'Teeth brush' }, { speaker: 'Parent', line: 'Shall we brush teeth together?' },
          { speaker: 'Child', line: 'Eat breakfast' }, { speaker: 'Parent', line: 'Are you eating breakfast now?' },
          { speaker: 'Child', line: 'All done' }, { speaker: 'Parent', line: 'Are you all done now?' },
          { speaker: 'Child', line: 'Clean toys' }, { speaker: 'Parent', line: 'Can you clean toys now?' },
          { speaker: 'Child', line: 'Put pyjamas' }, { speaker: 'Parent', line: 'Are you putting pyjamas on?' },
          { speaker: 'Child', line: 'Read book' }, { speaker: 'Parent', line: 'Are we reading a book?' },
          { speaker: 'Child', line: 'Soft blanket' }, { speaker: 'Parent', line: 'Does the soft blanket feel warm?' },
          { speaker: 'Child', line: 'Good night' }, { speaker: 'Parent', line: 'Is it good night now?' }
        ]
      }
    ]
  },
  {
    id: 'rec-pool-4',
    title: 'Household Chores',
    image: '/public/images/activities/recast/chores.webp',
    description: "Recast while helping with chores into questions.",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Child Says One Word → You add one or more words and rephrase that into a question format',
        dialogue: [
          { speaker: 'Child', line: 'Blue' }, { speaker: 'Parent', line: 'Are these blue socks?' },
          { speaker: 'Child', line: 'Red' }, { speaker: 'Parent', line: 'Is this a red shirt?' },
          { speaker: 'Child', line: 'Pants' }, { speaker: 'Parent', line: 'Are these soft pants?' },
          { speaker: 'Child', line: 'Hat' }, { speaker: 'Parent', line: 'Is it a warm hat?' },
          { speaker: 'Child', line: 'White' }, { speaker: 'Parent', line: 'Are these white clothes?' },
          { speaker: 'Child', line: 'All done' }, { speaker: 'Parent', line: 'Is it all done?' },
          { speaker: 'Child', line: 'Sock' }, { speaker: 'Parent', line: 'Is this a sock pair?' },
          { speaker: 'Child', line: 'Powder' }, { speaker: 'Parent', line: 'Are we putting powder?' },
          { speaker: 'Child', line: 'Pants' }, { speaker: 'Parent', line: 'Is this a pair of pants?' },
          { speaker: 'Child', line: 'Help' }, { speaker: 'Parent', line: 'Are you helping?' },
          { speaker: 'Child', line: 'Fun' }, { speaker: 'Parent', line: 'Is laundry fun?' }
        ]
      },
      {
        title: 'Child Says Two Words → You add one or more words and rephrase that into a question format',
        dialogue: [
          { speaker: 'Child', line: 'Blue socks' }, { speaker: 'Parent', line: 'Do these blue socks go here?' },
          { speaker: 'Child', line: 'Red shirt' }, { speaker: 'Parent', line: 'Does the red shirt belong there?' },
          { speaker: 'Child', line: 'Soft pants' }, { speaker: 'Parent', line: 'Do your soft pants feel nice?' },
          { speaker: 'Child', line: 'Warm hat' }, { speaker: 'Parent', line: 'Does that warm hat go here?' },
          { speaker: 'Child', line: 'White clothes' }, { speaker: 'Parent', line: 'Do white clothes stay together?' },
          { speaker: 'Child', line: 'All clothes' }, { speaker: 'Parent', line: 'Are all clothes ready now?' },
          { speaker: 'Child', line: 'Sock pair' }, { speaker: 'Parent', line: 'Does the sock pair match?' },
          { speaker: 'Child', line: 'Pair pants' }, { speaker: 'Parent', line: 'Shall we pair the pants?' },
          { speaker: 'Child', line: 'Need help' }, { speaker: 'Parent', line: 'Do you need help?' },
          { speaker: 'Child', line: 'Laundry fun' }, { speaker: 'Parent', line: 'Does laundry feel fun today?' }
        ]
      }
    ]
  },
  {
    id: 'rec-pool-5',
    title: 'Reading Together',
    image: '/public/images/activities/recast/reading.webp',
    description: "Recast descriptions of pictures or story events into questions.",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Child Says One Word → You add one or more words and rephrase that into a question format',
        dialogue: [
          { speaker: 'Child', line: 'Book' }, { speaker: 'Parent', line: 'Shall we read the book?' },
          { speaker: 'Child', line: 'Dog' }, { speaker: 'Parent', line: 'Is it a brown dog?' },
          { speaker: 'Child', line: 'Cat' }, { speaker: 'Parent', line: 'Is it a sleepy cat?' },
          { speaker: 'Child', line: 'Ball' }, { speaker: 'Parent', line: 'Is it a red ball?' },
          { speaker: 'Child', line: 'Run' }, { speaker: 'Parent', line: 'Is the dog running?' },
          { speaker: 'Child', line: 'Eat' }, { speaker: 'Parent', line: 'Is the cat eating?' },
          { speaker: 'Child', line: 'Big' }, { speaker: 'Parent', line: 'Is it a big house?' },
          { speaker: 'Child', line: 'Baby' }, { speaker: 'Parent', line: 'Is it a happy baby?' },
          { speaker: 'Child', line: 'Night' }, { speaker: 'Parent', line: 'Is it good night?' },
          { speaker: 'Child', line: 'Done' }, { speaker: 'Parent', line: 'Is the story finished?' }
        ]
      },
      {
        title: 'Child Says Two Words → You add one or more words and rephrase that into a question format',
        dialogue: [
          { speaker: 'Child', line: 'Read book' }, { speaker: 'Parent', line: 'Shall we read the book together?' },
          { speaker: 'Child', line: 'Brown dog' }, { speaker: 'Parent', line: 'Is the brown dog running fast?' },
          { speaker: 'Child', line: 'Sleepy cat' }, { speaker: 'Parent', line: 'Is the sleepy cat resting now?' },
          { speaker: 'Child', line: 'Red ball' }, { speaker: 'Parent', line: 'Is the red ball rolling here?' },
          { speaker: 'Child', line: 'Dog running' }, { speaker: 'Parent', line: 'Is the dog running outside?' },
          { speaker: 'Child', line: 'Cat eating' }, { speaker: 'Parent', line: 'Is the cat eating its food?' },
          { speaker: 'Child', line: 'Big house' }, { speaker: 'Parent', line: 'Does the big house have many windows?' },
          { speaker: 'Child', line: 'Happy baby' }, { speaker: 'Parent', line: 'Is the happy baby smiling?' },
          { speaker: 'Child', line: 'Good night' }, { speaker: 'Parent', line: 'Is it time to say good night?' },
          { speaker: 'Child', line: 'Story finished' }, { speaker: 'Parent', line: 'Is the story finished now?' }
        ]
      }
    ]
  },
  {
    id: 'rec-pool-6',
    title: 'Pretend Play',
    image: '/public/images/activities/recast/pretend.webp',
    description: "Recast during imaginative play scenarios into questions.",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Child Says One Word → You add one or more words and rephrase that into a question format',
        dialogue: [
          { speaker: 'Child', line: 'Kitchen' }, { speaker: 'Parent', line: 'Is the kitchen ready?' },
          { speaker: 'Child', line: 'Doll' }, { speaker: 'Parent', line: 'Where should we place the doll?' },
          { speaker: 'Child', line: 'Cup' }, { speaker: 'Parent', line: 'Do you want to put the cup here?' },
          { speaker: 'Child', line: 'Plate' }, { speaker: 'Parent', line: 'Can we place the plate now?' },
          { speaker: 'Child', line: 'Soup' }, { speaker: 'Parent', line: 'Should we pour the soup?' },
          { speaker: 'Child', line: 'Milk' }, { speaker: 'Parent', line: 'Is it time to pour the milk?' },
          { speaker: 'Child', line: 'Eat' }, { speaker: 'Parent', line: 'Are you ready to eat the food?' },
          { speaker: 'Child', line: 'Drink' }, { speaker: 'Parent', line: 'Do you want to drink the milk?' },
          { speaker: 'Child', line: 'Wash' }, { speaker: 'Parent', line: 'Can we wash the plate?' },
          { speaker: 'Child', line: 'Towel' }, { speaker: 'Parent', line: 'Where is the towel?' },
          { speaker: 'Child', line: 'Messy' }, { speaker: 'Parent', line: 'Is the floor messy?' },
          { speaker: 'Child', line: 'Done' }, { speaker: 'Parent', line: 'Are we all done now?' }
        ]
      },
      {
        title: 'Child Says Two Words → You add one or more words and rephrase that into a question format',
        dialogue: [
          { speaker: 'Child', line: 'Feel sick' }, { speaker: 'Parent', line: 'Do you feel sick today?' },
          { speaker: 'Child', line: 'Tummy hurt.' }, { speaker: 'Parent', line: 'Does bunny’s tummy hurt?' },
          { speaker: 'Child', line: 'Coughing lot' }, { speaker: 'Parent', line: 'Are you coughing a lot?' },
          { speaker: 'Child', line: 'Headache' }, { speaker: 'Parent', line: 'Is the doll’s head hurting?' },
          { speaker: 'Child', line: 'Take medicine' }, { speaker: 'Parent', line: 'Do you want to take the medicine?' },
          { speaker: 'Child', line: 'Drink water' }, { speaker: 'Parent', line: 'Should you drink some water?' },
          { speaker: 'Child', line: 'Rest bed' }, { speaker: 'Parent', line: 'Is it time to rest in bed?' },
          { speaker: 'Child', line: 'Thermometer check' }, { speaker: 'Parent', line: 'Can I check with the thermometer?' },
          { speaker: 'Child', line: 'Band aid' }, { speaker: 'Parent', line: 'Do we need a band-aid?' },
          { speaker: 'Child', line: 'Feel better' }, { speaker: 'Parent', line: 'Will you feel better soon?' }
        ]
      }
    ]
  },
  {
    id: 'rec-pool-7',
    title: 'Building Blocks',
    image: '/public/images/activities/recast/blocks.webp',
    description: "Recast concepts of size, balance, and action into questions.",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Child Says One Word → You add one or more words and rephrase that into a question format',
        dialogue: [
          { speaker: 'Child', line: 'Green' }, { speaker: 'Parent', line: 'Is this the green block?' },
          { speaker: 'Child', line: 'Slide' }, { speaker: 'Parent', line: 'Can it slide down?' },
          { speaker: 'Child', line: 'Circle' }, { speaker: 'Parent', line: 'Is this a circle shape?' },
          { speaker: 'Child', line: 'Long' }, { speaker: 'Parent', line: 'Is this a long block?' },
          { speaker: 'Child', line: 'Under' }, { speaker: 'Parent', line: 'Is it under the table?' },
          { speaker: 'Child', line: 'Top' }, { speaker: 'Parent', line: 'Is this the top piece?' },
          { speaker: 'Child', line: 'Push' }, { speaker: 'Parent', line: 'Can you push slowly?' },
          { speaker: 'Child', line: 'Bridge' }, { speaker: 'Parent', line: 'Shall we build a bridge?' },
          { speaker: 'Child', line: 'Stack' }, { speaker: 'Parent', line: 'Can we stack the pieces?' },
          { speaker: 'Child', line: 'Fall' }, { speaker: 'Parent', line: 'Did the blocks fall?' }
        ]
      },
      {
        title: 'Child Says Two Words → You add one or more words and rephrase that into a question format',
        dialogue: [
          { speaker: 'Child', line: 'Pick blocks' }, { speaker: 'Parent', line: 'Can you pick up the blocks?' },
          { speaker: 'Child', line: 'Big block' }, { speaker: 'Parent', line: 'Should we use the big block?' },
          { speaker: 'Child', line: 'Red block' }, { speaker: 'Parent', line: 'Can you take the red block?' },
          { speaker: 'Child', line: 'Tall Tower' }, { speaker: 'Parent', line: 'Shall we build a tall tower?' },
          { speaker: 'Child', line: 'Put on' }, { speaker: 'Parent', line: 'Can you put the block on top?' },
          { speaker: 'Child', line: 'Fall down' }, { speaker: 'Parent', line: 'Did it fall down?' },
          { speaker: 'Child', line: 'Try again' }, { speaker: 'Parent', line: 'Will you try it again carefully?' },
          { speaker: 'Child', line: 'Tall tower' }, { speaker: 'Parent', line: 'Is the tower really tall?' },
          { speaker: 'Child', line: 'Small block' }, { speaker: 'Parent', line: 'Is the little block small?' },
          { speaker: 'Child', line: 'The roof' }, { speaker: 'Parent', line: 'Is the roof red?' },
          { speaker: 'Child', line: 'So fun' }, { speaker: 'Parent', line: 'Is building so much fun?' }
        ]
      }
    ]
  },
  {
    id: 'rec-pool-8',
    title: 'Pet Care',
    image: '/public/images/activities/recast/pets.webp',
    description: "Recast observations about the pet into questions.",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Child Says One Word → You add one or more words and rephrase that into a question format',
        dialogue: [
          { speaker: 'Child', line: 'Dog' }, { speaker: 'Parent', line: 'Is the dog hungry?' },
          { speaker: 'Child', line: 'Food' }, { speaker: 'Parent', line: 'Is this the dog food?' },
          { speaker: 'Child', line: 'Bowl' }, { speaker: 'Parent', line: 'Is this the food bowl?' },
          { speaker: 'Child', line: 'Pour' }, { speaker: 'Parent', line: 'Can you pour the food?' },
          { speaker: 'Child', line: 'Eat' }, { speaker: 'Parent', line: 'Is the dog eating?' },
          { speaker: 'Child', line: 'More' }, { speaker: 'Parent', line: 'Do you want more food?' },
          { speaker: 'Child', line: 'Water' }, { speaker: 'Parent', line: 'Is this fresh water?' },
          { speaker: 'Child', line: 'Drink' }, { speaker: 'Parent', line: 'Is the dog drinking?' },
          { speaker: 'Child', line: 'Happy' }, { speaker: 'Parent', line: 'Is the dog happy?' },
          { speaker: 'Child', line: 'Done' }, { speaker: 'Parent', line: 'Are we all done?' }
        ]
      },
      {
        title: 'Child Says Two Words → You add one or more words and rephrase that into a question format',
        dialogue: [
          { speaker: 'Child', line: 'Dog hungry' }, { speaker: 'Parent', line: 'Is the dog hungry?' },
          { speaker: 'Child', line: 'Get food' }, { speaker: 'Parent', line: 'Shall we get the food together?' },
          { speaker: 'Child', line: 'Big bowl' }, { speaker: 'Parent', line: 'Do we need a big bowl for him?' },
          { speaker: 'Child', line: 'Pour food' }, { speaker: 'Parent', line: 'Can you pour the food in now?' },
          { speaker: 'Child', line: 'Dog eating' }, { speaker: 'Parent', line: 'Is the dog eating now?' },
          { speaker: 'Child', line: 'More food' }, { speaker: 'Parent', line: 'Does he want more food?' },
          { speaker: 'Child', line: 'Add water' }, { speaker: 'Parent', line: 'Shall I add some water?' },
          { speaker: 'Child', line: 'Dog drink' }, { speaker: 'Parent', line: 'Is the dog drinking now?' },
          { speaker: 'Child', line: 'Dog happy' }, { speaker: 'Parent', line: 'Does he look happy after eating?' },
          { speaker: 'Child', line: 'All done' }, { speaker: 'Parent', line: 'Are we all done now?' }
        ]
      }
    ]
  },
  {
    id: 'rec-pool-9',
    title: 'Outdoor Walk',
    image: '/public/images/activities/recast/outdoor.webp',
    description: "Recast what you see and do outside into questions.",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Child Says One Word → You add one or more words and rephrase that into a question format',
        dialogue: [
          { speaker: 'Child', line: 'Walk' }, { speaker: 'Parent', line: 'Shall we walk to the park?' },
          { speaker: 'Child', line: 'Dog' }, { speaker: 'Parent', line: 'Do you see the dog?' },
          { speaker: 'Child', line: 'Car' }, { speaker: 'Parent', line: 'Is the car driving?' },
          { speaker: 'Child', line: 'Street' }, { speaker: 'Parent', line: 'Can you look at the street?' },
          { speaker: 'Child', line: 'Slide' }, { speaker: 'Parent', line: 'Can you go down the slide?' },
          { speaker: 'Child', line: 'Swing' }, { speaker: 'Parent', line: 'Can I push the swing?' },
          { speaker: 'Child', line: 'Sand' }, { speaker: 'Parent', line: 'Can we play in the sand?' },
          { speaker: 'Child', line: 'Ball' }, { speaker: 'Parent', line: 'Can you kick the ball?' },
          { speaker: 'Child', line: 'Children' }, { speaker: 'Parent', line: 'Are the children playing?' },
          { speaker: 'Child', line: 'Ice cream' }, { speaker: 'Parent', line: 'Is that the ice cream van?' }
        ]
      },
      {
        title: 'Child Says Two Words → You add one or more words and rephrase that into a question format',
        dialogue: [
          { speaker: 'Child', line: 'Go park' }, { speaker: 'Parent', line: 'Are we going to the park?' },
          { speaker: 'Child', line: 'Big slide' }, { speaker: 'Parent', line: 'Is that slide very big?' },
          { speaker: 'Child', line: 'Climb up' }, { speaker: 'Parent', line: 'Can you climb up slowly?' },
          { speaker: 'Child', line: 'Go fast' }, { speaker: 'Parent', line: 'Are you going very fast?' },
          { speaker: 'Child', line: 'Swing high' }, { speaker: 'Parent', line: 'Can I push you higher?' },
          { speaker: 'Child', line: 'See dog' }, { speaker: 'Parent', line: 'Do you see a dog over there?' },
          { speaker: 'Child', line: 'Run grass/ fast' }, { speaker: 'Parent', line: 'Are you running on the grass? Are you running fast?' },
          { speaker: 'Child', line: 'Throw ball' }, { speaker: 'Parent', line: 'Shall we throw the ball together?' },
          { speaker: 'Child', line: 'My turn' }, { speaker: 'Parent', line: 'Is it your turn now?' },
          { speaker: 'Child', line: 'All tired' }, { speaker: 'Parent', line: 'Do you look tired now?' }
        ]
      }
    ]
  },
  {
    id: 'rec-pool-10',
    title: 'Grocery Shopping',
    image: '/public/images/activities/recast/shopping.webp',
    description: "Recast names of items and actions in the store into questions.",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Child Says One Word → You add one or more words and rephrase that into a question format',
        dialogue: [
          { speaker: 'Child', line: 'Apple' }, { speaker: 'Parent', line: 'Is this a red apple?' },
          { speaker: 'Child', line: 'Milk' }, { speaker: 'Parent', line: 'Is this cold milk?' },
          { speaker: 'Child', line: 'Bread' }, { speaker: 'Parent', line: 'Is this fresh bread?' },
          { speaker: 'Child', line: 'Banana' }, { speaker: 'Parent', line: 'Is this a yellow banana?' },
          { speaker: 'Child', line: 'Cheese' }, { speaker: 'Parent', line: 'Is this soft cheese?' },
          { speaker: 'Child', line: 'Cart/ trolly' }, { speaker: 'Parent', line: 'Can you push the cart/trolly?' },
          { speaker: 'Child', line: 'Money' }, { speaker: 'Parent', line: 'Should we pay the money?' },
          { speaker: 'Child', line: 'Bag' }, { speaker: 'Parent', line: 'Can you carry the bag?' },
          { speaker: 'Child', line: 'More' }, { speaker: 'Parent', line: 'Do we have more items?' },
          { speaker: 'Child', line: 'Done' }, { speaker: 'Parent', line: 'Are we all done?' }
        ]
      },
      {
        title: 'Child Says Two Words → You add one or more words and rephrase that into a question format',
        dialogue: [
          { speaker: 'Child', line: 'Juice basket' }, { speaker: 'Parent', line: 'Should you put the juice in the basket?' },
          { speaker: 'Child', line: 'The cheese' }, { speaker: 'Parent', line: 'Can you pick the yellow cheese?' },
          { speaker: 'Child', line: 'Yellow Banana' }, { speaker: 'Parent', line: 'Can you take the ripe yellow banana?' },
          { speaker: 'Child', line: 'Red apple' }, { speaker: 'Parent', line: 'Can you take the red apple?' },
          { speaker: 'Child', line: 'Milk pack' }, { speaker: 'Parent', line: 'Do you put the milk pack in the bag?' },
          { speaker: 'Child', line: 'Fresh bread/ big bread' }, { speaker: 'Parent', line: 'Can you pick the fresh bread?' },
          { speaker: 'Child', line: 'Two carrots' }, { speaker: 'Parent', line: 'Should you grab the two orange carrots?' },
          { speaker: 'Child', line: 'Six eggs' }, { speaker: 'Parent', line: 'Are these six eggs here?' },
          { speaker: 'Child', line: 'Trolly full' }, { speaker: 'Parent', line: 'Is this trolly full?' },
          { speaker: 'Child', line: 'go back' }, { speaker: 'Parent', line: 'Are we going back?' }
        ]
      }
    ]
  }
];
