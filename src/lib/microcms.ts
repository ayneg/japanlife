// src/lib/microcms.ts

export async function getPosts() {
  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN}/api/v1/${process.env.NEXT_PUBLIC_MICROCMS_ENDPOINT}`,
    {
      headers: {
        "X-MICROCMS-API-KEY": process.env.NEXT_PUBLIC_MICROCMS_API_KEY || "",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await res.json();
  return data.contents; // microCMS のレスポンスは "contents" に格納される
}

// getPost を contentId ベースで実装する場合
export async function getPost(id: string) {
  const url = `https://${process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN}/api/v1/${process.env.NEXT_PUBLIC_MICROCMS_ENDPOINT}/${id}`;
  console.log("Fetching URL:", url);
  const res = await fetch(url, {
    headers: {
      "X-MICROCMS-API-KEY": process.env.NEXT_PUBLIC_MICROCMS_API_KEY || "",
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch post: ${res.status} ${errorText}`);
  }

  const data = await res.json();
  return { post: data }; // 単一の記事オブジェクトを返す
}

// getRelatedPosts の実装例
export async function getRelatedPosts({
  slug,
  limit,
}: {
  slug: string;
  limit: number;
}) {
  const url = `https://${
    process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN
  }/api/v1/${
    process.env.NEXT_PUBLIC_MICROCMS_ENDPOINT
  }?filters=slug[not_equals]${encodeURIComponent(slug)}&limit=${limit}`;

  const res = await fetch(url, {
    headers: {
      "X-MICROCMS-API-KEY": process.env.NEXT_PUBLIC_MICROCMS_API_KEY || "",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch related posts: ${res.statusText}`);
  }

  const data = await res.json();
  return data.contents;
}

export async function getComments({
  slug,
  page,
  limit,
}: {
  slug: string;
  page: number;
  limit: number | "all";
}) {
  // ここでは、microCMS のコメントエンドポイントが "comments" と仮定しています。
  // フィルタリングやページネーションのクエリは、必要に応じて調整してください。
  const url = `https://${process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN}/api/v1/comments?filters=slug[equals]${slug}&limit=${limit}`;

  const res = await fetch(url, {
    headers: {
      "X-MICROCMS-API-KEY": process.env.NEXT_PUBLIC_MICROCMS_API_KEY || "",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch comments: ${res.statusText}`);
  }

  const data = await res.json();
  return data;
}

export async function getTags() {
  try {
    const res = await fetch(`https://${process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN}/api/v1/tags`, {
      headers: { "X-API-KEY": process.env.NEXT_PUBLIC_MICROCMS_API_KEY! },
    });

    if (!res.ok) {
      console.error(`Failed to fetch tags: ${res.status} ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    return data.contents || []; // `contents` が `undefined` でも空配列を返す
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}

