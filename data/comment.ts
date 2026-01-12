
import { Activity } from '../types';

export const COMMENT_ACTIVITY_POOL: Activity[] = [
  {
    id: 'com-pool-1',
    title: 'Making Lunch',
    image: '/images/mealtime.webp',
    description: "Narrate your actions: 'I am spreading the jam. I am cutting the bread.'",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Sandwich',
        dialogue: [
          { speaker: 'Parent', line: 'I am getting the bread. Now I need a knife. Spread, spread, spread.' }
        ]
      }
    ]
  },
  {
    id: 'com-pool-2',
    title: 'Getting Dressed',
    image: '/images/dressing.webp',
    description: "Comment on what you are doing: 'Buttoning up the shirt. Pulling on socks.'",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Buttons',
        dialogue: [
          { speaker: 'Parent', line: 'One button. Two buttons. Pop! Through the hole.' }
        ]
      }
    ]
  },
  {
    id: 'com-pool-3',
    title: 'Driving',
    image: '/images/traffic.webp',
    description: "Narrate the drive: 'Stopping at the red light. Turning left.'",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Red Light',
        dialogue: [
          { speaker: 'Parent', line: 'The light is red. Stop car. Waiting, waiting... Green! Go!' }
        ]
      }
    ]
  },
  {
    id: 'com-pool-4',
    title: 'Playground Slide',
    image: '/images/outdoor.webp',
    description: "Comment on child's actions: 'You are climbing up up up. Sliding down!'",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Climbing',
        dialogue: [
          { speaker: 'Parent', line: 'Up the ladder. One step, two steps. You are at the top!' }
        ]
      }
    ]
  },
  {
    id: 'com-pool-5',
    title: 'Washing Dishes',
    image: '/images/chores.webp',
    description: "Narrate washing: 'Scrubbing the plate. Rinse with water. Dry it off.'",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Bubbles',
        dialogue: [
          { speaker: 'Parent', line: 'Look at the bubbles. Pop, pop. The plate is clean now.' }
        ]
      }
    ]
  },
  {
    id: 'com-pool-6',
    title: 'Drawing',
    image: '/images/arts.webp',
    description: "Comment on your own drawing: 'I am drawing a big circle. Here are the eyes.'",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Face',
        dialogue: [
          { speaker: 'Parent', line: 'Round face. Two ears. A happy mouth.' }
        ]
      }
    ]
  },
  {
    id: 'com-pool-7',
    title: 'Building',
    image: '/images/blocks.webp',
    description: "Narrate building: 'Stacking the blue block. It is getting tall. Crash!'",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Tower',
        dialogue: [
          { speaker: 'Parent', line: 'Up, up, up. Oh no, it is wobbling!' }
        ]
      }
    ]
  },
  {
    id: 'com-pool-8',
    title: 'Petting Dog',
    image: '/images/pets.webp',
    description: "Comment: 'Petting the dog softly. He is wagging his tail.'",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Good Boy',
        dialogue: [
          { speaker: 'Parent', line: 'Nice doggy. Soft fur. Wag, wag, wag.' }
        ]
      }
    ]
  },
  {
    id: 'com-pool-9',
    title: 'Vacuuming',
    image: '/images/clean.webp',
    description: "Narrate sounds and actions: 'Vroom vroom. Pushing it forward. Pulling back.'",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Cleaning Rug',
        dialogue: [
          { speaker: 'Parent', line: 'Vroom! It is loud. Sucking up the dust.' }
        ]
      }
    ]
  },
  {
    id: 'com-pool-10',
    title: 'Gardening',
    image: '/images/nature.webp',
    description: "Comment: 'Digging a hole. Putting the seed in. Patting the dirt.'",
    completed: false,
    duration: 0,
    recommendedTime: 15,
    script: [
      {
        title: 'Planting',
        dialogue: [
          { speaker: 'Parent', line: 'Dig, dig, dig. In goes the seed. Cover it up.' }
        ]
      }
    ]
  }
];
