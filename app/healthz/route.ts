
export async function GET() {
  return new Response(JSON.stringify({
    ok: true,
    version: "1.0",
    uptime: process.uptime()
  }), { status: 200 });
}
