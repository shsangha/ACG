import React from "react"
import Helmet from "react-helmet"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Facebook from "./facebook"
import Twitter from "./twitter"

const query = graphql`
  query SEO {
    site {
      buildTime(formatString: "YYYY-MM-DD")
      siteMetadata {
        siteUrl
        defaultTitle: title
        defaultDescription: description
        defaultBanner: banner
        headline
        siteLanguage
        ogLanguage
        author
      }
    }
  }
`

const SEO = ({ title, desc, banner, pathname, bCrumb }) => {
  const { site } = useStaticQuery(query)

  const {
    buildTime,
    siteMetadata: {
      siteUrl,
      defaultTitle,
      defaultDescription,
      defaultBanner,
      headline,
      siteLanguage,
      ogLanguage,
      author,
      twitter,
      facebook,
    },
  } = site

  const seo = {
    title: title || defaultTitle,
    description: desc || defaultDescription,
    image: `${banner || defaultBanner}`,
    url: `${siteUrl}${pathname || ""}`,
  }

  const schemaOrgWebPage = {
    "@context": "http://schema.org",
    "@type": "WebPage",
    url: siteUrl,
    headline,
    inLanguage: siteLanguage,
    mainEntityOfPage: siteUrl,
    description: defaultDescription,
    name: defaultTitle,
    author: {
      "@type": "Person",
      name: author,
    },
    copyrightHolder: {
      "@type": "Person",
      name: author,
    },
    copyrightYear: "2019",
    creator: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Person",
      name: author,
    },
    datePublished: "2019-10-31T10:30:00+01:00",
    dateModified: buildTime,
    image: {
      "@type": "ImageObject",
      url: `${siteUrl}${defaultBanner}`,
    },
  }

  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: "about",
      item: "https://albertacommercialgroup.com/about",
    },
    {
      "@type": "ListItem",
      position: 1,
      name: "listings",
      item: "https://albertacommercialgroup.com/listings",
    },
    {
      "@type": "ListItem",
      position: 1,
      name: "contact",
      item: "https://albertacommercialgroup.com/contact",
    },
  ]

  const breadcrumb = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    description: "Breadcrumbs list",
    name: "Breadcrumbs",
    itemListElement: bCrumb ? [...itemListElement, bCrumb] : itemListElement,
  }

  return (
    <>
      <Helmet title={seo.title}>
        <html lang={siteLanguage} />
        <meta name="description" content={seo.description} />
        <meta name="image" content={`${seo.url}${seo.image}`} />
        <meta name="gatsby-starter" content={seo.title} />

        <script type="application/ld+json">
          {JSON.stringify(schemaOrgWebPage)}
        </script>

        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      </Helmet>
      <Facebook
        desc={seo.description}
        image={seo.image}
        title={seo.title}
        type="website"
        url={seo.url}
        locale={ogLanguage}
        name={facebook}
      />
      <Twitter
        url={seo.url}
        title={seo.title}
        image={seo.image}
        desc={seo.description}
        username={twitter}
      />
    </>
  )
}

export default SEO

SEO.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  banner: PropTypes.string,
  pathname: PropTypes.string,
  bCrumb: PropTypes.shape({
    "@type": PropTypes.string,
    position: PropTypes.number,
    item: PropTypes.string,
    name: PropTypes.string,
  }),
}

SEO.defaultProps = {
  title: null,
  desc: null,
  banner: null,
  pathname: null,
}
