import { useState } from 'react';
import StartScreen from './components/StartScreen';
import ModeSelect from './components/ModeSelect';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import type { AppState, Mode, Difficulty, GameResult } from './types/game';

export default function App() {
    const [state, setState] = useState<AppState>({
        screen: 'start',
        classicScore: 0,
    });

    /* Start -> Mode */
    const goMode = () => {
        setState(prev => ({
            ...prev,
            screen: 'mode',
            lastResult: undefined,
        }));
    };

    /* Mode -> Game */
    const selectMode = (mode: Mode, difficulty: Difficulty) => {
        setState(prev => ({
            ...prev,
            screen: 'game',
            mode,
            difficulty,
            lastResult: undefined,
        }));
    };

    /* Game -> Result */
    const endGame = (result: GameResult) => {
        setState(prev => {
            // Güvenlik: state bozuksa mode ekranına dön
            if (!prev.mode || !prev.difficulty) {
                return {
                    ...prev,
                    screen: 'mode',
                    lastResult: result,
                };
            }

            let newScore = prev.classicScore ?? 0;
            if (prev.mode === 'classic' && result.correct) {
                newScore += 1;
            }

            return {
                ...prev,
                screen: 'result',
                lastResult: result,
                classicScore: newScore,
            };
        });
    };

    /* Result -> Game (aynı mod + zorlukla yeni tur) */
    const restart = () => {
        setState(prev => {
            if (!prev.mode || !prev.difficulty) {
                return {
                    ...prev,
                    screen: 'mode',
                    lastResult: undefined,
                };
            }

            return {
                ...prev,
                screen: 'game',
                lastResult: undefined,
            };
        });
    };

    /* Result -> ModeSelect */
    const goMenu = () => {
        setState(prev => ({
            ...prev,
            screen: 'mode',
            lastResult: undefined,
        }));
    };

    /* Her yerden -> Start */
    const goHome = () => {
        setState(prev => ({
            ...prev,
            screen: 'start',
            lastResult: undefined,
        }));
    };

    return (
        <div>
            {state.screen === 'start' && <StartScreen onStart={goMode} />}

            {state.screen === 'mode' && <ModeSelect onSelect={selectMode} />}

            {state.screen === 'game' &&
                (state.mode && state.difficulty ? (
                    <GameScreen
                        key={`${state.mode}-${state.difficulty}-${state.classicScore}`}
                        mode={state.mode}
                        difficulty={state.difficulty}
                        onEnd={endGame}
                    />

                ) : (
                    <div style={{ padding: 24, color: 'red' }}>
                        HATA: Oyun başlatılamadı (mode / difficulty eksik)
                    </div>
                ))}

            {state.screen === 'result' &&
                (state.lastResult ? (
                    <ResultScreen
                        result={state.lastResult}
                        score={state.classicScore ?? 0}
                        mode={state.mode}
                        difficulty={state.difficulty}
                        onRestart={restart}
                        onMenu={goMenu}
                        onHome={goHome}
                    />
                ) : (
                    <div style={{ padding: 24, color: 'red' }}>
                        HATA: Sonuç bilgisi bulunamadı
                    </div>
                ))}
        </div>
    );
}
