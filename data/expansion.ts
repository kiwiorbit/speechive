
import { Activity } from '../types';

export const EXPANSION_ACTIVITY_POOL: Activity[] = [
  {
    id: 'exp-pool-1',
    title: 'Mealtimes & Snacks',
    image: './public/images/activities/expansion/mealtimes.webp',
    description: "Use breakfast, lunch, dinner, or snacks to expand on words about food, taste, temperature, and utensils.",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      { 
        title: 'Child Says One Word → You add one more word.', 
        dialogue: [
          { speaker: 'Child', line: 'Plate' }, { speaker: 'Parent', line: 'Blue plate' },
          { speaker: 'Child', line: 'Rice' }, { speaker: 'Parent', line: 'Hot rice' },
          { speaker: 'Child', line: 'Spoon' }, { speaker: 'Parent', line: 'Big spoon' },
          { speaker: 'Child', line: 'Water' }, { speaker: 'Parent', line: 'Cold water' },
          { speaker: 'Child', line: 'Cracker' }, { speaker: 'Parent', line: 'Your Cracker' },
          { speaker: 'Child', line: 'Sauce' }, { speaker: 'Parent', line: 'Sweet sauce' },
          { speaker: 'Child', line: 'Hot' }, { speaker: 'Parent', line: 'Hot food' },
          { speaker: 'Child', line: 'Messy' }, { speaker: 'Parent', line: 'Messy hands' },
          { speaker: 'Child', line: 'Spill' }, { speaker: 'Parent', line: 'Milk spill' }
        ] 
      },
      { 
        title: 'Child Says Two Words → You expand it into a sentence', 
        dialogue: [
          { speaker: 'Child', line: 'Eat apple' }, { speaker: 'Parent', line: 'You are eating apple. Mum is eating apple.' },
          { speaker: 'Child', line: 'Eat banana' }, { speaker: 'Parent', line: 'Eat yellow banana. Eat yummy banana.' },
          { speaker: 'Child', line: 'Drink milk' }, { speaker: 'Parent', line: 'Drink milk in the cup.' },
          { speaker: 'Child', line: 'Cold milk' }, { speaker: 'Parent', line: 'Pour the cold milk.' },
          { speaker: 'Child', line: 'Eat breakfast' }, { speaker: 'Parent', line: 'Eat your breakfast now.' },
          { speaker: 'Child', line: 'Big apple' }, { speaker: 'Parent', line: 'Take a big apple bite.' },
          { speaker: 'Child', line: 'Yummy food' }, { speaker: 'Parent', line: 'Yummy food, it tastes good.' },
          { speaker: 'Child', line: 'Done food' }, { speaker: 'Parent', line: 'Great, all food done.' },
          { speaker: 'Child', line: 'Table clean' }, { speaker: 'Parent', line: 'Wipe the table clean.' },
          { speaker: 'Child', line: 'Chair push' }, { speaker: 'Parent', line: 'Push the chair in.' }
        ] 
      }
    ],
  },
  {
    id: 'exp-pool-2',
    title: 'Bath Time',
    image: '/public/images/activities/expansion/bathtime.webp',
    description: "Expand on vocabulary related to water, bubbles, washing body parts, and bath toys in this relaxed setting.",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      { 
        title: 'Child Says One Word → You add one more word.', 
        dialogue: [
          { speaker: 'Child', line: 'Hands' }, { speaker: 'Parent', line: 'Wash hands' },
          { speaker: 'Child', line: 'Hair' }, { speaker: 'Parent', line: 'Wet hair' },
          { speaker: 'Child', line: 'Eyes' }, { speaker: 'Parent', line: 'Closed eyes' },
          { speaker: 'Child', line: 'Tummy' }, { speaker: 'Parent', line: 'Wash tummy' },
          { speaker: 'Child', line: 'Pour' }, { speaker: 'Parent', line: 'Pour water' },
          { speaker: 'Child', line: 'Splash' }, { speaker: 'Parent', line: 'Big splash' },
          { speaker: 'Child', line: 'Wet' }, { speaker: 'Parent', line: 'Wet hands' },
          { speaker: 'Child', line: 'Cold' }, { speaker: 'Parent', line: 'Cold water' },
          { speaker: 'Child', line: 'Hot' }, { speaker: 'Parent', line: 'Too hot' },
          { speaker: 'Child', line: 'Bubbles' }, { speaker: 'Parent', line: 'Soft bubbles' }
        ] 
      },
      { 
        title: 'Child Says Two Words → You expand it into a sentence', 
        dialogue: [
          { speaker: 'Child', line: 'Fun bath' }, { speaker: 'Parent', line: 'The fun bath is relaxing.' },
          { speaker: 'Child', line: 'More bubbles' }, { speaker: 'Parent', line: 'More bubbles are coming.' },
          { speaker: 'Child', line: 'Soft bubbles' }, { speaker: 'Parent', line: 'The soft bubbles feel nice.' },
          { speaker: 'Child', line: 'Bath done' }, { speaker: 'Parent', line: 'The bath is done.' },
          { speaker: 'Child', line: 'Dry towel' }, { speaker: 'Parent', line: 'The dry towel is ready.' },
          { speaker: 'Child', line: 'Cold air' }, { speaker: 'Parent', line: 'The cold air feels chilly.' },
          { speaker: 'Child', line: 'Warm pyjamas' }, { speaker: 'Parent', line: 'The warm pyjamas feel cosy.' },
          { speaker: 'Child', line: 'Water splash' }, { speaker: 'Parent', line: 'The water splashes everywhere.' },
          { speaker: 'Child', line: 'Duck swim' }, { speaker: 'Parent', line: 'The duck swims in bath.' },
          { speaker: 'Child', line: 'Wet hair' }, { speaker: 'Parent', line: 'Your wet hair drips.' }
        ] 
      }
    ],
  },
  {
    id: 'exp-pool-3',
    title: 'Morning & Bedtime',
    image: '/public/images/activities/expansion/dressing.webp',
    description: "Talk about making bed, brushing, clothing items, colors, and body parts while getting dressed.",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Child Says One Word → You add one more word.',
        dialogue: [
          { speaker: 'Child', line: 'Shirt' }, { speaker: 'Parent', line: 'Blue shirt' },
          { speaker: 'Child', line: 'Socks' }, { speaker: 'Parent', line: 'Red socks' },
          { speaker: 'Child', line: 'Hat' }, { speaker: 'Parent', line: 'Warm hat' },
          { speaker: 'Child', line: 'Pants' }, { speaker: 'Parent', line: 'Your favourite pants' },
          { speaker: 'Child', line: 'Hands' }, { speaker: 'Parent', line: 'Clean hands' },
          { speaker: 'Child', line: 'Shoes' }, { speaker: 'Parent', line: 'Big shoes' },
          { speaker: 'Child', line: 'Shirt' }, { speaker: 'Parent', line: 'Put on shirt' },
          { speaker: 'Child', line: 'Button' }, { speaker: 'Parent', line: 'Button shirt' },
          { speaker: 'Child', line: 'Zip' }, { speaker: 'Parent', line: 'Zip jacket' },
          { speaker: 'Child', line: 'Done' }, { speaker: 'Parent', line: 'All done' },
          { speaker: 'Child', line: 'Help' }, { speaker: 'Parent', line: 'Help me' }
        ]
      },
      {
        title: 'Child Says Two Words → You expand it into a sentence',
        dialogue: [
          { speaker: 'Child', line: 'Wake up' }, { speaker: 'Parent', line: 'It is time to wake up.' },
          { speaker: 'Child', line: 'Bright sun' }, { speaker: 'Parent', line: 'The bright sun is out.' },
          { speaker: 'Child', line: 'Brush teeth' }, { speaker: 'Parent', line: 'Let’s brush teeth together.' },
          { speaker: 'Child', line: 'Eat breakfast' }, { speaker: 'Parent', line: 'Now you eat breakfast.' },
          { speaker: 'Child', line: 'All done' }, { speaker: 'Parent', line: 'You are all done.' },
          { speaker: 'Child', line: 'Clean toys' }, { speaker: 'Parent', line: 'Please clean toys now.' },
          { speaker: 'Child', line: 'Put pyjamas' }, { speaker: 'Parent', line: 'You are putting pyjamas on.' },
          { speaker: 'Child', line: 'Read book' }, { speaker: 'Parent', line: 'We are reading a book.' },
          { speaker: 'Child', line: 'Soft blanket' }, { speaker: 'Parent', line: 'The soft blanket feels warm.' },
          { speaker: 'Child', line: 'Good night' }, { speaker: 'Parent', line: 'It is good night now.' }
        ]
      }
    ]
  },
  {
    id: 'exp-pool-4',
    title: 'Household Chores',
    image: '/public/images/activities/expansion/chores.webp',
    description: "Involve your child in simple chores like sorting laundry.",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Child Says One Word → You add one more word.',
        dialogue: [
          { speaker: 'Child', line: 'Blue' }, { speaker: 'Parent', line: 'Blue socks' },
          { speaker: 'Child', line: 'Red' }, { speaker: 'Parent', line: 'Red shirt' },
          { speaker: 'Child', line: 'Pants' }, { speaker: 'Parent', line: 'Soft pants' },
          { speaker: 'Child', line: 'Hat' }, { speaker: 'Parent', line: 'Warm hat' },
          { speaker: 'Child', line: 'White' }, { speaker: 'Parent', line: 'White clothes' },
          { speaker: 'Child', line: 'All' }, { speaker: 'Parent', line: 'All sorted/ done' },
          { speaker: 'Child', line: 'Sock' }, { speaker: 'Parent', line: 'Sock pair' },
          { speaker: 'Child', line: 'Powder' }, { speaker: 'Parent', line: 'Put powder' },
          { speaker: 'Child', line: 'Pants' }, { speaker: 'Parent', line: 'Pair pants' },
          { speaker: 'Child', line: 'Help' }, { speaker: 'Parent', line: 'Thanks helping' },
          { speaker: 'Child', line: 'Fun' }, { speaker: 'Parent', line: 'Laundry fun' }
        ]
      },
      {
        title: 'Child Says Two Words → You expand it into a sentence',
        dialogue: [
          { speaker: 'Child', line: 'Blue socks' }, { speaker: 'Parent', line: 'These blue socks go here.' },
          { speaker: 'Child', line: 'Red shirt' }, { speaker: 'Parent', line: 'The red shirt belongs there.' },
          { speaker: 'Child', line: 'Soft pants' }, { speaker: 'Parent', line: 'Your soft pants feel nice.' },
          { speaker: 'Child', line: 'Warm hat' }, { speaker: 'Parent', line: 'That warm hat goes here.' },
          { speaker: 'Child', line: 'White clothes' }, { speaker: 'Parent', line: 'White clothes stay together.' },
          { speaker: 'Child', line: 'All clothes' }, { speaker: 'Parent', line: 'All clothes are ready now.' },
          { speaker: 'Child', line: 'Sock pair' }, { speaker: 'Parent', line: 'The sock pair matches.' },
          { speaker: 'Child', line: 'Other shirt' }, { speaker: 'Parent', line: 'We need the other shirt.' },
          { speaker: 'Child', line: 'Pair pants' }, { speaker: 'Parent', line: 'Let’s pair the pants.' },
          { speaker: 'Child', line: 'Need help' }, { speaker: 'Parent', line: 'I can help you.' },
          { speaker: 'Child', line: 'Laundry fun' }, { speaker: 'Parent', line: 'Laundry feels fun today.' }
        ]
      }
    ]
  },
  {
    id: 'exp-pool-5',
    title: 'Reading Together',
    image: '/public/images/activities/expansion/reading.webp',
    description: "Expand on the pictures in a book. Add details about characters.",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Child Says One Word → You add one more word.',
        dialogue: [
          { speaker: 'Child', line: 'Book' }, { speaker: 'Parent', line: 'Read book' },
          { speaker: 'Child', line: 'Dog' }, { speaker: 'Parent', line: 'Brown dog' },
          { speaker: 'Child', line: 'Cat' }, { speaker: 'Parent', line: 'Sleepy cat' },
          { speaker: 'Child', line: 'Ball' }, { speaker: 'Parent', line: 'Red ball' },
          { speaker: 'Child', line: 'Run' }, { speaker: 'Parent', line: 'Dog running' },
          { speaker: 'Child', line: 'Eat' }, { speaker: 'Parent', line: 'Cat eating' },
          { speaker: 'Child', line: 'Big' }, { speaker: 'Parent', line: 'Big house' },
          { speaker: 'Child', line: 'Baby' }, { speaker: 'Parent', line: 'Happy baby' },
          { speaker: 'Child', line: 'Night' }, { speaker: 'Parent', line: 'Good night' },
          { speaker: 'Child', line: 'Done' }, { speaker: 'Parent', line: 'Story finished' }
        ]
      },
      {
        title: 'Child Says Two Words → You expand it into a sentence',
        dialogue: [
          { speaker: 'Child', line: 'Read book' }, { speaker: 'Parent', line: 'We will read the book together.' },
          { speaker: 'Child', line: 'Brown dog' }, { speaker: 'Parent', line: 'The brown dog is running fast.' },
          { speaker: 'Child', line: 'Sleepy cat' }, { speaker: 'Parent', line: 'The sleepy cat is resting now.' },
          { speaker: 'Child', line: 'Red ball' }, { speaker: 'Parent', line: 'The red ball is rolling here.' },
          { speaker: 'Child', line: 'Dog running' }, { speaker: 'Parent', line: 'The dog is running outside.' },
          { speaker: 'Child', line: 'Cat eating' }, { speaker: 'Parent', line: 'The cat is eating its food.' },
          { speaker: 'Child', line: 'Big house' }, { speaker: 'Parent', line: 'The big house has many windows.' },
          { speaker: 'Child', line: 'Happy baby' }, { speaker: 'Parent', line: 'The happy baby is smiling.' },
          { speaker: 'Child', line: 'Good night' }, { speaker: 'Parent', line: 'It is time to say good night.' },
          { speaker: 'Child', line: 'Story finished' }, { speaker: 'Parent', line: 'The story is finished now.' }
        ]
      }
    ]
  },
  {
    id: 'exp-pool-6',
    title: 'Pretend Play',
    image: '/public/images/activities/expansion/pretend.webp',
    description: "Join in imaginative play with dolls, cars, or kitchen sets.",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Child Says One Word → You add one more word.',
        dialogue: [
          { speaker: 'Child', line: 'Kitchen' }, { speaker: 'Parent', line: 'Set kitchen' },
          { speaker: 'Child', line: 'Doll' }, { speaker: 'Parent', line: 'Place doll' },
          { speaker: 'Child', line: 'Cup' }, { speaker: 'Parent', line: 'Put cup' },
          { speaker: 'Child', line: 'Plate' }, { speaker: 'Parent', line: 'Place plate' },
          { speaker: 'Child', line: 'Soup' }, { speaker: 'Parent', line: 'Pour soup' },
          { speaker: 'Child', line: 'Milk' }, { speaker: 'Parent', line: 'Pour milk' },
          { speaker: 'Child', line: 'Eat' }, { speaker: 'Parent', line: 'Eat food' },
          { speaker: 'Child', line: 'Drink' }, { speaker: 'Parent', line: 'Drink milk' },
          { speaker: 'Child', line: 'Wash' }, { speaker: 'Parent', line: 'Wash plate' },
          { speaker: 'Child', line: 'Towel' }, { speaker: 'Parent', line: 'Use towel' },
          { speaker: 'Child', line: 'Messy' }, { speaker: 'Parent', line: 'Floor messy' },
          { speaker: 'Child', line: 'Done' }, { speaker: 'Parent', line: 'All done' }
        ]
      },
      {
        title: 'Child Says Two Words → You expand it into a sentence',
        dialogue: [
          { speaker: 'Child', line: 'Feel sick' }, { speaker: 'Parent', line: 'You feel sick today.' },
          { speaker: 'Child', line: 'Tummy hurt' }, { speaker: 'Parent', line: 'Bunnies tummy hurt.' },
          { speaker: 'Child', line: 'Coughing lot' }, { speaker: 'Parent', line: 'I see you are coughing a lot.' },
          { speaker: 'Child', line: 'Headache' }, { speaker: 'Parent', line: 'Dolls head is hurting.' },
          { speaker: 'Child', line: 'Take medicine' }, { speaker: 'Parent', line: 'Please take the medicine.' },
          { speaker: 'Child', line: 'Drink water' }, { speaker: 'Parent', line: 'You should drink water.' },
          { speaker: 'Child', line: 'Rest bed' }, { speaker: 'Parent', line: 'It’s time to rest in bed.' },
          { speaker: 'Child', line: 'Thermometer check' }, { speaker: 'Parent', line: 'I will check with the thermometer.' },
          { speaker: 'Child', line: 'Band aid' }, { speaker: 'Parent', line: 'We can use a band-aid.' },
          { speaker: 'Child', line: 'Feel better' }, { speaker: 'Parent', line: 'Soon you/bunny/doll will feel better.' }
        ]
      }
    ]
  },
  {
    id: 'exp-pool-7',
    title: 'Building Blocks',
    image: '/public/images/activities/expansion/blocks.webp',
    description: "Build towers or structures together. Expand on concepts like size.",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Child Says One Word → You add one more word.',
        dialogue: [
          { speaker: 'Child', line: 'Green' }, { speaker: 'Parent', line: 'Green block' },
          { speaker: 'Child', line: 'Slide' }, { speaker: 'Parent', line: 'Slide down' },
          { speaker: 'Child', line: 'Circle' }, { speaker: 'Parent', line: 'Circle shape' },
          { speaker: 'Child', line: 'Long' }, { speaker: 'Parent', line: 'Long block' },
          { speaker: 'Child', line: 'Under' }, { speaker: 'Parent', line: 'Under table' },
          { speaker: 'Child', line: 'Top' }, { speaker: 'Parent', line: 'Top piece' },
          { speaker: 'Child', line: 'Push' }, { speaker: 'Parent', line: 'Push slowly' },
          { speaker: 'Child', line: 'Bridge' }, { speaker: 'Parent', line: 'Build bridge' },
          { speaker: 'Child', line: 'Stack' }, { speaker: 'Parent', line: 'Stack pieces' },
          { speaker: 'Child', line: 'Fall' }, { speaker: 'Parent', line: 'Blocks fall' }
        ]
      },
      {
        title: 'Child Says Two Words → You expand it into a sentence',
        dialogue: [
          { speaker: 'Child', line: 'Pick blocks' }, { speaker: 'Parent', line: 'Pick up the blocks.' },
          { speaker: 'Child', line: 'Big block' }, { speaker: 'Parent', line: 'Use the big block' },
          { speaker: 'Child', line: 'Red block' }, { speaker: 'Parent', line: 'Take the red block.' },
          { speaker: 'Child', line: 'Tall Tower' }, { speaker: 'Parent', line: 'Let’s build a tall tower.' },
          { speaker: 'Child', line: 'Put on' }, { speaker: 'Parent', line: 'Put the block on top.' },
          { speaker: 'Child', line: 'Fall down' }, { speaker: 'Parent', line: 'Oops, it fell down.' },
          { speaker: 'Child', line: 'Try again' }, { speaker: 'Parent', line: 'Try it again carefully.' },
          { speaker: 'Child', line: 'Tall tower' }, { speaker: 'Parent', line: 'The tower is really tall.' },
          { speaker: 'Child', line: 'Small block' }, { speaker: 'Parent', line: 'The little block is small.' },
          { speaker: 'Child', line: 'The roof' }, { speaker: 'Parent', line: 'The roof is red.' },
          { speaker: 'Child', line: 'So fun' }, { speaker: 'Parent', line: 'Building is so much fun.' }
        ]
      }
    ]
  },
  {
    id: 'exp-pool-8',
    title: 'Pet Care',
    image: '/public/images/activities/expansion/pets.webp',
    description: "Involve your child in feeding or grooming a pet.",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Child Says One Word → You add one more word.',
        dialogue: [
          { speaker: 'Child', line: 'Dog' }, { speaker: 'Parent', line: 'Hungry dog' },
          { speaker: 'Child', line: 'Food' }, { speaker: 'Parent', line: 'Dog food' },
          { speaker: 'Child', line: 'Bowl' }, { speaker: 'Parent', line: 'Food bowl' },
          { speaker: 'Child', line: 'Pour' }, { speaker: 'Parent', line: 'Pour food' },
          { speaker: 'Child', line: 'Eat' }, { speaker: 'Parent', line: 'Dog eating' },
          { speaker: 'Child', line: 'More' }, { speaker: 'Parent', line: 'More food' },
          { speaker: 'Child', line: 'Water' }, { speaker: 'Parent', line: 'Fresh water' },
          { speaker: 'Child', line: 'Drink' }, { speaker: 'Parent', line: 'Dog drinking' },
          { speaker: 'Child', line: 'Happy' }, { speaker: 'Parent', line: 'Happy dog' },
          { speaker: 'Child', line: 'Done' }, { speaker: 'Parent', line: 'All done' }
        ]
      },
      {
        title: 'Child Says Two Words → You expand it into a sentence',
        dialogue: [
          { speaker: 'Child', line: 'Dog hungry' }, { speaker: 'Parent', line: 'Yes, the dog is hungry.' },
          { speaker: 'Child', line: 'Get food' }, { speaker: 'Parent', line: 'Let’s get the food together.' },
          { speaker: 'Child', line: 'Big bowl' }, { speaker: 'Parent', line: 'We need a big bowl for him.' },
          { speaker: 'Child', line: 'Pour food' }, { speaker: 'Parent', line: 'You can pour the food in now.' },
          { speaker: 'Child', line: 'Dog eating' }, { speaker: 'Parent', line: 'Look, the dog is eating.' },
          { speaker: 'Child', line: 'More food' }, { speaker: 'Parent', line: 'He wants more food.' },
          { speaker: 'Child', line: 'Add water' }, { speaker: 'Parent', line: 'I will add some water.' },
          { speaker: 'Child', line: 'Dog drink' }, { speaker: 'Parent', line: 'Now the dog is drinking.' },
          { speaker: 'Child', line: 'Dog happy' }, { speaker: 'Parent', line: 'He looks happy after eating.' },
          { speaker: 'Child', line: 'All done' }, { speaker: 'Parent', line: 'We are all done now.' }
        ]
      }
    ]
  },
  {
    id: 'exp-pool-9',
    title: 'Outdoor Walk',
    image: '/public/images/activities/expansion/outdoor.webp',
    description: "Explore nature, the park, or the backyard. Expand on observations.",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Child Says One Word → You add one more word.',
        dialogue: [
          { speaker: 'Child', line: 'Walk' }, { speaker: 'Parent', line: 'Walk to park' },
          { speaker: 'Child', line: 'Dog' }, { speaker: 'Parent', line: 'See the dog' },
          { speaker: 'Child', line: 'Car' }, { speaker: 'Parent', line: 'Car drives' },
          { speaker: 'Child', line: 'Street' }, { speaker: 'Parent', line: 'Look at the street' },
          { speaker: 'Child', line: 'Slide' }, { speaker: 'Parent', line: 'Go down the slide' },
          { speaker: 'Child', line: 'Swing' }, { speaker: 'Parent', line: 'Push swing' },
          { speaker: 'Child', line: 'Sand' }, { speaker: 'Parent', line: 'Play in the sand' },
          { speaker: 'Child', line: 'Ball' }, { speaker: 'Parent', line: 'Kick the ball' },
          { speaker: 'Child', line: 'Children' }, { speaker: 'Parent', line: 'Children playing' },
          { speaker: 'Child', line: 'Ice cream' }, { speaker: 'Parent', line: 'Yes, Ice cream van' }
        ]
      },
      {
        title: 'Child Says Two Words → You expand it into a sentence',
        dialogue: [
          { speaker: 'Child', line: 'Go park' }, { speaker: 'Parent', line: 'Yes, we are going to the park.' },
          { speaker: 'Child', line: 'Big slide' }, { speaker: 'Parent', line: 'That slide is very big.' },
          { speaker: 'Child', line: 'Climb up' }, { speaker: 'Parent', line: 'You can climb up slowly.' },
          { speaker: 'Child', line: 'Go fast' }, { speaker: 'Parent', line: 'You are going very fast.' },
          { speaker: 'Child', line: 'Swing high' }, { speaker: 'Parent', line: 'I can push you higher.' },
          { speaker: 'Child', line: 'See dog' }, { speaker: 'Parent', line: 'I see a dog over there.' },
          { speaker: 'Child', line: 'Run grass' }, { speaker: 'Parent', line: 'You are running on the grass.' },
          { speaker: 'Child', line: 'Throw ball' }, { speaker: 'Parent', line: 'Let’s throw the ball together.' },
          { speaker: 'Child', line: 'My turn' }, { speaker: 'Parent', line: 'Now it is your turn.' },
          { speaker: 'Child', line: 'All tired' }, { speaker: 'Parent', line: 'You look tired now.' }
        ]
      }
    ]
  },
  {
    id: 'exp-pool-10',
    title: 'Grocery Shopping',
    image: '/public/images/activities/expansion/shopping.webp',
    description: "Turn a shopping trip into a language lesson.",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Child Says One Word → You add one more word.',
        dialogue: [
          { speaker: 'Child', line: 'Apple' }, { speaker: 'Parent', line: 'Red apple' },
          { speaker: 'Child', line: 'Milk' }, { speaker: 'Parent', line: 'Cold milk' },
          { speaker: 'Child', line: 'Bread' }, { speaker: 'Parent', line: 'Fresh bread' },
          { speaker: 'Child', line: 'Banana' }, { speaker: 'Parent', line: 'Yellow banana' },
          { speaker: 'Child', line: 'Cheese' }, { speaker: 'Parent', line: 'Soft cheese' },
          { speaker: 'Child', line: 'Cart/ trolly' }, { speaker: 'Parent', line: 'Push cart/ trolly' },
          { speaker: 'Child', line: 'Money' }, { speaker: 'Parent', line: 'Pay money' },
          { speaker: 'Child', line: 'Bag' }, { speaker: 'Parent', line: 'Carry bag' },
          { speaker: 'Child', line: 'More' }, { speaker: 'Parent', line: 'More items' },
          { speaker: 'Child', line: 'Done' }, { speaker: 'Parent', line: 'All done' }
        ]
      },
      {
        title: 'Child Says Two Words → You expand it into a sentence',
        dialogue: [
          { speaker: 'Child', line: 'Juice basket' }, { speaker: 'Parent', line: 'Put the juice in the basket.' },
          { speaker: 'Child', line: 'The cheese' }, { speaker: 'Parent', line: 'Pick the yellow cheese.' },
          { speaker: 'Child', line: 'Yellow Banana' }, { speaker: 'Parent', line: 'Take the ripe yellow banana.' },
          { speaker: 'Child', line: 'Red apple' }, { speaker: 'Parent', line: 'Take the red apple.' },
          { speaker: 'Child', line: 'Milk pack' }, { speaker: 'Parent', line: 'Put the milk pack in the bag.' },
          { speaker: 'Child', line: 'Fresh bread' }, { speaker: 'Parent', line: 'Pick the fresh bread.' },
          { speaker: 'Child', line: 'Two carrots' }, { speaker: 'Parent', line: 'Grab the two orange carrots.' },
          { speaker: 'Child', line: 'Six eggs' }, { speaker: 'Parent', line: 'Six eggs here.' },
          { speaker: 'Child', line: 'Trolly full' }, { speaker: 'Parent', line: 'This trolly is full.' },
          { speaker: 'Child', line: 'Go back' }, { speaker: 'Parent', line: 'We are going back.' }
        ]
      }
    ]
  }
];
