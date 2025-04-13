import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
export const POST = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      {
        message: "User Not Authenticated",
      },
      { status: 401 }
    );
  }
  try {
    const { title, content, links, imageUrl, publicId, selectedCategory } =
      await request.json();
    const authorEmail = session?.user?.email as string;
    if (!title || !content) {
      return NextResponse.json(
        {
          message: "Title OR content is Required",
        },
        { status: 500 }
      );
    }
    const newPost = await prisma.post.create({
      data: {
        content,
        title,
        links,
        imageUrl,
        publicId,
        authorEmail,
        catName: selectedCategory,
      },
    });
    return NextResponse.json(
      {
        message: "Post Created",
        newPost,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "couldnt create the post",
      },
      { status: 500 }
    );
  }
};

export const GET = async (request: NextRequest) => {
  try {
    const allPosts = await prisma.post.findMany({
      include: { author: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ allPosts }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "couldnt get the posts",
      },
      { status: 500 }
    );
  }
};
