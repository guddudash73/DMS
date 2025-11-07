export default function DashboardPage() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      <div className="rounded-2xl border bg-white p-4">
        <h2 className="mb-1 text-sm font-medium text-gray-600">Today</h2>
        <div className="text-2xl font-semibold">0 visits</div>
      </div>
      <div className="rounded-2xl border bg-white p-4">
        <h2 className="mb-1 text-sm font-medium text-gray-600">Queue</h2>
        <div className="text-2xl font-semibold">—</div>
      </div>
      <div className="rounded-2xl border bg-white p-4">
        <h2 className="mb-1 text-sm font-medium text-gray-600">Revenue</h2>
        <div className="text-2xl font-semibold">—</div>
      </div>
    </section>
  );
}
