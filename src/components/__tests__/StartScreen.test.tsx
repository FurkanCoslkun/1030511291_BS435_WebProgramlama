import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StartScreen from '../StartScreen';

describe('StartScreen', () => {
    test('Başla butonuna tıklanınca onStart çağrılır', async () => {
        const user = userEvent.setup();
        const onStart = vi.fn();

        render(<StartScreen onStart={onStart} />);

        const btn = screen.getByRole('button', { name: /başla/i });
        await user.click(btn);

        expect(onStart).toHaveBeenCalledTimes(1);
    });
});
