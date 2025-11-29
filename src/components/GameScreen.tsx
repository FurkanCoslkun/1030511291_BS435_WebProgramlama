
import { useState } from 'react';
import type { Mode, GameResult, ImageItem } from '../types/game';
import { images } from '../data/images';

type Props = {
    mode: Mode;
    onEnd: (result: GameResult) => void;
};

// Rastgele eleman seç
function getRandomItem<T>(arr: T[]): T {
    const idx = Math.floor(Math.random() * arr.length);
    return arr[idx];
}

// Diziyi karıştır (Fisher–Yates)
function shuffle<T>(arr: T[]): T[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

// Her tur için: 1 AI + 2 gerçek seç
function createRoundImages(all: ImageItem[]): ImageItem[] {
    const real = all.filter((img) => !img.isAI);
    const ai = all.filter((img) => img.isAI);

    if (real.length < 2 || ai.length < 1) {
        console.warn('Yeterli gerçek/AI görseli yok, fallback olarak ilk 3 eleman kullanılıyor.');
        return all.slice(0, 3);
    }

    const pickedAI = getRandomItem(ai);

    // gerçeklerden ikisini seç
    const realCopy = [...real];
    const firstReal = getRandomItem(realCopy);
    const remainingReal = realCopy.filter((r) => r.id !== firstReal.id);
    const secondReal = getRandomItem(remainingReal);

    // 3'lü seti karışık sıraya koy
    return shuffle([pickedAI, firstReal, secondReal]);
}

export default function GameScreen({ mode, onEnd }: Props) {
    const [roundImages] = useState<ImageItem[]>(() => createRoundImages(images));
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const modeLabel = mode === 'classic' ? 'Klasik (Süre Yok)' : 'Zamanlı (Geri Sayım)';

    const handleSelect = (image: ImageItem) => {
        // Sadece ilk tahmine izin ver
        if (selectedId) return;

        setSelectedId(image.id);

        const result: GameResult = {
            correct: image.isAI,
            firstGuessId: image.id,
        };

        onEnd(result);
    };

    return (
        <div style={{ padding: 24, maxWidth: 900, margin: '40px auto' }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8, textAlign: 'center' }}>
                Oyun Ekranı
            </h2>

            <p style={{ fontSize: 14, color: '#555', marginBottom: 16, textAlign: 'center' }}>
                Seçilen mod: <b>{modeLabel}</b>
            </p>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                    gap: 16,
                    marginBottom: 24,
                }}
            >
                {roundImages.map((img) => {
                    const isSelected = img.id === selectedId;

                    return (
                        <button
                            key={img.id}
                            onClick={() => handleSelect(img)}
                            style={{
                                borderRadius: 12,
                                overflow: 'hidden',
                                border: isSelected ? '3px solid #2563eb' : '1px solid #e5e7eb',
                                padding: 0,
                                cursor: selectedId ? 'default' : 'pointer',
                                opacity: selectedId && !isSelected ? 0.6 : 1,
                                background: '#fff',
                            }}
                            disabled={!!selectedId} // ilk tahminden sonra hepsi kilit
                        >
                            <img
                                src={img.url}
                                alt={img.category}
                                style={{
                                    width: '100%',
                                    height: 220,
                                    objectFit: 'cover',
                                    display: 'block',
                                }}
                            />
                        </button>
                    );
                })}
            </div>

            <p style={{ fontSize: 13, color: '#777', textAlign: 'center' }}>
                sadece ilk tahmin aktif.
                <br />
                Gelecek hafta: yanlış ilk tahminde ipucu + ikinci şans eklenecek.
            </p>
        </div>
    );
}
