import NavLink from './NavLink';

export default function Sidebar() {
  return (
    <div className="flex h-full flex-col gap-2 p-3">
      <div className="px-2 py-3">
        <div className="text-lg font-semibold tracking-tight">DMS</div>
        <div className="text-xs text-gray-500">Clinic Console</div>
      </div>
      <nav className="flex flex-1 flex-col gap-1">
        <NavLink herf="/">Dashboard</NavLink>
        <NavLink herf="/patients">Patients</NavLink>
        <NavLink herf="/queue">Queue</NavLink>
        <NavLink herf="/reports">Reports</NavLink>
        <NavLink herf="/settings">Settings</NavLink>
      </nav>
      <div className="mt-auto rounded-lg bg-gray-50 p-3 text-xs text-gray-500">v0.0.1-dev</div>
    </div>
  );
}
