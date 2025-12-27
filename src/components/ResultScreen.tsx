import type { Difficulty, GameResult, Mode } from '../types/game';

type Props = {
    result: GameResult;
    score: number;
    mode?: Mode;
    difficulty?: Difficulty;
    onRestart: () => void;
    onMenu: () => void;
    onHome: () => void;
};

function modeLabel(mode?: Mode) {
    if (mode === 'time') return 'Zamanlı';
    if (mode === 'classic') return 'Klasik';
    return '—';
}

function diffLabel(d?: Difficulty) {
    if (d === 'easy') return 'Kolay';
    if (d === 'medium') return 'Orta';
    if (d === 'hard') return 'Zor';
    return '—';
}

export default function ResultScreen({
                                         result,
                                         score,
                                         mode,
                                         difficulty,
                                         onRestart,
                                         onMenu,
                                         onHome,
                                     }: Props) {
    const isTimeout = result.firstGuessId === 'timeout';

    const title = isTimeout
        ? 'Süre Doldu ⏱️'
        : result.correct
            ? 'Tebrikler! 🎉'
            : 'Bu tur olmadı 😅';

    const desc = isTimeout
        ? 'Zaman dolduğu için bu tur otomatik olarak kaybedildi.'
        : result.correct
            ? 'AI görselini doğru buldun.'
            : 'AI görselini bulamadın.';

    const metaMode = modeLabel(mode);
    const metaDiff = diffLabel(difficulty);

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
                    width: 'min(820px, 100%)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    borderRadius: 16,
                    padding: 22,
                    background: 'rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
                    textAlign: 'center',
                }}
            >
                <h2 style={{ margin: 0, fontSize: 26, letterSpacing: -0.2 }}>{title}</h2>

                <p style={{ marginTop: 10, marginBottom: 16, fontSize: 14, color: '#cbd5e1' }}>
                    {desc}
                </p>

                {/* Mod + Zorluk bilgisi */}
                <div
                    style={{
                        display: 'flex',
                        gap: 10,
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        marginBottom: 14,
                    }}
                >
                    <div
                        style={{
                            padding: '6px 10px',
                            borderRadius: 999,
                            background: 'rgba(99,102,241,0.18)',
                            border: '1px solid rgba(99,102,241,0.35)',
                            fontSize: 12,
                            color: '#c7d2fe',
                        }}
                    >
                        Mod: <b style={{ color: '#fff' }}>{metaMode}</b>
                    </div>

                    <div
                        style={{
                            padding: '6px 10px',
                            borderRadius: 999,
                            background: 'rgba(34,197,94,0.14)',
                            border: '1px solid rgba(34,197,94,0.28)',
                            fontSize: 12,
                            color: '#bbf7d0',
                        }}
                    >
                        Zorluk: <b style={{ color: '#fff' }}>{metaDiff}</b>
                    </div>
                </div>

                {/* ✅ Skor kutusu: SADECE KLASİK MOD */}
                {mode === 'classic' && (
                    <div
                        style={{
                            borderRadius: 12,
                            padding: 12,
                            border: '1px solid rgba(255,255,255,0.10)',
                            background: 'rgba(0,0,0,0.22)',
                            maxWidth: 420,
                            margin: '0 auto 18px',
                        }}
                    >
                        <div style={{ fontSize: 12, color: '#94a3b8' }}>Klasik Mod Skoru</div>
                        <div style={{ fontSize: 22, fontWeight: 800, marginTop: 6 }}>{score}</div>
                    </div>
                )}

                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                        type="button"
                        onClick={onRestart}
                        style={{
                            padding: '12px 16px',
                            borderRadius: 12,
                            border: '1px solid rgba(255,255,255,0.14)',
                            background:
                                'linear-gradient(135deg, rgba(99,102,241,0.95), rgba(34,197,94,0.75))',
                            color: '#0b0f19',
                            fontWeight: 900,
                            cursor: 'pointer',
                            minWidth: 160,
                            boxShadow: '0 10px 22px rgba(0,0,0,0.35)',
                        }}
                    >
                        Yeni Tur 🔁
                    </button>

                    <button
                        type="button"
                        onClick={onMenu}
                        style={{
                            padding: '12px 16px',
                            borderRadius: 12,
                            border: '1px solid rgba(255,255,255,0.20)',
                            background: 'rgba(0,0,0,0.20)',
                            color: '#e5e7eb',
                            fontWeight: 700,
                            cursor: 'pointer',
                            minWidth: 160,
                        }}
                    >
                        Mod Değiştir 🎮
                    </button>

                    <button
                        type="button"
                        onClick={onHome}
                        style={{
                            padding: '12px 16px',
                            borderRadius: 12,
                            border: '1px solid rgba(255,255,255,0.20)',
                            background: 'rgba(255,255,255,0.06)',
                            color: '#e5e7eb',
                            fontWeight: 700,
                            cursor: 'pointer',
                            minWidth: 160,
                        }}
                    >
                        Ana Menü 🏠
                    </button>
                </div>
            </div>
        </div>
    );
}
