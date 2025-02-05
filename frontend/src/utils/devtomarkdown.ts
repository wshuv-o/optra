import axios from 'axios';

// Function to convert Dev.to article URL to markdown
export async function getDevToMarkdown(url: string): Promise<string> {
  try {
    // Ensure that the URL is valid and belongs to dev.to
    ensureDevToUrl(url);

    // Extract article ID from the URL
    const articleId = await getArticleId(url);

    // Fetch the markdown content for the article using the article ID
    const markdown = await getMarkdown(articleId);

    return markdown;
  } catch (error) {
    throw new Error(`Error fetching Dev.to article: ${error instanceof Error ? error.message : error}`);
  }
}

// Ensure the URL is valid and a Dev.to URL
function ensureDevToUrl(url: string): void {
  if (!url) {
    throw new Error('Please provide a URL');
  }

  const devHttpsRegex = /^https:\/\/dev.to\/.*$/;
  if (!devHttpsRegex.test(url)) {
    throw new Error('Invalid URL: Must be a valid https://dev.to URL');
  }
}

// Extract the article ID from the Dev.to page using regex
async function getArticleId(url: string): Promise<string> {
  const response = await axios.get(url);
  const articleIdRegex = new RegExp(/.*data-commentable-id="(?<id>\d+)"/);

  const match = articleIdRegex.exec(response.data);
  if (!match?.groups?.id) {
    throw new Error('Failed to extract article ID');
  }

  return match.groups.id;
}

// Fetch the markdown content using the article ID
async function getMarkdown(articleId: string): Promise<string> {
  const apiUrl = `https://dev.to/api/articles/${articleId}`;
  const response = await axios.get(apiUrl);

  if (!response?.data?.body_markdown) {
    throw new Error(`Unexpected response body: ${JSON.stringify(response)}`);
  }

  return response.data.body_markdown;
}
