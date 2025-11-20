
export type Mode = 'classic' | 'time';

export type Screen = 'start' | 'mode' | 'game' | 'result';

export interface GameResult {
    correct: boolean;
    firstGuessId?: string;
    secondGuessId?: string;
}

export interface AppState {
    screen: Screen;
    mode?: Mode;
    lastResult?: GameResult;
}

export interface ImageItem {
    id: string;
    url: string;
    isAI: boolean;
    category: 'portrait' | 'landscape' | 'architecture' | 'abstract';
    hints: string[];
}