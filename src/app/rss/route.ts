import type { MetadataRoute } from "next";
import urlJoin from "url-join";
import { config } from "@/config";
import { getPosts } from "@/lib/microcms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const postsData = await getPosts();
    console.log("Fetched Posts:", postsData);
    
    if (!postsData || !Array.isArray(postsData)) {
      console.error("getPosts() did not return an array");
      return [
        {
          url: urlJoin(config.baseUrl, "blogs"),
          lastModified: new Date(),
          priority: 0.8,
        },
      ];
    }

    const posts = postsData.map((post: any) => ({
      url: urlJoin(config.baseUrl, "blogs", encodeURIComponent(post.slug || post.id)),
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
    console.error("Error in sitemap generation:", error);
    return [
      {
        url: urlJoin(config.baseUrl, "blogs"),
        lastModified: new Date(),
        priority: 0.8,
      },
    ];
  }
}