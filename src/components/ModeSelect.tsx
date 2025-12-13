import type { Mode } from '../types/game';

type Props = {
    onSelect: (mode: Mode) => void;
};

export default function ModeSelect({ onSelect }: Props) {
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
            <div style={{ width: 'min(820px, 100%)' }}>
                <div
                    style={{
                        border: '1px solid rgba(255,255,255,0.10)',
                        borderRadius: 16,
                        padding: 22,
                        background: 'rgba(255,255,255,0.06)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
                    }}
                >
                    <div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 8,
                            padding: '6px 10px',
                            borderRadius: 999,
                            background: 'rgba(99,102,241,0.18)',
                            border: '1px solid rgba(99,102,241,0.35)',
                            fontSize: 12,
                            color: '#c7d2fe',
                            marginBottom: 12,
                        }}
                    >
                        <span>Adım 1/2</span>
                        <span style={{ opacity: 0.7 }}>•</span>
                        <span>Mod Seçimi</span>
                    </div>

                    <h2 style={{ margin: 0, fontSize: 22, letterSpacing: -0.2 }}>Oyun Modu Seç</h2>
                    <p style={{ marginTop: 8, marginBottom: 16, fontSize: 13, color: '#cbd5e1' }}>
                        Klasik modda süre yoktur. Zamanlı modda tur başına bir geri sayım olur.
                    </p>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                            gap: 14,
                        }}
                    >
                        {/* Classic Card */}
                        <button
                            onClick={() => onSelect('classic')}
                            style={{
                                textAlign: 'left',
                                borderRadius: 14,
                                padding: 16,
                                border: '1px solid rgba(255,255,255,0.12)',
                                background: 'rgba(0,0,0,0.24)',
                                color: '#e5e7eb',
                                cursor: 'pointer',
                                boxShadow: '0 10px 22px rgba(0,0,0,0.25)',
                            }}
                        >
                            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>Klasik</div>
                            <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.35 }}>
                                Süre sınırı yok. Yanlış ilk tahminde ipucu alırsın, ikinci şansın olur.
                            </div>

                            <div
                                style={{
                                    marginTop: 12,
                                    display: 'inline-flex',
                                    gap: 8,
                                    alignItems: 'center',
                                    padding: '6px 10px',
                                    borderRadius: 999,
                                    background: 'rgba(34,197,94,0.18)',
                                    border: '1px solid rgba(34,197,94,0.28)',
                                    color: '#bbf7d0',
                                    fontSize: 12,
                                }}
                            >
                                Önerilen ✓
                            </div>
                        </button>

                        {/* Time Card */}
                        <button
                            onClick={() => onSelect('time')}
                            style={{
                                textAlign: 'left',
                                borderRadius: 14,
                                padding: 16,
                                border: '1px solid rgba(255,255,255,0.12)',
                                background: 'rgba(0,0,0,0.24)',
                                color: '#e5e7eb',
                                cursor: 'pointer',
                                boxShadow: '0 10px 22px rgba(0,0,0,0.25)',
                            }}
                        >
                            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>Zamanlı</div>
                            <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.35 }}>
                                Her turda geri sayım olacak. Süre biterse tur otomatik kaybedilir (bir sonraki adımda ekleyeceğiz).
                            </div>

                            <div
                                style={{
                                    marginTop: 12,
                                    display: 'inline-flex',
                                    gap: 8,
                                    alignItems: 'center',
                                    padding: '6px 10px',
                                    borderRadius: 999,
                                    background: 'rgba(99,102,241,0.18)',
                                    border: '1px solid rgba(99,102,241,0.30)',
                                    color: '#c7d2fe',
                                    fontSize: 12,
                                }}
                            >
                                Challenge ⚡
                            </div>
                        </button>
                    </div>

                    <div style={{ marginTop: 14, fontSize: 12, color: '#94a3b8' }}>
                        Not: Zamanlı modun timer özelliğini bir sonraki adımda ekleyeceğiz.
                    </div>
                </div>
            </div>
        </div>
    );
}
