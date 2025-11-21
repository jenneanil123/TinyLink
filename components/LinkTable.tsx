
'use client';
export default function LinkTable({ links }: any) {
  async function del(code: string) {
    if (!confirm('Delete this link?')) return;
    await fetch(`/api/links/${code}`, { method: 'DELETE' });
    location.reload();
  }

  if (!links || links.length === 0) {
    return <div className="p-4 text-gray-600">No links yet.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="text-left bg-gray-100">
            <th className="p-2">Code</th>
            <th className="p-2">Target</th>
            <th className="p-2">Clicks</th>
            <th className="p-2">Last clicked</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map((l: any) => (
            <tr key={l.code} className="border-t">
              <td className="p-2"><a href={`/${l.code}`} target="_blank" rel="noreferrer" className="text-blue-600">{l.code}</a></td>
              <td className="p-2 max-w-md truncate">{l.url}</td>
              <td className="p-2">{l.totalClicks}</td>
              <td className="p-2">{l.lastClicked ? new Date(l.lastClicked).toLocaleString() : '—'}</td>
              <td className="p-2">
                <a className="mr-3 text-sm text-blue-600" href={`/code/${l.code}`}>Stats</a>
                <button onClick={() => del(l.code)} className="text-sm text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
