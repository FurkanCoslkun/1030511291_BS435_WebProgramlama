import { useState } from 'react';
import type { Mode, Difficulty } from '../types/game';

type Props = {
    onSelect: (mode: Mode, difficulty: Difficulty) => void;
};

export default function ModeSelect({ onSelect }: Props) {
    const [difficulty, setDifficulty] = useState<Difficulty>('medium');

    const diffLabel =
        difficulty === 'easy' ? 'Kolay' : difficulty === 'medium' ? 'Orta' : 'Zor';

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
                <h2 style={{ margin: 0, fontSize: 26 }}>Mod Seç</h2>
                <p style={{ marginTop: 10, color: '#cbd5e1', fontSize: 14 }}>
                    Önce zorluk seç, sonra modu başlat.
                </p>

                <div style={{ marginTop: 18, marginBottom: 18 }}>
                    <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 10 }}>
                        Zorluk: <b style={{ color: '#e5e7eb' }}>{diffLabel}</b>
                    </div>

                    <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                        {(['easy', 'medium', 'hard'] as const).map((d) => {
                            const active = d === difficulty;
                            const label = d === 'easy' ? 'Kolay' : d === 'medium' ? 'Orta' : 'Zor';
                            return (
                                <button
                                    key={d}
                                    type="button"
                                    onClick={() => setDifficulty(d)}
                                    style={{
                                        padding: '10px 14px',
                                        borderRadius: 12,
                                        border: active
                                            ? '1px solid rgba(99,102,241,0.55)'
                                            : '1px solid rgba(255,255,255,0.16)',
                                        background: active ? 'rgba(99,102,241,0.22)' : 'rgba(0,0,0,0.22)',
                                        color: '#e5e7eb',
                                        cursor: 'pointer',
                                        fontWeight: 700,
                                        minWidth: 110,
                                    }}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>

                    <div style={{ marginTop: 10, fontSize: 12, color: '#94a3b8', lineHeight: 1.5 }}>
                        {difficulty === 'easy' && 'İpucu en baştan açık. (Zamanlı: 20s)'}
                        {difficulty === 'medium' && 'İpucu ilk yanlış seçimden sonra gelir. (Zamanlı: 15s)'}
                        {difficulty === 'hard' && 'İpucu yok. (Zamanlı: 10s)'}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                        type="button"
                        onClick={() => onSelect('classic', difficulty)}
                        style={{
                            padding: '12px 16px',
                            borderRadius: 12,
                            border: '1px solid rgba(255,255,255,0.14)',
                            background: 'rgba(255,255,255,0.08)',
                            color: '#e5e7eb',
                            fontWeight: 800,
                            cursor: 'pointer',
                            minWidth: 170,
                        }}
                    >
                        Klasik Başlat 🎮
                    </button>

                    <button
                        type="button"
                        onClick={() => onSelect('time', difficulty)}
                        style={{
                            padding: '12px 16px',
                            borderRadius: 12,
                            border: '1px solid rgba(255,255,255,0.14)',
                            background:
                                'linear-gradient(135deg, rgba(99,102,241,0.95), rgba(34,197,94,0.75))',
                            color: '#0b0f19',
                            fontWeight: 900,
                            cursor: 'pointer',
                            minWidth: 170,
                            boxShadow: '0 10px 22px rgba(0,0,0,0.35)',
                        }}
                    >
                        Zamanlı Başlat ⏱
                    </button>
                </div>
            </div>
        </div>
    );
}
