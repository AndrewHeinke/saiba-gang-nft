async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(process.env.NEXT_PUBLIC_GRAPHCMS_PROJECT_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_PROD_AUTH_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
      {
        blogPosts {
          slug
        }
      }
    `);
  return data.blogPosts;
}

export async function getAllPosts() {
  const data = await fetchAPI(
    `
      {
        blogPosts(orderBy: createdAt_DESC) {
          title
          tags
          content {
            html
          }
          slug
        }
      }
    `
  );
  return data.blogPosts;
}

export async function getPost(slug) {
  const data = await fetchAPI(
    `
      query PostBySlug($slug: String!) {
        blogPost(
          where: {slug: $slug}
        ) {
          slug
          content {
            html
          }
          heroImage {
            url
          }
          authors(first: 1) {
            name
            photo {
              url
            }
          }
          tags
          title
          publishedAt
        }
      }
    `,
    {
      variables: {
        slug,
      },
    }
  );
  return data;
}
