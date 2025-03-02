"use client";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import type { FunctionComponent } from "react";

export interface MicroCMSPost {
  id: string;
  slug?: string;
  title: string;
  image?: string;
  description?: string;
}

export const RelatedPosts: FunctionComponent<{ posts: MicroCMSPost[] }> = ({
  posts,
}) => {
  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="my-8">
      <div className="mb-6 text-lg font-semibold tracking-tight">
        Related Posts
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <div className="bg-muted overflow-hidden rounded-lg" key={post.id}>
            <Link href={`/blogs/${post.slug || post.id}`}>
              <AspectRatio ratio={16 / 9} className="w-full">
                <Image
                  src={post.image || "/images/placeholder.png"}
                  alt={post.title}
                  fill
                  className="h-full min-h-full min-w-full object-cover object-center"
                />
              </AspectRatio>
            </Link>
            <div className="prose prose-sm dark:prose-invert p-4">
              <h3 className="line-clamp-2">{post.title}</h3>
              <p className="line-clamp-3">{post.description}</p>
              <Link href={`/blogs/${post.slug || post.id}`}>
                <strong>Read Full Story</strong>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
