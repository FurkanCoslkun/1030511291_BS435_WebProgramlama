// src/App.tsx
import { useState } from 'react';
import StartScreen from './components/StartScreen';
import ModeSelect from './components/ModeSelect';
import GameScreen from './components/GameScreen';
import type { AppState, Mode, GameResult } from './types/game';

export default function App() {
    const [state, setState] = useState<AppState>({ screen: 'start' });

    // Start ekranından Mode seçimi
    const goMode = () => setState({ screen: 'mode' });

    // Mode seçildiğinde Game ekranı
    const selectMode = (mode: Mode) => {
        setState({
            screen: 'game',
            mode,
        });
    };

    // GameScreen'den gelen sonuc
    const endGame = (result: GameResult) => {
        console.log('Oyun bitti:', result);
        alert(result.correct ? 'Doğru tahmin!' : 'Yanlış tahmin!');

    };

    return (
        <div>
            {state.screen === 'start' && <StartScreen onStart={goMode} />}

            {state.screen === 'mode' && (
                <ModeSelect onSelect={selectMode} />
            )}

            {state.screen === 'game' && state.mode && (
                <GameScreen mode={state.mode} onEnd={endGame} />
            )}
        </div>
    );
}
