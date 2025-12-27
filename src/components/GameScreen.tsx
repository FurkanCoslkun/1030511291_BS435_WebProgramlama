import { useEffect, useMemo, useState } from 'react';
import type { Mode, Difficulty, GameResult, ImageItem } from '../types/game';
import { images } from '../Data/images';

type Props = {
    mode: Mode;
    difficulty: Difficulty;
    onEnd: (result: GameResult) => void;
};

function getTimeLimitSeconds(difficulty: Difficulty) {
    if (difficulty === 'easy') return 20;
    if (difficulty === 'hard') return 10;
    return 15; // medium
}

function getRandomItem<T>(arr: T[]): T {
    const idx = Math.floor(Math.random() * arr.length);
    return arr[idx];
}

function shuffle<T>(arr: T[]): T[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function createRoundImages(all: ImageItem[]): ImageItem[] {
    const real = all.filter((img) => !img.isAI);
    const ai = all.filter((img) => img.isAI);

    if (real.length < 2 || ai.length < 1) {
        console.warn('Yeterli gerçek/AI görseli yok, fallback olarak ilk 3 eleman kullanılıyor.');
        return all.slice(0, 3);
    }

    const pickedAI = getRandomItem(ai);
    const firstReal = getRandomItem(real);
    const remainingReal = real.filter((r) => r.id !== firstReal.id);
    const secondReal = getRandomItem(remainingReal);

    return shuffle([pickedAI, firstReal, secondReal]);
}

export default function GameScreen({ mode, difficulty, onEnd }: Props) {
    const [roundImages, setRoundImages] = useState<ImageItem[]>([]);

    useEffect(() => {
        setRoundImages(createRoundImages(images));
    }, []);


    const [firstGuessId, setFirstGuessId] = useState<string | null>(null);
    const [secondGuessId, setSecondGuessId] = useState<string | null>(null);

    const [firstGuessWrong, setFirstGuessWrong] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const isTimed = mode === 'time';
    const timeLimit = useMemo(() => getTimeLimitSeconds(difficulty), [difficulty]);

    const [timeLeft, setTimeLeft] = useState<number>(isTimed ? timeLimit : 0);

    // Easy: ipucu baştan açık, Hard: hiç yok
    const [showHint, setShowHint] = useState<boolean>(difficulty === 'easy');

    const aiImage = roundImages.find((img) => img.isAI) ?? null;

    // UI indicator
    const progress = isTimed ? Math.max(0, Math.min(100, (timeLeft / timeLimit) * 100)) : 0;
    const isUrgent = isTimed && timeLeft <= 5;
    const isCritical = isTimed && timeLeft <= 3;

    const modeLabel = isTimed ? 'Zamanlı' : 'Klasik';
    const diffLabel =
        difficulty === 'easy' ? 'Kolay' : difficulty === 'medium' ? 'Orta' : 'Zor';

    // Timer effect
    useEffect(() => {
        if (!isTimed) return;
        if (isFinished) return;
        if (timeLeft <= 0) return;

        const id = window.setInterval(() => {
            setTimeLeft((t) => t - 1);
        }, 1000);

        return () => window.clearInterval(id);
    }, [isTimed, isFinished, timeLeft]);

    // Süre biterse otomatik kayıp
    useEffect(() => {
        if (!isTimed) return;
        if (isFinished) return;

        if (timeLeft <= 0) {
            setIsFinished(true);
            onEnd({
                correct: false,
                firstGuessId: firstGuessId ?? 'timeout',
                secondGuessId: secondGuessId ?? undefined,
            });
        }
    }, [isTimed, isFinished, timeLeft, firstGuessId, secondGuessId, onEnd, secondGuessId]);

    const handleSelect = (image: ImageItem) => {
        if (isFinished) return;

        // 1) İlk tahmin
        if (!firstGuessId) {
            setFirstGuessId(image.id);

            if (image.isAI) {
                setIsFinished(true);
                onEnd({ correct: true, firstGuessId: image.id });
            } else {
                setFirstGuessWrong(true);
                // Medium/Easy: yanlışta ipucu açılır (easy zaten açık)
                if (difficulty !== 'hard') setShowHint(true);
            }
            return;
        }

        // 2) İkinci tahmin
        if (firstGuessWrong && !secondGuessId && image.id !== firstGuessId) {
            setSecondGuessId(image.id);
            setIsFinished(true);

            onEnd({
                correct: image.isAI,
                firstGuessId,
                secondGuessId: image.id,
            });
        }
    };

    const canClick = (img: ImageItem): boolean => {
        if (isFinished) return false;
        if (!firstGuessId) return true;
        if (firstGuessWrong && !secondGuessId) return img.id !== firstGuessId;
        return false;
    };

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
            <div style={{ width: 'min(1100px, 100%)' }}>
                {/* Üst bilgi bar */}
                <div
                    style={{
                        display: 'flex',
                        gap: 12,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 14,
                        flexWrap: 'wrap',
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
                        }}
                    >
                        <span>Oyun</span>
                        <span style={{ opacity: 0.7 }}>•</span>
                        <span>{modeLabel}</span>
                        <span style={{ opacity: 0.7 }}>•</span>
                        <span>{diffLabel}</span>
                    </div>

                    {/* Timer chip */}
                    {isTimed && (
                        <div
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 10,
                                padding: '8px 12px',
                                borderRadius: 999,
                                background: isUrgent ? 'rgba(239,68,68,0.18)' : 'rgba(99,102,241,0.18)',
                                border: isUrgent
                                    ? '1px solid rgba(239,68,68,0.28)'
                                    : '1px solid rgba(99,102,241,0.35)',
                                fontSize: 12,
                                color: isUrgent ? '#fecaca' : '#c7d2fe',
                                boxShadow: isUrgent ? '0 0 0 4px rgba(239,68,68,0.06)' : undefined,
                                animation: isUrgent ? 'pulse 1s ease-in-out infinite' : undefined,
                            }}
                        >
                            <span style={{ opacity: 0.95 }}>⏱</span>
                            <span>Kalan:</span>
                            <b style={{ color: '#fff' }}>{Math.max(timeLeft, 0)}s</b>
                            {isCritical && <span style={{ marginLeft: 4 }}>⚠️</span>}
                        </div>
                    )}
                </div>

                {/* Progress bar */}
                {isTimed && (
                    <div
                        style={{
                            height: 10,
                            borderRadius: 999,
                            overflow: 'hidden',
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.10)',
                            marginBottom: 12,
                        }}
                    >
                        <div
                            style={{
                                height: '100%',
                                width: `${progress}%`,
                                background: isUrgent ? 'rgba(239,68,68,0.85)' : 'rgba(99,102,241,0.85)',
                                transition: 'width 0.25s ease',
                            }}
                        />
                    </div>
                )}

                {/* Ana kart */}
                <div
                    style={{
                        border: '1px solid rgba(255,255,255,0.10)',
                        borderRadius: 16,
                        padding: 18,
                        background: 'rgba(255,255,255,0.06)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
                    }}
                >
                    {/* Durum mesajı */}
                    <div style={{ marginBottom: 12 }}>
                        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>AI görseli bul</div>
                        <div style={{ fontSize: 13, color: '#cbd5e1' }}>
                            {!firstGuessId && 'AI tarafından üretilmiş olduğunu düşündüğün görseli seç.'}
                            {firstGuessId && firstGuessWrong && !secondGuessId &&
                                'İlk tahminin yanlış. Kalan iki görselden birini seç.'}
                            {isFinished && 'Tur bitti, sonuç ekranına yönlendiriliyorsun.'}
                        </div>
                    </div>

                    {/* İpucu */}
                    {showHint && difficulty !== 'hard' && (
                        <div
                            style={{
                                marginBottom: 14,
                                padding: 12,
                                borderRadius: 12,
                                background: 'rgba(99,102,241,0.12)',
                                border: '1px solid rgba(99,102,241,0.25)',
                                fontSize: 13,
                            }}
                        >
                            <b style={{ color: '#c7d2fe' }}>İpucu:</b>{' '}
                            {aiImage?.hints?.[0] ?? 'Görselin detaylarına dikkat et.'}
                        </div>
                    )}

                    {/* Görseller */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                            gap: 18,
                        }}
                    >
                        {roundImages.map((img) => {
                            const clickable = canClick(img);
                            const isFirst = img.id === firstGuessId;
                            const isSecond = img.id === secondGuessId;

                            let borderColor = 'rgba(255,255,255,0.12)';
                            if (isFirst) borderColor = 'rgba(99,102,241,0.85)';
                            if (isSecond) borderColor = 'rgba(124,58,237,0.85)';
                            if (isFinished && img.isAI) borderColor = 'rgba(34,197,94,0.95)';

                            return (
                                <button
                                    type="button"
                                    key={img.id}
                                    onClick={() => handleSelect(img)}
                                    disabled={!clickable}
                                    style={{
                                        borderRadius: 14,
                                        overflow: 'hidden',
                                        border: `3px solid ${borderColor}`,
                                        padding: 0,
                                        cursor: clickable ? 'pointer' : 'default',
                                        background: 'rgba(0,0,0,0.25)',
                                        opacity: !clickable && !isFirst && !isSecond ? 0.65 : 1,
                                        boxShadow: '0 12px 24px rgba(0,0,0,0.25)',
                                    }}
                                >
                                    <img
                                        src={img.url}
                                        alt={img.category}
                                        style={{
                                            width: '100%',
                                            height: 320,
                                            objectFit: 'cover',
                                            display: 'block',
                                        }}
                                    />
                                </button>
                            );
                        })}
                    </div>

                    <div style={{ marginTop: 12, fontSize: 12, color: '#94a3b8' }}>
                        {difficulty === 'hard'
                            ? 'Zor mod: ipucu yok.'
                            : 'Yanlış ilk seçimde ipucu görüp kalan iki görselden seçim yapabilirsin.'}
                    </div>
                </div>
            </div>
        </div>
    );
}
