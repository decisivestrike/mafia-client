import { Skull, HatGlasses } from 'lucide-react';
import styles from './player-node.module.css';
import { cn } from '@/shared/lib/utils';

import type { User } from '@/entities/user';

type Player = User & {
  isDead: boolean;
  role: any;
};

type PlayerNodeProps = {
  player: Player;
  isSelected: boolean;
  positionStyle: React.CSSProperties;
};

export function PlayerNode({ player, isSelected, positionStyle }: PlayerNodeProps) {
  const hasVotes = isSelected && !player.isDead;

  return (
    <div className={styles.PlayerNode} style={positionStyle}>
      <button
        type="button"
        disabled={player.isDead}
        className={`${styles.PlayerButton} ${isSelected ? styles.PlayerButtonSelected : ''}`}
      >
        <div
          className={cn(
            styles.PlayerCard,
            player.isDead
              ? styles.PlayerCardDead
              : isSelected
                ? styles.PlayerCardSelected
                : styles.PlayerCardAlive,
          )}
        >
          <span className={styles.PlayerIcon}>
            <HatGlasses />
          </span>
          <span
            className={`${styles.PlayerName} ${isSelected ? styles.PlayerNameSelected : ''}`}
          >
            {player.name}
          </span>
        </div>

        {hasVotes && (
          <div className={styles.VoteBadge}>
            <span className={styles.VoteCount}>1</span>
          </div>
        )}
      </button>

      {player.isDead && (
        <div className={styles.DeadOverlay}>
          <Skull className={styles.DeadIcon} />
        </div>
      )}
    </div>
  );
}
