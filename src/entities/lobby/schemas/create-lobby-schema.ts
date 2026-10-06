import * as z from 'zod';

export type CreateLobbySchema = z.infer<typeof createLobbySchema>;

export const createLobbySchema = z.object({
  maxPlayer: z
    .string()
    .min(1, 'Укажите количество игроков')
    .refine(v => !Number.isNaN(Number(v)), 'Должно быть числом')
    .refine(v => Number(v) >= 2, 'Минимум 2 игрока')
    .refine(v => Number(v) <= 50, 'Максимум 50 игроков'),
});
