import { Spinner } from '@/shared/ui';
import { CenterBox } from '@/shared/ui/CenterBox/CenterBox';

export default function RootLoading() {
  return (
    <CenterBox>
      <Spinner />
    </CenterBox>
  );
}
