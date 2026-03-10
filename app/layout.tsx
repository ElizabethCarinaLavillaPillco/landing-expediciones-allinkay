import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: {
        template: '%s | Expediciones Allinkay',
        default: 'Expediciones Allinkay | Tours en Perú',
    },
    description: 'Descubre la magia del Perú con nuestros tours personalizados. Machu Picchu, Cusco, Valle Sagrado y más.',
    icons: {
        icon: '/images/logo.png',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es" className={inter.variable} suppressHydrationWarning>
            <head>
                {/* Google tag (gtag.js) */}
                <Script
                    strategy="afterInteractive"
                    src="https://www.googletagmanager.com/gtag/js?id=AW-17934459414"
                />
                <Script
                    id="google-analytics"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());

                            gtag('config', 'AW-17934459414');
                        `
                    }}
                />
            </head>
            <body className="font-sans antialiased min-h-screen flex flex-col bg-background text-foreground">
                <main className="flex-grow">
                    {children}
                </main>
            </body>
        </html>
    );
}