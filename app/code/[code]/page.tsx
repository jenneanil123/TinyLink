
async function getData(code: string) {
  const res = await fetch(`${process.env.BASE_URL || "http://localhost:3000"}/api/links/${code}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function Page({ params }: any) {
  const item = await getData(params.code);

  if (!item) return <div className="p-6">Not found.</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white shadow rounded p-6">
        <h1 className="text-xl mb-4">Stats — {item.code}</h1>
        <dl className="grid grid-cols-1 gap-2">
          <div><strong>Target URL:</strong> <a href={item.url} className="text-blue-600">{item.url}</a></div>
          <div><strong>Total Clicks:</strong> {item.totalClicks}</div>
          <div><strong>Last Clicked:</strong> {item.lastClicked || "—"}</div>
          <div><strong>Created:</strong> {new Date(item.createdAt).toLocaleString()}</div>
        </dl>
      </div>
    </div>
  );
}
