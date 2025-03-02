import { BlogPostsPreview } from "@/components/BlogPostPreview";
import { BlogPostsPagination } from "@/components/BlogPostsPagination";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getPosts } from "@/lib/microcms";

const Page = async (
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) => {
  const searchParams = await props.searchParams;
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-5 mb-10">
      <Header />
      <BlogPostsPreview posts={posts} />
      <BlogPostsPagination 
        pagination={{ 
          page, 
          limit: 6,
          totalPages: Math.ceil(posts.length / 6),
          nextPage: page < Math.ceil(posts.length / 6) ? page + 1 : null,
          prevPage: page > 1 ? page - 1 : null,
        }} 
      />
      <Footer />
    </div>
  );
};

export default Page;
