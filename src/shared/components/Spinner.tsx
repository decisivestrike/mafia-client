import { cn } from 'cn';

interface Props {
  className?: string;
}

export function Spinner({ className }: Props) {
  return (
    <div className={cn('spinner size-16', className)}>
      {/* oxlint-disable-next-line next/no-img-element */}
      <img
        src="/assets/revolver-cylinder.svg"
        alt="Spinner"
        width="64"
        height="64"
      />
    </div>
  );
}
