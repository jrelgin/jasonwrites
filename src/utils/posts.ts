import { getCollection, type CollectionEntry } from 'astro:content';

export const POSTS_PER_PAGE = 20;
export type PostEntry = CollectionEntry<'posts'>;
export type PostCategory = PostEntry['data']['category'];

export async function getPublishedPosts() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );
}

export async function getPublishedPostsByCategory(category: PostCategory) {
  const posts = await getPublishedPosts();
  return posts.filter(post => post.data.category === category);
}

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  nextPage?: number;
  prevPage?: number;
  totalItems: number;
}

export interface PaginatedPosts {
  entries: PostEntry[];
  pagination: PaginationState;
}

export function paginatePosts(posts: PostEntry[], currentPage: number): PaginatedPosts | null {
  const totalItems = posts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / POSTS_PER_PAGE));
  if (currentPage < 1 || currentPage > totalPages) {
    return null;
  }
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const entries = posts.slice(start, end);
  return {
    entries,
    pagination: {
      currentPage,
      totalPages,
      hasNext: currentPage < totalPages,
      hasPrev: currentPage > 1,
      nextPage: currentPage < totalPages ? currentPage + 1 : undefined,
      prevPage: currentPage > 1 ? currentPage - 1 : undefined,
      totalItems,
    },
  };
}

export function getTotalPages(totalItems: number) {
  return Math.max(1, Math.ceil(totalItems / POSTS_PER_PAGE));
}
