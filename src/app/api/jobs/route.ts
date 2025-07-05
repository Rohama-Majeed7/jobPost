import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { prisma } from "../../../../lib/prisma";

export async function POST(request: NextRequest) {
  const session = await auth();
  console.log("session in user:",session);
  
  if (!session?.user || !session.user.id) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  try {
    const data = await request.json();
    console.log("job posted data: ", data);
    
    const job =await prisma.job.create({
      data: {
        ...data,
        postById: session.user.id,
      },
    });

    return NextResponse.json(job);
  } catch (error) {
    console.error("error creation in job: ", error);
    return new NextResponse("internal server error", { status: 500 });
  }
}


export async function GET() {
  try{
    const jobs = await prisma.job.findMany({
        orderBy:{
            postedAt:"desc"
        }
    })
    return  NextResponse.json(jobs)
  }
  catch (error) {
    console.error("error creation in job: ", error);
    return new NextResponse("internal server error", { status: 500 });
  }
}
