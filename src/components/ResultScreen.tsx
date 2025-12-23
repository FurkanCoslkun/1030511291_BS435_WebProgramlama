import type { GameResult } from '../types/game';

type Props = {
    result: GameResult;
    score: number;
    onRestart: () => void;
    onMenu: () => void;  // ModeSelect
    onHome: () => void;  // StartScreen
};

export default function ResultScreen({
                                         result,
                                         score,
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
            ? 'AI görselini doğru buldun. Yeni tura geçebilir, modu değiştirebilir veya ana menüye dönebilirsin.'
            : 'AI görselini bulamadın. Yeni tur başlatabilir, modu değiştirebilir veya ana menüye dönebilirsin.';

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
                <div
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '6px 10px',
                        borderRadius: 999,
                        background: isTimeout
                            ? 'rgba(245,158,11,0.18)'
                            : result.correct
                                ? 'rgba(34,197,94,0.18)'
                                : 'rgba(239,68,68,0.16)',
                        border: isTimeout
                            ? '1px solid rgba(245,158,11,0.30)'
                            : result.correct
                                ? '1px solid rgba(34,197,94,0.30)'
                                : '1px solid rgba(239,68,68,0.28)',
                        fontSize: 12,
                        color: isTimeout
                            ? '#fde68a'
                            : result.correct
                                ? '#bbf7d0'
                                : '#fecaca',
                        marginBottom: 10,
                    }}
                >
                    {isTimeout ? 'Süre Doldu' : result.correct ? 'Doğru Tahmin' : 'Yanlış Tahmin'}
                </div>

                <h2 style={{ margin: 0, fontSize: 26, letterSpacing: -0.2 }}>{title}</h2>
                <p style={{ marginTop: 10, marginBottom: 18, fontSize: 14, color: '#cbd5e1' }}>
                    {desc}
                </p>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 12,
                        margin: '0 auto 18px',
                        maxWidth: 560,
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
                        <div style={{ fontSize: 12, color: '#94a3b8' }}>Tur Bilgisi</div>
                        <div style={{ fontSize: 13, marginTop: 6, color: '#e5e7eb' }}>
                            {isTimeout ? (
                                <span>Süre doldu, seçim yapılmadı.</span>
                            ) : (
                                <>
                                    1. seçim: <b>{result.firstGuessId}</b>
                                    {result.secondGuessId && (
                                        <>
                                            <br />
                                            2. seçim: <b>{result.secondGuessId}</b>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        gap: 12,
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}
                >
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
                            fontWeight: 800,
                            cursor: 'pointer',
                            boxShadow: '0 10px 22px rgba(0,0,0,0.35)',
                            minWidth: 160,
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
