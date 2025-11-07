export const metadata = { title: 'Patient — DMS' };

export default async function PatientPage() {
  //   await new Promise((r) => setTimeout(r, 800));
  //   throw new Error('boom');
  return (
    <section className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">Patients</h1>
        <div className="flex gap-2">
          <input
            type="search"
            placeholder="Search by name, phone..."
            className="w-64 rounded-xl border px-3 py-2 text-sm outline-none focus:ring"
          />
        </div>
      </header>
      <div className="rounded-2xl border bg-white p-4">
        <p className="text-sm text-gray-600">No patients yet.</p>
      </div>
    </section>
  );
}
