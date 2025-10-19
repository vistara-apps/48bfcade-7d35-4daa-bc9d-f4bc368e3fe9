import { StoryPrompt } from './types';

export const STORY_PROMPTS: StoryPrompt[] = [
  {
    id: '1',
    question: 'What inspired you to start working with cement?',
    category: 'origin',
    placeholder: 'Share your journey into cement artistry...'
  },
  {
    id: '2',
    question: 'Describe your creative process from concept to finished piece',
    category: 'process',
    placeholder: 'Walk us through how you bring ideas to life...'
  },
  {
    id: '3',
    question: 'What makes your cement pieces unique?',
    category: 'inspiration',
    placeholder: 'Tell us what sets your work apart...'
  },
  {
    id: '4',
    question: 'What values guide your craft?',
    category: 'values',
    placeholder: 'Share the principles behind your artistry...'
  },
  {
    id: '5',
    question: 'Where do you find inspiration for new designs?',
    category: 'inspiration',
    placeholder: 'Describe your sources of creative inspiration...'
  },
  {
    id: '6',
    question: 'What sustainability practices do you follow?',
    category: 'values',
    placeholder: 'Share how you approach eco-friendly crafting...'
  }
];

export const PRODUCT_CATEGORIES = [
  { value: 'planter', label: 'Planters & Pots' },
  { value: 'sculpture', label: 'Sculptures' },
  { value: 'tile', label: 'Tiles & Panels' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'other', label: 'Other' }
];
