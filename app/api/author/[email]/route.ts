import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const url = await req.url;
    const email = url.split("author/")[1];

    const posts = await prisma.user.findUnique({
      where: { email: email },
      include: {
        posts: {
          omit: {
            createdAt: true,
            updatedAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return NextResponse.json(
      {
        success: true,
        posts,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "couldnt get tghe posts acording to the emails",
      },
      { status: 500 }
    );
  }
};
