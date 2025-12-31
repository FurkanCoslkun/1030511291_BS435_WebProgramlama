import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ModeSelect from '../ModeSelect';

describe('ModeSelect', () => {
    test('Klasik + Orta seçilince onSelect("classic","medium") çağrılır', async () => {
        const user = userEvent.setup();
        const onSelect = vi.fn();

        render(<ModeSelect onSelect={onSelect} />);

        await user.click(screen.getByRole('button', { name: /klasik/i }));
        await user.click(screen.getByRole('button', { name: /orta/i }));

        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect).toHaveBeenCalledWith('classic', 'medium');
    });

    test('Zamanlı mod seçilince onSelect çağrılır (mevcut davranış: medium)', async () => {
        const user = userEvent.setup();
        const onSelect = vi.fn();

        render(<ModeSelect onSelect={onSelect} />);

        await user.click(screen.getByRole('button', { name: /zamanlı/i }));
        await user.click(screen.getByRole('button', { name: /zor/i }));

        expect(onSelect).toHaveBeenCalledTimes(1);

        expect(onSelect).toHaveBeenCalledWith('time', 'medium');
    });
});
