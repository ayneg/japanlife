import type { MetadataRoute } from "next";
import urlJoin from "url-join";
import { config } from "@/config";
import { getPosts } from "@/lib/microcms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    console.log("Fetching posts for sitemap...");
    const postsData = await getPosts();

    if (!postsData || !Array.isArray(postsData)) {
      console.error(
        "Error: Invalid response from getPosts() or empty contents"
      );
      return [
        {
          url: urlJoin(config.baseUrl, "blogs"),
          lastModified: new Date(),
          priority: 0.8,
        },
      ];
    }

    console.log(`Fetched ${postsData.length} posts for sitemap.`);

    const posts = postsData.map((post: any) => ({
      url: urlJoin(config.baseUrl, "blogs", post.slug || post.id),
      lastModified: new Date(post.updatedAt || post.publishedAt || Date.now()),
      priority: 0.6,
    }));

    return [
      {
        url: urlJoin(config.baseUrl, "blogs"),
        lastModified: new Date(),
        priority: 0.8,
      },
      ...posts,
    ];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [
      {
        url: urlJoin(config.baseUrl, "blogs"),
        lastModified: new Date(),
        priority: 0.8,
      },
    ];
  }
}
