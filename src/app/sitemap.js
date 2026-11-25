import { getProjectSlugs } from "@/lib/projects";
import { siteUrl } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap() {
  const entries = [{ url: siteUrl, changeFrequency: "monthly", priority: 1 }];

  try {
    const projects = await getProjectSlugs();

    for (const { slug, updatedAt } of projects) {
      entries.push(
        {
          url: `${siteUrl}/projects/${slug}`,
          lastModified: updatedAt,
          changeFrequency: "monthly",
          priority: 0.8,
        },
        {
          url: `${siteUrl}/projects/${slug}/case-study`,
          lastModified: updatedAt,
          changeFrequency: "monthly",
          priority: 0.7,
        }
      );
    }
  } catch (error) {
    // Keep the sitemap valid even if the database is briefly unreachable.
    console.error("[sitemap]", error?.message ?? error);
  }

  return entries;
}
