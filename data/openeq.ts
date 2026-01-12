
import { Activity } from '../types';

export const OPENEQ_ACTIVITY_POOL: Activity[] = [
  {
    id: 'oeq-pool-1',
    title: 'Mealtimes & Snacks',
    image: '/public/images/activities/openeq/mealtimes.webp',
    description: "Use mealtime to ask open-ended questions about food, choices, and utensils.",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Level 1: Open ended questions for one-word level children',
        dialogue: [
          { speaker: 'Parent', line: 'What do you want to eat?' },
          { speaker: 'Parent', line: 'Which fruit do you see?' },
          { speaker: 'Parent', line: 'What is in your cup?' },
          { speaker: 'Parent', line: 'Which one will you take?' },
          { speaker: 'Parent', line: 'Where is your spoon?' },
          { speaker: 'Parent', line: 'What color is your plate?' },
          { speaker: 'Parent', line: 'What do you pour?' },
          { speaker: 'Parent', line: 'Which snack is yours?' },
          { speaker: 'Parent', line: 'What do we eat first?' },
          { speaker: 'Parent', line: 'Where is your napkin?' }
        ]
      },
      {
        title: 'Level 2: Open ended questions for two-word level children',
        dialogue: [
          { speaker: 'Parent', line: 'Which fruit do you want to eat?' },
          { speaker: 'Parent', line: 'What’s in your cup now?' },
          { speaker: 'Parent', line: 'Can you open the juice?' },
          { speaker: 'Parent', line: 'Which snack is yours now?' },
          { speaker: 'Parent', line: 'What do we pour first?' },
          { speaker: 'Parent', line: 'Where is your red spoon?' },
          { speaker: 'Parent', line: 'What is the dog eating?' },
          { speaker: 'Parent', line: 'Which plate goes on the table?' },
          { speaker: 'Parent', line: 'What do you want more?' },
          { speaker: 'Parent', line: 'What do we eat next?' }
        ]
      }
    ]
  },
  {
    id: 'oeq-pool-2',
    title: 'Bath Time',
    image: '/public/images/activities/openeq/bathtime.webp',
    description: "Ask about water, bubbles, and washing during bath time.",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Level 1: Open ended questions for one-word level children',
        dialogue: [
          { speaker: 'Parent', line: 'What can you do with your hands?' },
          { speaker: 'Parent', line: 'How can you wet your hair?' },
          { speaker: 'Parent', line: 'What can you do with your eyes?' },
          { speaker: 'Parent', line: 'How can you wash your tummy?' },
          { speaker: 'Parent', line: 'What can you pour with the water?' },
          { speaker: 'Parent', line: 'What happens when you make a big splash?' },
          { speaker: 'Parent', line: 'How can you make your hands wet?' },
          { speaker: 'Parent', line: 'What does the cold water feel like?' },
          { speaker: 'Parent', line: 'How would you make the water not too hot or too cold?' },
          { speaker: 'Parent', line: 'What can you do with the soft bubbles?' }
        ]
      },
      {
        title: 'Level 2: Open ended questions for two-word level children',
        dialogue: [
          { speaker: 'Parent', line: 'How does the fun bath feel?' },
          { speaker: 'Parent', line: 'What can you do to make more bubbles?' },
          { speaker: 'Parent', line: 'How do the soft bubbles feel on your skin?' },
          { speaker: 'Parent', line: 'What do you do when the bath is done?' },
          { speaker: 'Parent', line: 'Where can you find the dry towel?' },
          { speaker: 'Parent', line: 'How does the cold air feel on your skin?' },
          { speaker: 'Parent', line: 'How do the warm pyjamas feel when you wear them?' },
          { speaker: 'Parent', line: 'What happens when the water splashes everywhere?' },
          { speaker: 'Parent', line: 'Where does the duck swim in the bath?' },
          { speaker: 'Parent', line: 'What is happening with your wet hair?' }
        ]
      }
    ]
  },
  {
    id: 'oeq-pool-3',
    title: 'Morning or Bedtime',
    image: '/public/images/activities/openeq/dressing.webp',
    description: "Ask questions about clothing choices and routines.",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Level 1: Open ended questions for one-word level children',
        dialogue: [
          { speaker: 'Parent', line: 'What can you put on your head?' },
          { speaker: 'Parent', line: 'Which shirt do you want to wear?' },
          { speaker: 'Parent', line: 'What can you do with your shoes?' },
          { speaker: 'Parent', line: 'Which socks do you want to wear?' },
          { speaker: 'Parent', line: 'Where can you put your pants?' },
          { speaker: 'Parent', line: 'What can you do with your pajamas?' },
          { speaker: 'Parent', line: 'Which jacket do you want to wear?' },
          { speaker: 'Parent', line: 'What can you do with your hands while dressing?' },
          { speaker: 'Parent', line: 'Where can you put your hat?' },
          { speaker: 'Parent', line: 'Which blanket do you want for bedtime?' }
        ]
      },
      {
        title: 'Level 2: Open ended questions for two-word level children',
        dialogue: [
          { speaker: 'Parent', line: 'Which shirt do you want to wear today?' },
          { speaker: 'Parent', line: 'What color socks are you going to put on?' },
          { speaker: 'Parent', line: 'How can you put on your shoes?' },
          { speaker: 'Parent', line: 'Where do your pants go?' },
          { speaker: 'Parent', line: 'What do you do with your pajamas now?' },
          { speaker: 'Parent', line: 'Which jacket keeps you warm?' },
          { speaker: 'Parent', line: 'What can you do with your socks and shoes?' },
          { speaker: 'Parent', line: 'Where do you put your hat in the morning?' },
          { speaker: 'Parent', line: 'Which blanket makes you feel cozy?' },
          { speaker: 'Parent', line: 'What happens when you zip your jacket?' }
        ]
      }
    ]
  },
  {
    id: 'oeq-pool-4',
    title: 'Household Chores',
    image: '/public/images/activities/openeq/chores.webp',
    description: "Involve the child in sorting laundry or tidying up.",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Level 1: Open ended questions for one-word level children',
        dialogue: [
          { speaker: 'Parent', line: 'Which clothes can you pick up?' },
          { speaker: 'Parent', line: 'Where can you put the socks?' },
          { speaker: 'Parent', line: 'Which shirt do you want to fold?' },
          { speaker: 'Parent', line: 'What can you do with the pants?' },
          { speaker: 'Parent', line: 'Where do the towels go?' },
          { speaker: 'Parent', line: 'Which sock goes together?' },
          { speaker: 'Parent', line: 'What can you do with the t-shirt?' },
          { speaker: 'Parent', line: 'Which clothes are clean?' },
          { speaker: 'Parent', line: 'Where can you put the jacket?' },
          { speaker: 'Parent', line: 'What can you do with the laundry basket?' }
        ]
      },
      {
        title: 'Level 2: Open ended questions for two-word level children',
        dialogue: [
          { speaker: 'Parent', line: 'Which socks can you pair together?' },
          { speaker: 'Parent', line: 'Where do the clean shirts go?' },
          { speaker: 'Parent', line: 'Which pants do you want to fold first?' },
          { speaker: 'Parent', line: 'What can you do with the wet towels?' },
          { speaker: 'Parent', line: 'Which t-shirt goes in this pile?' },
          { speaker: 'Parent', line: 'Where can you put the folded clothes?' },
          { speaker: 'Parent', line: 'Which clothes are your favourite?' },
          { speaker: 'Parent', line: 'What can you do with the laundry basket now?' },
          { speaker: 'Parent', line: 'Which jacket should we hang up?' },
          { speaker: 'Parent', line: 'How can you sort the socks by colour?' }
        ]
      }
    ]
  },
  {
    id: 'oeq-pool-5',
    title: 'Reading Together',
    image: '/public/images/activities/openeq/reading.webp',
    description: "Ask about characters and events in a book.",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Level 1: Open ended questions for one-word level children',
        dialogue: [
          { speaker: 'Parent', line: 'Who is this in the picture?' },
          { speaker: 'Parent', line: 'What is happening here?' },
          { speaker: 'Parent', line: 'Which animal do you see?' },
          { speaker: 'Parent', line: 'Where is the ball?' },
          { speaker: 'Parent', line: 'What is the character doing?' },
          { speaker: 'Parent', line: 'Which colour do you like?' },
          { speaker: 'Parent', line: 'What can you see on the page?' },
          { speaker: 'Parent', line: 'Which toy is this?' },
          { speaker: 'Parent', line: 'What happens next?' },
          { speaker: 'Parent', line: 'Who is talking here?' }
        ]
      },
      {
        title: 'Level 2: Open ended questions for two-word level children',
        dialogue: [
          { speaker: 'Parent', line: 'What is the dog doing?' },
          { speaker: 'Parent', line: 'Which toy is the cat playing with?' },
          { speaker: 'Parent', line: 'Where is the red ball?' },
          { speaker: 'Parent', line: 'What does the boy say?' },
          { speaker: 'Parent', line: 'Which character is running fast?' },
          { speaker: 'Parent', line: 'What happens to the little girl?' },
          { speaker: 'Parent', line: 'Which animal is sleeping now?' },
          { speaker: 'Parent', line: 'What can you see in the sky?' },
          { speaker: 'Parent', line: 'Which page do you like best?' },
          { speaker: 'Parent', line: 'What is happening next in the story?' }
        ]
      }
    ]
  },
  {
    id: 'oeq-pool-6',
    title: 'Pretend Play',
    image: '/public/images/activities/openeq/pretend.webp',
    description: "Join in imaginative play with dolls, cars, or kitchen sets.",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Level 1: Open ended questions for one-word level children',
        dialogue: [
          { speaker: 'Parent', line: 'Who is in your house?' },
          { speaker: 'Parent', line: 'What can the doll do?' },
          { speaker: 'Parent', line: 'Which animal is here?' },
          { speaker: 'Parent', line: 'Where is the car going?' },
          { speaker: 'Parent', line: 'What can you cook?' },
          { speaker: 'Parent', line: 'Which toy do you want?' },
          { speaker: 'Parent', line: 'What is the bear doing?' },
          { speaker: 'Parent', line: 'Where is the baby?' },
          { speaker: 'Parent', line: 'Which colour is this block?' },
          { speaker: 'Parent', line: 'What can you build?' }
        ]
      },
      {
        title: 'Level 2: Open ended questions for two-word level children',
        dialogue: [
          { speaker: 'Parent', line: 'What is the doll cooking?' },
          { speaker: 'Parent', line: 'Which animal is running fast?' },
          { speaker: 'Parent', line: 'Where is the car going now?' },
          { speaker: 'Parent', line: 'What is the bear holding?' },
          { speaker: 'Parent', line: 'Who is visiting the house?' },
          { speaker: 'Parent', line: 'Which toy do you want next?' },
          { speaker: 'Parent', line: 'What can the baby do now?' },
          { speaker: 'Parent', line: 'Where can we put the block?' },
          { speaker: 'Parent', line: 'What is the cat chasing?' },
          { speaker: 'Parent', line: 'Which character is talking?' }
        ]
      }
    ]
  },
  {
    id: 'oeq-pool-7',
    title: 'Building Blocks',
    image: '/public/images/activities/openeq/blocks.webp',
    description: "Build towers or structures together. Ask questions about size and position.",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Level 1: Open ended questions for one-word level children',
        dialogue: [
          { speaker: 'Parent', line: 'Which block do you want?' },
          { speaker: 'Parent', line: 'What can you build?' },
          { speaker: 'Parent', line: 'Where can you put this block?' },
          { speaker: 'Parent', line: 'Which colour block is this?' },
          { speaker: 'Parent', line: 'What happens if you stack the blocks?' },
          { speaker: 'Parent', line: 'Which block is big?' },
          { speaker: 'Parent', line: 'Where does this block go?' },
          { speaker: 'Parent', line: 'What can you make with the blocks?' },
          { speaker: 'Parent', line: 'Which block should go on top?' },
          { speaker: 'Parent', line: 'What happens when it falls?' }
        ]
      },
      {
        title: 'Level 2: Open ended questions for two-word level children',
        dialogue: [
          { speaker: 'Parent', line: 'Which block do you want next?' },
          { speaker: 'Parent', line: 'What can you build with the red block?' },
          { speaker: 'Parent', line: 'Where should we put this tall tower?' },
          { speaker: 'Parent', line: 'Which block goes on top now?' },
          { speaker: 'Parent', line: 'What happens if the tower falls down?' },
          { speaker: 'Parent', line: 'Which block is bigger than this one?' },
          { speaker: 'Parent', line: 'How can we make a long bridge?' },
          { speaker: 'Parent', line: 'What can you build with these pieces?' },
          { speaker: 'Parent', line: 'Which colour block should we use next?' },
          { speaker: 'Parent', line: 'How do we make the tower strong?' }
        ]
      }
    ]
  },
  {
    id: 'oeq-pool-8',
    title: 'Pet Care',
    image: '/public/images/activities/openeq/pets.webp',
    description: "Involve your child in feeding or grooming a pet.",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Level 1: Open ended questions for one-word level children',
        dialogue: [
          { speaker: 'Parent', line: 'Which food does the pet want?' },
          { speaker: 'Parent', line: 'Where is the bowl?' },
          { speaker: 'Parent', line: 'What can you do with the water?' },
          { speaker: 'Parent', line: 'Which pet do you want to feed?' },
          { speaker: 'Parent', line: 'What is the cat/dog eating?' },
          { speaker: 'Parent', line: 'Where can you put the food?' },
          { speaker: 'Parent', line: 'Which toy can you give to the pet?' },
          { speaker: 'Parent', line: 'What happens when the pet drinks?' },
          { speaker: 'Parent', line: 'Where is the pet now?' },
          { speaker: 'Parent', line: 'What can you do with the pet?' }
        ]
      },
      {
        title: 'Level 2: Open ended questions for two-word level children',
        dialogue: [
          { speaker: 'Parent', line: 'What can you give the dog to eat?' },
          { speaker: 'Parent', line: 'Which food does the cat want now?' },
          { speaker: 'Parent', line: 'Where should we put the water bowl?' },
          { speaker: 'Parent', line: 'What is the pet doing with the food?' },
          { speaker: 'Parent', line: 'Which toy can you play with the cat?' },
          { speaker: 'Parent', line: 'How does the dog drink the water?' },
          { speaker: 'Parent', line: 'Where is the pet going now?' },
          { speaker: 'Parent', line: 'What can the cat eat first?' },
          { speaker: 'Parent', line: 'Which pet bowl is empty?' },
          { speaker: 'Parent', line: 'How can you help feed the dog?' }
        ]
      }
    ]
  },
  {
    id: 'oeq-pool-9',
    title: 'Outdoor Walk',
    image: '/public/images/activities/openeq/outdoor.webp',
    description: "Explore nature, the park, or the backyard. Ask about what you see.",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Level 1: Open ended questions for one-word level children',
        dialogue: [
          { speaker: 'Parent', line: 'What can you see in the park?' },
          { speaker: 'Parent', line: 'Which slide do you want to go on?' },
          { speaker: 'Parent', line: 'Where is the ball?' },
          { speaker: 'Parent', line: 'Which animal do you see?' },
          { speaker: 'Parent', line: 'What can you do on the swing?' },
          { speaker: 'Parent', line: 'Which path should we walk on?' },
          { speaker: 'Parent', line: 'Where is the tree?' },
          { speaker: 'Parent', line: 'What is the dog doing?' },
          { speaker: 'Parent', line: 'Which flower do you like?' },
          { speaker: 'Parent', line: 'What can you pick up?' }
        ]
      },
      {
        title: 'Level 2: Open ended questions for two-word level children',
        dialogue: [
          { speaker: 'Parent', line: 'Which slide do you want to climb?' },
          { speaker: 'Parent', line: 'What can you do with the ball?' },
          { speaker: 'Parent', line: 'Where is the dog running now?' },
          { speaker: 'Parent', line: 'Which flower do you want to smell?' },
          { speaker: 'Parent', line: 'What is the cat doing over there?' },
          { speaker: 'Parent', line: 'Which path should we walk first?' },
          { speaker: 'Parent', line: 'How can we swing higher?' },
          { speaker: 'Parent', line: 'What is happening on the playground?' },
          { speaker: 'Parent', line: 'Which tree can we climb?' },
          { speaker: 'Parent', line: 'What can you throw into the basket?' }
        ]
      }
    ]
  },
  {
    id: 'oeq-pool-10',
    title: 'Grocery Shopping',
    image: '/public/images/activities/openeq/shopping.webp',
    description: "Turn a shopping trip into a language lesson.",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Level 1: Open ended questions for one-word level children',
        dialogue: [
          { speaker: 'Parent', line: 'Which fruit can you pick?' },
          { speaker: 'Parent', line: 'Where is the milk?' },
          { speaker: 'Parent', line: 'Which bread do you like?' },
          { speaker: 'Parent', line: 'What can you put in the cart?' },
          { speaker: 'Parent', line: 'Which vegetable do you want?' },
          { speaker: 'Parent', line: 'Where are the eggs?' },
          { speaker: 'Parent', line: 'Which snack do you see?' },
          { speaker: 'Parent', line: 'What can you carry?' },
          { speaker: 'Parent', line: 'Which juice do you want?' },
          { speaker: 'Parent', line: 'Where can we put the apples?' }
        ]
      },
      {
        title: 'Level 2: Open ended questions for two-word level children',
        dialogue: [
          { speaker: 'Parent', line: 'Which fruit do you want to take?' },
          { speaker: 'Parent', line: 'Where should we put the milk?' },
          { speaker: 'Parent', line: 'Which bread should we pick first?' },
          { speaker: 'Parent', line: 'What can we put in the shopping cart?' },
          { speaker: 'Parent', line: 'Which vegetable looks fresh?' },
          { speaker: 'Parent', line: 'Where are the eggs in the basket?' },
          { speaker: 'Parent', line: 'Which snack do you want now?' },
          { speaker: 'Parent', line: 'What can you carry to the counter?' },
          { speaker: 'Parent', line: 'Which juice should we buy today?' },
          { speaker: 'Parent', line: 'Where should we put the apples?' }
        ]
      }
    ]
  }
];
