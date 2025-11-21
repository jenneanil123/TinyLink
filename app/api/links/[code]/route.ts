
import { prisma } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { code: string } }) {
  const code = params.code;
  const link = await prisma.link.findUnique({ where: { code } });
  if (!link) return new Response("Not found", { status: 404 });
  return new Response(JSON.stringify(link));
}

export async function DELETE(req: Request, { params }: { params: { code: string } }) {
  const code = params.code;
  const link = await prisma.link.findUnique({ where: { code } });
  if (!link) return new Response("Not found", { status: 404 });
  await prisma.link.delete({ where: { code } });
  return new Response(JSON.stringify({ ok: true }));
}
