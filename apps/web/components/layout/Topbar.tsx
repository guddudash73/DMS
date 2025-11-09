import { Button } from '@/components/ui/button';

export default function Topbar() {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-white/80 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-2">
        <div className="text-sm text-gray-600">Welcome, Reception</div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" aria-label="Notifications">
            🔔
          </Button>
          <Button variant="secondary" size="sm">
            New Patient
          </Button>
        </div>
      </div>
    </header>
  );
}
