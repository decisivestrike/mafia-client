interface Props {
  className?: string;
  text?: string;
}

export function Stamp({ className, text = 'Конфиденциально' }: Props) {
  return (
    <div className={className}>
      <div className="inline-block rotate-[-5deg] border-2 border-red-700 px-4 py-2 opacity-60">
        <p className="font-mono text-xs font-medium tracking-widest text-red-700 uppercase">
          {text}
        </p>
      </div>
    </div>
  );
}
