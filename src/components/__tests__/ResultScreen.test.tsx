import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResultScreen from '../ResultScreen';
import type { GameResult } from '../../types/game';

describe('ResultScreen', () => {
    test('classic modda skor görünür, butonlar çalışır', async () => {
        const user = userEvent.setup();

        const onRestart = vi.fn();
        const onMenu = vi.fn();
        const onHome = vi.fn();

        const result: GameResult = { correct: true, firstGuessId: 'ai-1' };

        render(
            <ResultScreen
                result={result}
                score={3}
                mode="classic"
                difficulty="hard"
                onRestart={onRestart}
                onMenu={onMenu}
                onHome={onHome}
            />
        );

        // Mod/Zorluk
        expect(screen.getByText(/mod:/i)).toHaveTextContent(/klasik/i);
        expect(screen.getByText(/zorluk:/i)).toHaveTextContent(/zor/i);

        // Skor kutusu sadece classic
        expect(screen.getByText(/klasik mod skoru/i)).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();

        // Butonlar
        await user.click(screen.getByRole('button', { name: /yeni tur/i }));
        await user.click(screen.getByRole('button', { name: /mod değiştir/i }));
        await user.click(screen.getByRole('button', { name: /ana menü/i }));

        expect(onRestart).toHaveBeenCalledTimes(1);
        expect(onMenu).toHaveBeenCalledTimes(1);
        expect(onHome).toHaveBeenCalledTimes(1);
    });

    test('time modda skor kutusu görünmez', () => {
        const result: GameResult = { correct: false, firstGuessId: 'timeout' };

        render(
            <ResultScreen
                result={result}
                score={99}
                mode="time"
                difficulty="easy"
                onRestart={() => {}}
                onMenu={() => {}}
                onHome={() => {}}
            />
        );

        expect(screen.queryByText(/klasik mod skoru/i)).not.toBeInTheDocument();
    });
});
