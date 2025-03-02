import { config } from "@/config";
import { getPosts } from "@/lib/microcms";
import type { MetadataRoute } from "next";
import urlJoin from "url-join";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // microCMS から記事データを取得し、contents を明示的に分割する
  const { contents } = await getPosts();

  return [
    {
      url: urlJoin(config.baseUrl, "blogs"),
      lastModified: new Date(),
      priority: 0.8,
    },
    ...contents.map((post: any) => ({
      url: urlJoin(config.baseUrl, "blogs", post.slug || post.id),
      lastModified: new Date(post.updatedAt || post.publishedAt),
      priority: 0.6, // 個別記事は少し低めの優先度
    })),
  ];
}