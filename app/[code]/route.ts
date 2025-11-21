
import { prisma } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { code: string } }) {
  const code = params.code;
  const link = await prisma.link.findUnique({ where: { code } });

  if (!link) {
    return new Response("Not found", { status: 404 });
  }

  await prisma.link.update({
    where: { code },
    data: {
      totalClicks: link.totalClicks + 1,
      lastClicked: new Date(),
    },
  });

  return Response.redirect(link.url, 302);
}
