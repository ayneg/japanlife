"use client";
import { cn } from "@/lib/utils";
import { formatDate } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";

export interface MicroCMSPost {
  id: string;
  slug?: string;
  title: string;
  image?: string;
  publishedAt?: string;
  updatedAt?: string;
  description?: string;
  tags: { id: string; name: string }[];
}

export const BlogPostPreview: FunctionComponent<{ post: MicroCMSPost }> = ({
  post,
}) => {
  return (
    <div className="break-words">
      <Link href={`/blogs/${post.slug || post.id}`}>
        <div className="aspect-[16/9] relative">
          <Image
            alt={post.title}
            className="object-cover"
            src={post.image || "/images/placeholder.webp"}
            fill
          />
        </div>
      </Link>
      <div className="grid grid-cols-1 gap-3 md:col-span-2 mt-4">
        <h2 className="font-sans font-semibold tracking-tighter text-primary text-2xl md:text-3xl">
          <Link href={`/blogs/${post.slug || post.id}`}>{post.title}</Link>
        </h2>
        <div className="prose lg:prose-lg italic tracking-tighter text-muted-foreground">
          {formatDate(
            new Date(post.publishedAt || post.updatedAt || Date.now()),
            "dd MMMM yyyy"
          )}
        </div>
        <div className="prose lg:prose-lg leading-relaxed md:text-lg line-clamp-4 text-muted-foreground">
          {post.description}
        </div>
        <div className="text-sm text-muted-foreground">
          {(post.tags ?? []).map((tag) => (
            <div key={tag.id} className="mr-2 inline-block">
              <Link href={`/tag/${tag.name}`}>#{tag.name}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const BlogPostsPreview: FunctionComponent<{
  posts: MicroCMSPost[];
  className?: string;
}> = ({ posts, className }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-16 lg:gap-28 md:grid-cols-2 md:my-16 my-8",
        className
      )}
    >
      {posts.map((post) => (
        <BlogPostPreview key={post.id} post={post} />
      ))}
    </div>
  );
};
