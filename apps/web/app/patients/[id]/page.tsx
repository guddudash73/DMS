type Params = { params: { id: string } };

export default function PatientDetailPage({ params }: Params) {
  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold">Patient #{params.id}</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-4 md:col-span-2">
          <h2 className="text-sm font-medium text-gray-600">Demographics</h2>
          <div className="text-sm text-gray-600">—</div>
        </div>
        <div className="rounded-2xl border bg-white p-4">
          <h2 className="text-sm font-medium text-gray-600">Actions</h2>
          <div className="text-sm text-gray-600">Register visit...</div>
        </div>
      </div>
    </section>
  );
}
