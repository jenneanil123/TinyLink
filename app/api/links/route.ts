
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url, code } = body;

    if (!url || typeof url !== "string") {
      return new Response(JSON.stringify({ error: "URL required" }), { status: 400 });
    }

    try {
      new URL(url);
    } catch (e) {
      return new Response(JSON.stringify({ error: "Invalid URL" }), { status: 400 });
    }

    const shortRegex = /^[A-Za-z0-9]{6,8}$/;
    let short = (code || "").trim();

    if (!short) {
      short = Math.random().toString(36).slice(2, 8);
    } else {
      if (!shortRegex.test(short)) {
        return new Response(JSON.stringify({ error: "Code must match [A-Za-z0-9]{6,8}" }), { status: 400 });
      }
    }

    const exists = await prisma.link.findUnique({ where: { code: short } });
    if (exists) {
      return new Response(JSON.stringify({ error: "Code exists" }), { status: 409 });
    }

    const link = await prisma.link.create({
      data: { url, code: short },
    });

    return new Response(JSON.stringify(link), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

export async function GET() {
  const links = await prisma.link.findMany({
    orderBy: { createdAt: "desc" },
  });

  return new Response(JSON.stringify(links));
}
