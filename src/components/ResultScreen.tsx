import type { GameResult } from '../types/game';

type Props = {
    result: GameResult;
    score: number;
    onRestart: () => void;
};

export default function ResultScreen({ result, score, onRestart }: Props) {
    const message = result.correct
        ? 'Tebrikler! Doğru tahmin yaptın. 🎉'
        : 'Bu tur olmadı, tekrar deneyebilirsin. 😅';

    return (
        <div style={{ padding: 24, maxWidth: 640, margin: '40px auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Sonuç</h2>
            <p style={{ fontSize: 14, marginBottom: 16 }}>{message}</p>

            <p style={{ fontSize: 14, marginBottom: 20 }}>
                <b>Klasik Mod Skoru:</b> {score}
            </p>

            <button
                onClick={onRestart}
                style={{
                    padding: '10px 16px',
                    borderRadius: 8,
                    background: '#111827',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                Yeni Tura Başla 🔁
            </button>
        </div>
    );
}
