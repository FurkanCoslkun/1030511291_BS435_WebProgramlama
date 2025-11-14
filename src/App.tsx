import { useState } from 'react';
import StartScreen from './components/StartScreen';
import ModeSelect from './components/ModeSelect';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import type { AppState, Mode, GameResult } from './types/game';

export default function App() {
    const [state, setState] = useState<AppState>({ screen: 'start' });

    const goMode = () => setState({ screen: 'mode' });

    const selectMode = (mode: Mode) => {
        setState({
            screen: 'game',
            mode,
        });
    };

    const endGame = (result: GameResult) => {
        setState(prev => ({
            ...prev,
            screen: 'result',
            lastResult: result,
        }));
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
                <ResultScreen result={state.lastResult} onRestart={restart} />
            )}
        </div>
    );
}
