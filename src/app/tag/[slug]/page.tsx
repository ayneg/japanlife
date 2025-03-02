import { BlogPostsPreview } from "@/components/BlogPostPreview";
import { BlogPostsPagination } from "@/components/BlogPostsPagination";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { CircleX } from "lucide-react";
import Link from "next/link";
import { getPosts } from "@/lib/microcms";

interface Params {
  slug: string;
}

export async function generateMetadata(props: { params: Promise<Params> }) {
  const params = await props.params;
  const { slug } = params;
  return {
    title: `#${slug}`,
    description: `Posts tagged with #${slug}`,
  };
}

const Page = async (props: {
  params: Promise<Params>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { slug } = params;
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  const limit = 6;
  const allPosts = await getPosts();
  const filteredPosts = allPosts.filter((post: any) => {
    return post.tags && Array.isArray(post.tags) && post.tags.includes(slug);
  });
  const start = (page - 1) * limit;
  const paginatedPosts = filteredPosts.slice(start, start + limit);
  const totalPages = Math.ceil(filteredPosts.length / limit);
  const pagination = {
    page,
    limit,
    totalPages,
    nextPage: page < totalPages ? page + 1 : null,
    prevPage: page > 1 ? page - 1 : null,
  };

  return (
    <div className="container mx-auto px-5 mb-10">
      <Header />
      <Link href="/">
        <Badge className="px-2 py-1">
          <CircleX className="inline-block w-4 h-4 mr-2" />
          Posts tagged with <strong className="mx-2">#{slug}</strong>
        </Badge>
      </Link>
      <BlogPostsPreview posts={paginatedPosts} />
      <BlogPostsPagination
        pagination={pagination}
        basePath={`/tag/${slug}/?page=`}
      />
      <Footer />
    </div>
  );
};

export default Page;
