export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <div className='flex h-dvh flex-col w-full '>
            <div className='flex flex-col items-center justify-center '>
                <div className='w-full max-w-prose '>{children}</div>
            </div>

        </div>
    );
}
