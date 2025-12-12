
import { useState } from 'react';
import type { Mode, GameResult, ImageItem } from '../types/game';
import { images } from '../Data/images';

type Props = {
    mode: Mode;
    onEnd: (result: GameResult) => void;
};

// Rastgele eleman seç
function getRandomItem<T>(arr: T[]): T {
    const idx = Math.floor(Math.random() * arr.length);
    return arr[idx];
}

// Diziyi karıştır
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

    const realCopy = [...real];
    const firstReal = getRandomItem(realCopy);
    const remainingReal = realCopy.filter((r) => r.id !== firstReal.id);
    const secondReal = getRandomItem(remainingReal);

    return shuffle([pickedAI, firstReal, secondReal]);
}

export default function GameScreen({ mode, onEnd }: Props) {
    const [roundImages] = useState<ImageItem[]>(() => createRoundImages(images));

    const [firstGuessId, setFirstGuessId] = useState<string | null>(null);
    const [secondGuessId, setSecondGuessId] = useState<string | null>(null);
    const [isFirstGuessCorrect, setIsFirstGuessCorrect] = useState<boolean | null>(null);
    const [showHint, setShowHint] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const modeLabel = mode === 'classic' ? 'Klasik (Süre Yok)' : 'Zamanlı (Geri Sayım)';
    const aiImage = roundImages.find((img) => img.isAI) || null;

    const handleSelect = (image: ImageItem) => {
        if (isFinished) return;

        // 1. TAHMİN
        if (!firstGuessId) {
            setFirstGuessId(image.id);

            if (image.isAI) {
                // İlk tahmin doğru → oyun biter
                setIsFirstGuessCorrect(true);
                setIsFinished(true);

                const result: GameResult = {
                    correct: true,
                    firstGuessId: image.id,
                };
                onEnd(result);
            } else {
                // İlk tahmin yanlış → ipucu göster, ikinci şansı bekle
                setIsFirstGuessCorrect(false);
                setShowHint(true);
            }
            return;
        }

        // 2. TAHMİN (ilk tahmin yanlışsa ve bu ikinci seçimse)
        if (!secondGuessId && firstGuessId && !isFirstGuessCorrect && image.id !== firstGuessId) {
            setSecondGuessId(image.id);
            const correct = image.isAI;
            setIsFinished(true);

            const result: GameResult = {
                correct,
                firstGuessId,
                secondGuessId: image.id,
            };

            onEnd(result);
        }
    };

    const canClick = (img: ImageItem): boolean => {
        if (isFinished) return false;

        // İlk tahmin yapılmadı → her şeye basabilir
        if (!firstGuessId) return true;

        // İlk tahmin yanlış → ikinci şans:
        // Sadece diğer iki karta basılabilir (ilk seçilen hariç, ikinci henüz yokken)
        if (!isFirstGuessCorrect && !secondGuessId) {
            return img.id !== firstGuessId;
        }


        return false;
    };

    return (
        <div style={{ padding: 24, maxWidth: 900, margin: '40px auto' }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8, textAlign: 'center' }}>
                Oyun Ekranı
            </h2>

            <p style={{ fontSize: 14, color: '#555', marginBottom: 16, textAlign: 'center' }}>
                Seçilen mod: <b>{modeLabel}</b>
            </p>

            {/* Durum mesajı */}
            <p style={{ fontSize: 13, color: '#555', marginBottom: 12, textAlign: 'center' }}>
                {!firstGuessId && 'AI tarafından üretilmiş olduğunu düşündüğün görseli seç.'}
                {firstGuessId && isFirstGuessCorrect === false && !secondGuessId && 'İlk tahminin yanlış. İpucunu oku ve kalan iki görselden birini seç.'}
                {isFinished && 'Tur bitti, sonuç ekranına yönlendiriliyorsun.'}
            </p>

            {/* İpucu alanı (sadece ilk tahmin yanlışsa) */}
            {showHint && aiImage && (
                <div
                    style={{
                        margin: '0 auto 20px',
                        maxWidth: 600,
                        padding: 12,
                        borderRadius: 8,
                        background: '#eef2ff',
                        border: '1px solid #c7d2fe',
                        fontSize: 13,
                    }}
                >
                    <strong>İpucu:</strong>{' '}
                    <span>{aiImage.hints[0] ?? 'Görselin detaylarına dikkat et.'}</span>
                </div>
            )}

            {/* 3 görselllik grid */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                    gap: 16,
                    marginBottom: 24,
                }}
            >
                {roundImages.map((img) => {
                    const isFirst = img.id === firstGuessId;
                    const isSecond = img.id === secondGuessId;

                    const clickable = canClick(img);

                    let borderColor = '#e5e7eb';

                    if (isFirst) {
                        borderColor = '#2563eb'; // mavi
                    }
                    if (isSecond) {
                        borderColor = '#7c3aed'; // mor
                    }
                    if (isFinished && img.isAI) {
                        borderColor = '#22c55e'; // doğru cevap: yeşil çerçeve
                    }

                    return (
                        <button
                            key={img.id}
                            onClick={() => handleSelect(img)}
                            disabled={!clickable}
                            style={{
                                borderRadius: 12,
                                overflow: 'hidden',
                                border: `3px solid ${borderColor}`,
                                padding: 0,
                                cursor: clickable ? 'pointer' : 'default',
                                opacity: !clickable && !isFirst && !isSecond ? 0.6 : 1,
                                background: '#fff',
                                transition: 'transform 0.1s ease, box-shadow 0.1s ease',
                            }}
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

            <p style={{ fontSize: 12, color: '#9ca3af', textAlign: 'center' }}>
                İlk seçimde yanlış yaparsan, ipucu aldıktan sonra sadece kalan iki görselden seçim yapabilirsin.
            </p>
        </div>
    );
}
