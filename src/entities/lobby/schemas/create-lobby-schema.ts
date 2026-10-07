import * as z from 'zod';

export type CreateLobbySchema = z.infer<typeof createLobbySchema>;

export const minPlayers = 5;
export const maxPlayers = 12;

export const createLobbySchema = z.object({
  maxPlayers: z.coerce
    .number()
    .min(1, 'Укажите количество игроков')
    .min(minPlayers, `Минимум ${minPlayers} игроков`)
    .max(maxPlayers, `Максимум ${maxPlayers} игроков`),
});
