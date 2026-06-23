import { MetadataRoute } from 'next'
import { createAdminClient } from '@/lib/supabase/admin'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://deidaratv.live'
  
  // Use admin client to query all match and blog entries securely during sitemap generation
  const supabase = createAdminClient()

  // Fetch match entries
  const { data: matches } = await supabase
    .from('matches')
    .select('slug, updated_at')
  
  // Fetch blog entries
  const { data: blogs } = await supabase
    .from('blogs')
    .select('slug, updated_at, created_at')

  const matchUrls = (matches || []).map((match) => ({
    url: `${SITE_URL}/match/${match.slug}`,
    lastModified: new Date(match.updated_at || new Date()),
    changeFrequency: 'always' as const,
    priority: 0.8,
  }))

  const blogUrls = (blogs || []).map((blog) => ({
    url: `${SITE_URL}/blog/${blog.slug}`,
    lastModified: new Date(blog.updated_at || blog.created_at || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const staticUrls = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ]

  return [...staticUrls, ...matchUrls, ...blogUrls]
}
