import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const url = await req.url;
    const id = url.split("posts/")[1];
    console.log("iD:" + id);

    const singlePost = await prisma.post.findFirst({
      where: { id: id },
    });

    return NextResponse.json({ singlePost }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "couldnt get the single posts",
      },
      { status: 500 }
    );
  }
};
export const PUT = async (req: NextRequest) => {
  try {
    const url =  req.url;
    const id = url.split("posts/")[1];
    console.log("ID:" + id);

    const { title, content, links, imageUrl, publicId, category } =
      await req.json();

    const singlePost = await prisma.post.update({
      where: { id: id },
      data: {
        title,
        content,
        links,
        imageUrl,
        publicId,
        category,
      },
    });
    if (!singlePost) {
      return NextResponse.json(
        {
          message: "Post Not Found",
          singlePost,
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Post Updated",
        singlePost,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "couldnt update the single posts",
      },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const url = await req.url;
    const id = url.split("posts/")[1];
    console.log("iD:" + id);

    await prisma.post.delete({ where: { id: id } });

    return NextResponse.json({ message: "Post Deleted" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "couldnt Delete the single posts",
      },
      { status: 500 }
    );
  }
};
