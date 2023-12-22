import {clsx} from 'clsx';
import Link from 'next/link';
import {lusitana} from '@/app/ui/fonts';

interface BreadcrumbsProp {
    label: string | undefined;
    href: string;
    active?: boolean;
}

export default function Breadcrumbs({
                                        breadcrumbs,
                                    }: {
    breadcrumbs: BreadcrumbsProp[];
}) {
    return (
        <nav aria-label="Breadcrumb" className="mb-6 block">
            <ol className={clsx(lusitana.className, 'flex text-sm sm:text-xl')}>
                {breadcrumbs.map((breadcrumb, index) => (
                    <li
                        key={breadcrumb.href}
                        aria-current={breadcrumb.active}
                        className='flex flex-nowrap text-gray-500 last:text-gray-900 last:dark:text-slate-200 '
                    >
                        <Link href={breadcrumb.href} className='line-clamp-1'>{breadcrumb.label}</Link>
                        {index < breadcrumbs.length - 1 ? (
                            <span className="mx-3 inline-block">/</span>
                        ) : null}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
