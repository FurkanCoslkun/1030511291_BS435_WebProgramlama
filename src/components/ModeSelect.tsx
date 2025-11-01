
import type { Mode } from '../types/game';

type Props = { onSelect: (mode: Mode) => void };

export default function ModeSelect({ onSelect }: Props) {
    return (
        <div style={{ padding: 24, maxWidth: 640, margin: '40px auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Oyun Modunu Seç</h2>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <button
                    onClick={() => onSelect('classic')}
                    style={{
                        padding: '10px 16px',
                        borderRadius: 8,
                        background: '#fff',
                        border: '1px solid #ddd',
                        cursor: 'pointer'
                    }}
                >
                    Klasik (Süre Yok)
                </button>

                <button
                    onClick={() => onSelect('time')}
                    style={{
                        padding: '10px 16px',
                        borderRadius: 8,
                        background: '#fff',
                        border: '1px solid #ddd',
                        cursor: 'pointer'
                    }}
                >
                    Zamanlı (Geri Sayım)
                </button>
            </div>
        </div>
    );
}
