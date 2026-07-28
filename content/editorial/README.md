# Editorial content workflow

This directory is the Git-reviewed source for new commercial, location, collection and guide content.

## Publication gate

1. A content brief defines one search intent and the canonical route.
2. A native writer authors the locale file.
3. The business owner verifies every operational claim.
4. A native editor reviews the final locale.
5. Set `status: published` only after `reviewer` and `approvedAt` are present.
6. Run `npm run validate:content`.

Greek files must be written by the named native Greek professional. Codex may prepare briefs, sources, structures and QA reports, but must not be named as the Greek author or reviewer.

Every topic lives in its own directory:

```text
content/editorial/
  guides/
    topic-slug/
      en.mdx
      el.mdx
      it.mdx
      fr.mdx
      de.mdx
```

Complete all five locale files before publishing a new topic cluster. Drafts are never added to metadata, navigation, hreflang or the sitemap.
