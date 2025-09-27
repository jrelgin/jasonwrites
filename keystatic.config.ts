import { config, fields, collection } from '@keystatic/core';

const readEnv = (key: string) => {
  const viteEnv = (typeof import.meta !== 'undefined' ? (import.meta.env as Record<string, string | undefined>) : undefined)?.[key];
  if (typeof viteEnv === 'string' && viteEnv.length > 0) {
    return viteEnv;
  }
  if (typeof process !== 'undefined') {
    return process.env?.[key];
  }
  return undefined;
};

const repoOwner = readEnv('KEYSTATIC_GITHUB_OWNER');
const repoName = readEnv('KEYSTATIC_GITHUB_REPO');

const storage = repoOwner && repoName
  ? {
      kind: 'github' as const,
      repo: {
        owner: repoOwner,
        name: repoName,
      },
      branchPrefix: readEnv('KEYSTATIC_GITHUB_BRANCH_PREFIX'),
      pathPrefix: readEnv('KEYSTATIC_GITHUB_PATH_PREFIX'),
    }
  : { kind: 'local' as const };

export default config({
  storage,
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: {
            label: 'Title',
            validation: { isRequired: true },
          },
          slug: {
            label: 'Slug',
            description: 'Auto-generated from the title; override for custom URLs.',
          },
        }),
        date: fields.date({
          label: 'Publish date',
          validation: { isRequired: true },
        }),
        updated: fields.date({
          label: 'Updated date',
          validation: { isRequired: false },
        }),
        summary: fields.text({
          label: 'Summary',
          description: 'Short ~160 character teaser used for listings and meta descriptions.',
          multiline: true,
          validation: {
            isRequired: true,
            length: { min: 10, max: 240 },
          },
        }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Ideas', value: 'ideas' },
            { label: 'Essays', value: 'essays' },
          ],
          defaultValue: 'ideas',
        }),
        tags: fields.array(
          fields.text({
            label: 'Tag',
            validation: {
              length: { min: 2, max: 32 },
            },
          }),
          {
            label: 'Tags',
            itemLabel: props => props.value ?? 'Tag',
          }
        ),
        draft: fields.checkbox({
          label: 'Draft',
          defaultValue: false,
        }),
        cover: fields.image({
          label: 'Cover image',
          directory: 'src/assets/uploads',
          publicPath: '../../assets/uploads/',
          validation: { isRequired: false },
        }),
        canonical: fields.url({
          label: 'Canonical URL',
          validation: { isRequired: false },
        }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'src/assets/uploads',
              publicPath: '../../assets/uploads/',
            },
          },
        }),
      },
    }),
  },
});
