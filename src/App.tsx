import { useState } from 'react';
import StartScreen from './components/StartScreen';
import ModeSelect from './components/ModeSelect';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import type { AppState, Mode, GameResult } from './types/game';

export default function App() {
    const [state, setState] = useState<AppState>({
        screen: 'start',
        classicScore: 0,
    });

    // Start -> Mode
    const goMode = () => {
        setState(prev => ({ ...prev, screen: 'mode', lastResult: undefined }));
    };

    // Mode -> Game
    const selectMode = (mode: Mode) => {
        setState(prev => ({
            ...prev,
            screen: 'game',
            mode,
            lastResult: undefined,
        }));
    };

    // Game -> Result
    const endGame = (result: GameResult) => {
        setState(prev => {
            let newScore = prev.classicScore ?? 0;
            if (prev.mode === 'classic' && result.correct) newScore += 1;

            return {
                ...prev,
                screen: 'result',
                lastResult: result,
                classicScore: newScore,
            };
        });
    };

    // Result -> Game (aynı modla yeni tur)
    const restart = () => {
        setState(prev => ({
            ...prev,
            screen: 'game',
            lastResult: undefined,
            // mode aynı kalsın
        }));
    };

    // Result -> ModeSelect (mod değiştir)
    const goMenu = () => {
        setState(prev => ({
            ...prev,
            screen: 'mode',
            lastResult: undefined,
        }));
    };

    // Result -> StartScreen (ana menü)
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

            {state.screen === 'game' && state.mode && (
                <GameScreen mode={state.mode} onEnd={endGame} />
            )}

            {state.screen === 'result' && state.lastResult && (
                <ResultScreen
                    result={state.lastResult}
                    score={state.classicScore ?? 0}
                    onRestart={restart}
                    onMenu={goMenu}
                    onHome={goHome}
                />
            )}
        </div>
    );
}
