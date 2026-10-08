import { QueryClientProvider } from '@/_app/providers/QueryClientProvider';
import Header from '@/widgets/Header';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex h-full w-full max-w-7xl flex-col justify-start gap-5">
      <Header className="border-dashed not-sm:order-1 not-sm:border-t sm:border-b" />
      <main className="mb-3 flex h-full items-center justify-center p-3">
        <QueryClientProvider>{children}</QueryClientProvider>
      </main>
    </div>
  );
}
