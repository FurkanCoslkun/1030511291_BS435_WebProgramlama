import type { ImageItem } from '../types/game';

export const images: ImageItem[] = [
    {
        id: 'real-portrait-1',
        url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
        isAI: false,
        category: 'portrait',
        hints: ['Gözlerdeki detaylara dikkat et.'],
    },
    {
        id: 'real-architecture-1',
        url: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
        isAI: false,
        category: 'architecture',
        hints: ['Bina dokusuna dikkat et.'],
    },
    {
        id: 'ai-portrait-1',
        url: 'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg',
        isAI: true,
        category: 'portrait',
        hints: ['Ten dokusunda yapaylık olabilir.'],
    },
];