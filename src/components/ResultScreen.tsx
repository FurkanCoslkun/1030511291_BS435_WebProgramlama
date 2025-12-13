import type { GameResult } from '../types/game';

type Props = {
    result: GameResult;
    score: number;
    onRestart: () => void;
};

export default function ResultScreen({ result, score, onRestart }: Props) {
    const title = result.correct ? 'Tebrikler! 🎉' : 'Bu tur olmadı 😅';
    const desc = result.correct
        ? 'AI görselini doğru buldun. Yeni tura geçebilirsin.'
        : 'AI görselini bulamadın. İstersen hemen yeni tur başlat.';

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'grid',
                placeItems: 'center',
                padding: 24,
                background:
                    'radial-gradient(1200px circle at 20% 10%, rgba(99,102,241,0.25), transparent 40%), radial-gradient(900px circle at 80% 40%, rgba(34,197,94,0.18), transparent 45%), #0b0f19',
                color: '#e5e7eb',
            }}
        >
            <div
                style={{
                    width: 'min(760px, 100%)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    borderRadius: 16,
                    padding: 22,
                    background: 'rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
                    textAlign: 'center',
                }}
            >
                <div
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '6px 10px',
                        borderRadius: 999,
                        background: result.correct ? 'rgba(34,197,94,0.18)' : 'rgba(239,68,68,0.16)',
                        border: result.correct ? '1px solid rgba(34,197,94,0.30)' : '1px solid rgba(239,68,68,0.28)',
                        fontSize: 12,
                        color: result.correct ? '#bbf7d0' : '#fecaca',
                        marginBottom: 10,
                    }}
                >
                    {result.correct ? 'Doğru Tahmin' : 'Yanlış Tahmin'}
                </div>

                <h2 style={{ margin: 0, fontSize: 26, letterSpacing: -0.2 }}>{title}</h2>
                <p style={{ marginTop: 10, marginBottom: 18, fontSize: 14, color: '#cbd5e1' }}>{desc}</p>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 12,
                        margin: '0 auto 18px',
                        maxWidth: 520,
                    }}
                >
                    <div
                        style={{
                            borderRadius: 12,
                            padding: 12,
                            border: '1px solid rgba(255,255,255,0.10)',
                            background: 'rgba(0,0,0,0.22)',
                        }}
                    >
                        <div style={{ fontSize: 12, color: '#94a3b8' }}>Klasik Mod Skoru</div>
                        <div style={{ fontSize: 20, fontWeight: 800, marginTop: 4 }}>{score}</div>
                    </div>

                    <div
                        style={{
                            borderRadius: 12,
                            padding: 12,
                            border: '1px solid rgba(255,255,255,0.10)',
                            background: 'rgba(0,0,0,0.22)',
                        }}
                    >
                        <div style={{ fontSize: 12, color: '#94a3b8' }}>Seçim</div>
                        <div style={{ fontSize: 13, marginTop: 6, color: '#e5e7eb' }}>
                            1. seçim: <b>{result.firstGuessId}</b>
                            {result.secondGuessId ? (
                                <>
                                    <br />
                                    2. seçim: <b>{result.secondGuessId}</b>
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>

                <button
                    onClick={onRestart}
                    style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: 12,
                        border: '1px solid rgba(255,255,255,0.14)',
                        background: 'linear-gradient(135deg, rgba(99,102,241,0.95), rgba(34,197,94,0.75))',
                        color: '#0b0f19',
                        fontWeight: 800,
                        cursor: 'pointer',
                        boxShadow: '0 10px 22px rgba(0,0,0,0.35)',
                    }}
                >
                    Yeni Tur 🔁
                </button>

                <div style={{ marginTop: 10, fontSize: 12, color: '#94a3b8' }}>
                    Not: Zamanlı mod için geri sayımı bir sonraki adımda ekleyeceğiz.
                </div>
            </div>
        </div>
    );
}

