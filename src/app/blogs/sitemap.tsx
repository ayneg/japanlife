import { config } from "@/config";
import { getPosts } from "@/lib/microcms";
import type { MetadataRoute } from "next";
import urlJoin from "url-join";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // microCMS から記事データを取得
    const postsData = await getPosts();

    // 取得したデータをログに出力（デバッグ用）
    console.log("Fetched Posts in Sitemap:", postsData);

    // レスポンスが不正な場合のフォールバック
    if (!postsData || typeof postsData !== "object" || !("contents" in postsData)) {
      console.error("Error: Invalid response from getPosts() or empty contents");
      return [
        {
          url: urlJoin(config.baseUrl, "blogs"),
          lastModified: new Date(),
          priority: 0.8,
        },
      ];
    }

    // `contents` 配列を取得し、存在しない場合は空配列を使用
    const contents = Array.isArray(postsData.contents) ? postsData.contents : [];

    // 各記事のサイトマップ情報を作成
    const posts = contents.map((post: any) => ({
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

    // 失敗した場合のフォールバックデータを返す
    return [
      {
        url: urlJoin(config.baseUrl, "blogs"),
        lastModified: new Date(),
        priority: 0.8,
      },
    ];
  }
}