export type Mode = 'classic' | 'time';
export type Difficulty = 'easy' | 'medium' | 'hard';

export type ImageItem = {
    id: string;
    url: string;
    isAI: boolean;
    category: 'portrait' | 'nature' | 'architecture' | 'art';
    hints: string[];
};

export type GameResult = {
    correct: boolean;
    firstGuessId: string;
    secondGuessId?: string;
};

export type Screen = 'start' | 'mode' | 'game' | 'result';

export type AppState = {
    screen: Screen;
    classicScore: number;
    mode?: Mode;           // game/result ekranlarında dolu olacak
    difficulty?: Difficulty;
    lastResult?: GameResult;
};
