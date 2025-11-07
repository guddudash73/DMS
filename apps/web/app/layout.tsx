import '../styles/globals.css';
import type { Metadata } from 'next';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';

export const metadata: Metadata = {
  title: 'DMS - Dental Management Sysytem',
  description: 'Production-grade DMS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <div className="grid min-h-screen grid-cols-1 md:grid-cols-[260px_1fr]">
          <aside className="border-r bg-white">
            <Sidebar></Sidebar>
          </aside>
          <div className="flex min-h-screen flex-col">
            <Topbar></Topbar>
            <main className="flex-1 p-4 md:p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
