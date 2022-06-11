import { getServerSideSitemap } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { getAllPostIds } from '../../lib/post'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // Method to source urls from cms
    // const urls = await fetch('https//example.com/api')

    const articles_paths = getAllPostIds('articles');
    const trips_paths = getAllPostIds('trips');

    const articles = articles_paths.map(article =>  ({
        loc: `${process.env.SITE_URL}/article/${article.params.id}`,
        lastmod: new Date().toISOString()
    }))

    const trips = trips_paths.map(article =>  ({
        loc: `${process.env.SITE_URL}/trip/${article.params.id}`,
        lastmod: new Date().toISOString()
    }))

    let fields = [
        {
        loc: process.env.SITE_URL || "https://vicharm-life.com", // Absolute url
        lastmod: new Date().toISOString(),
        // changefreq
        // priority
        },
        {
        loc: `${process.env.SITE_URL}/trip`, // Absolute url
        lastmod: new Date().toISOString(),
        // changefreq
        // priority
        },
        {
            loc: `${process.env.SITE_URL}/article`, // Absolute url
            lastmod: new Date().toISOString(),
            // changefreq
            // priority
        }
    ]

    fields = fields.concat(articles, trips);


    return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
export default () => {}