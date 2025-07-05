import { auth } from "../../../../../../auth";
import { prisma } from "../../../../..//../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ appId: string }> }
) {
  const session = await auth();

  if (!session?.user || !session.user.id) {
    return NextResponse.redirect(new URL("/auth/singin", request.url));
  }

  try {
    const { appId } = await params;
    const {status} = await request.json()
    const app = await prisma.application.update({ where: { id: appId } , data:{
        status: status
    }});

    if (!app) {
      return new NextResponse("application not upadted", { status: 404 });
    }

    return NextResponse.json(app);
  } catch (error) {
    console.log(error);
    
    return new NextResponse("Internal server error", { status: 500 });
  }
}