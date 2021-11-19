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
            markdown
          }
          slug
          heroImage {
            url
          }
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
            markdown
          }
          heroImage {
            url
          }
          authors(first: 1) {
            name
            photo {
              url
            }
            slug
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

export async function getAllAuthorsWithSlug() {
  const data = await fetchAPI(`
      {
        authors(orderBy: name_ASC) {
          slug
          name
          photo {
            url
          }
        }
      }
    `);
  return data.authors;
}

export async function getAuthor(slug) {
  const data = await fetchAPI(
    `
      query AuthorBySlug($slug: String!) {
        author(
          where: {slug: $slug}
        ) {
          bio {
            markdown
          }
          name
          photo {
            url
          }
          blogPosts {
            title
            slug
          }
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

export async function getAllTags() {
  const data = await fetchAPI(
    `
      {
        __type(name: "Tags") {
          enumValues {
            name
          }
        }
      }
    `
  );
  return data;
}

export async function getPostsByTag(slug) {
  const data = await fetchAPI(
    `{
      blogPosts(where: {tags: ${slug}}) {
        id
        slug
        title
        authors {
          name
        }
        heroImage {
          url
        }
      }
    }

    `
  );
  return data;
}
