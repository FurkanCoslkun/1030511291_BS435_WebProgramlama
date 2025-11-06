// src/components/GameScreen.tsx
import type { Mode, GameResult } from '../types/game';

type Props = {
    mode: Mode;
    onEnd: (result: GameResult) => void;
};

export default function GameScreen({ mode, onEnd }: Props) {
    const modeLabel = mode === 'classic' ? 'Klasik (Süre Yok)' : 'Zamanlı (Geri Sayım)';

    return (
        <div style={{ padding: 24, maxWidth: 640, margin: '40px auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Oyun Ekranı</h2>
            <p style={{ fontSize: 14, color: '#555', marginBottom: 16 }}>
                Seçilen mod: <b>{modeLabel}</b>
            </p>

            <div
                style={{
                    border: '1px solid #e0e0e0',
                    padding: 16,
                    borderRadius: 8,
                    marginBottom: 20,
                    background: '#fafafa',
                }}
            >
                <p style={{ fontSize: 14, color: '#777' }}>
                    3 görsel
                </p>
            </div>

            <p style={{ fontSize: 13, color: '#777', marginBottom: 12 }}>
                Şimdilik test için: aşağıdaki butonlarla turu bitirebilirsin.
            </p>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <button
                    onClick={() => onEnd({ correct: true })}
                    style={{
                        padding: '10px 16px',
                        borderRadius: 8,
                        background: '#16a34a',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    (Geçici) Doğru Bitti ✅
                </button>

                <button
                    onClick={() => onEnd({ correct: false })}
                    style={{
                        padding: '10px 16px',
                        borderRadius: 8,
                        background: '#dc2626',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    (Geçici) Yanlış Bitti ❌
                </button>
            </div>
        </div>
    );
}
