import { getTranslations } from 'next-intl/server';
import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function HomePage() {
  const t = await getTranslations('common');
  const tAuth = await getTranslations('auth');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <main className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold">{t('appName')}</h1>
        <p className="text-muted-foreground">Multi-tenant SaaS for pet service businesses</p>
        <div className="flex gap-4">
          <Link href={routes.signIn}>
            <Button>{tAuth('signIn')}</Button>
          </Link>
          <Link href={routes.signUp}>
            <Button variant="outline">{tAuth('signUp')}</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}

