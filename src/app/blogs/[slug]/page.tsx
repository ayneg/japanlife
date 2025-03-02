import { BlogPostContent } from "@/components/BlogPostContent";
import { CommentSection } from "@/components/CommentSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RelatedPosts } from "@/components/RelatedPosts";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import { notFound } from "next/navigation";
import type { BlogPosting, WithContext } from "schema-dts";
import { getPost, getRelatedPosts } from "@/lib/microcms";
import type { Metadata } from "next";

// 型を変更：params は Promise<{ slug: string }>
type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // params を await してから使う
  const { slug } = await params;
  const result = await getPost(slug);

  if (!result || !result.post) {
    return {
      title: "Blog post not found",
    };
  }

  const { title, description, image } = result.post;
  const generatedOgImage = signOgImageUrl({ title, brand: config.blog.name });

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [generatedOgImage, image] : [generatedOgImage],
    },
  };
}

export default async function Page({ params }: PageProps) {
  // await params してから destructure
  const { slug } = await params;

  const result = await getPost(slug);
  const posts = await getRelatedPosts({ slug, limit: 3 });

  if (!result || !result.post) {
    return notFound();
  }

  const { title, publishedAt, updatedAt, image, author } = result.post;

  const jsonLd: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    image: image || undefined,
    datePublished: publishedAt ? publishedAt.toString() : undefined,
    dateModified: updatedAt ? updatedAt.toString() : new Date().toISOString(),
    author: {
      "@type": "Person",
      name: author?.name || undefined,
      image: author?.image || undefined,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-5">
        <Header />
        <div className="max-w-prose mx-auto text-xl">
          <BlogPostContent post={result.post} />
          <RelatedPosts posts={posts} />
        </div>
        <Footer />
      </div>
    </>
  );
}
