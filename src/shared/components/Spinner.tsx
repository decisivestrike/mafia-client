import { concat } from '../utils';

interface Props {
  className?: string;
  size?: number;
}

export function Spinner({ className, size = 64 }: Props) {
  return (
    <div className={concat('spinner', `size-${size}`, className)}>
      {/* oxlint-disable-next-line next/no-img-element */}
      <img
        src="/assets/revolver-cylinder.svg"
        alt="Spinner"
        width={size}
        height={size}
      />
    </div>
  );
}
