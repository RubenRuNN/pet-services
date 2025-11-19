import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';

export default async function NotFound() {
  const t = await getTranslations('common');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-muted-foreground">Page not found</p>
        <Link href={routes.home}>
          <Button>{t('back')} Home</Button>
        </Link>
      </div>
    </div>
  );
}

