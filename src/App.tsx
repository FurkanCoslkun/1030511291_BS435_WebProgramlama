import { useState } from 'react';
import StartScreen from './components/StartScreen';
import ModeSelect from './components/ModeSelect';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import type { AppState, Mode, GameResult } from './types/game';

export default function App() {


    const goMode = () => setState({ screen: 'mode' });

    const [state, setState] = useState<AppState>({
        screen: 'start',
        classicScore: 0,
    });

    const selectMode = (mode: Mode) => {
        setState({
            screen: 'game',
            mode,
        });
    };

    const endGame = (result: GameResult) => {
        setState(prev => {
            let newScore = prev.classicScore ?? 0;

            if (prev.mode === 'classic' && result.correct) {
                newScore = newScore + 1;  // doğru tahminde skor artar
            }

            return {
                ...prev,
                screen: 'result',
                lastResult: result,
                classicScore: newScore,
            };
        });
    };
    const restart = () => {
        setState({ screen: 'start' });
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
                    score={state.classicScore ?? 0}   //skor
                    onRestart={restart}
                />
            )}
        </div>
    );
}
