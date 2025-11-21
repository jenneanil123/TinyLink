
import AddForm from "@/components/AddForm";
import LinkTable from "@/components/LinkTable";

async function getLinks() {
  const res = await fetch(`${process.env.BASE_URL || "http://localhost:3000"}/api/links`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function Page() {
  const links = await getLinks();

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white shadow rounded p-6">
        <h1 className="text-2xl font-semibold mb-4">TinyLink — Dashboard</h1>
        <AddForm />
        <LinkTable links={links} />
      </div>
    </div>
  );
}
