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
