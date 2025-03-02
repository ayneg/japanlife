import type { MetadataRoute } from "next";
import urlJoin from "url-join";
import { config } from "@/config";
import { getTags } from "@/lib/microcms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // microCMS からタグデータを取得
  const tags = await getTags(); // getTags() がタグの配列を返す想定

  return [
    {
      // ルートを /tag にするなら以下を維持
      // /tags にしたい場合は urlJoin(config.baseUrl, "tags") に変更
      url: urlJoin(config.baseUrl, "tag"),
      lastModified: new Date(),
      priority: 0.8,
    },
    ...tags.map((tag: any) => ({
      // 同様に /tag → /tags にしたい場合はここも修正
      url: urlJoin(config.baseUrl, "tag", tag.name),
      lastModified: new Date(),
      priority: 0.8,
    })),
  ];
}
