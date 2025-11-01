import { useState } from 'react';
import StartScreen from './components/StartScreen';
import ModeSelect from './components/ModeSelect';
import type { AppState, Mode } from './types/game';

export default function App() {
    const [state, setState] = useState<AppState>({ screen: 'start' });

    // Start ekranından Mode seçimine geç
    const goMode = () => setState({ screen: 'mode' });

    // Mode seçildiğinde şimdilik sadece state'e yazıyoruz
    const selectMode = (mode: Mode) => {
        // Kısım B’de burada 'game' ekranına geçeceğiz.
        setState({ screen: 'mode', mode });
    };

    return (
        <div>
            {state.screen === 'start' && <StartScreen onStart={goMode} />}

            {state.screen === 'mode' && (
                <ModeSelect onSelect={selectMode} />
            )}
        </div>
    );
}
