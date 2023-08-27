import { Helmet } from 'react-helmet-async';


function MetaData({ title, summary, cover }) {
  return (
    <Helmet>
      {/* <!-- Primary Meta Tags --> */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={summary} />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://blog-frontend-git-dev-mido-kun.vercel.app/" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={summary} />
      <meta property="og:image" content={cover} />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content={cover} />
      <meta property="twitter:url" content="https://blog-frontend-git-dev-mido-kun.vercel.app" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={summary} /> 
      <meta property="twitter:image" content={summary} />
    </Helmet>
  )
}

export default MetaData;