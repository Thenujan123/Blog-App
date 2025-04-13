import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const url = await req.url;
    const cat = url.split("categories/")[1];

    const category = await prisma.category.findMany({
      where: { catName: cat },
      include: { posts: { include: { author: true } } },
    });
    return NextResponse.json(
      {
        success: true,
        category,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "couldnt get tghe categories acording to the type",
      },
      { status: 500 }
    );
  }
};
