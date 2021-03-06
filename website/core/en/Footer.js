/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const labels = {
  documentationPart: {
    headerTitle: `Documentation`,
    links: [{
      title: `Getting Started`,
      link: `getting-started/installation-first-steps.html`,
    },
    {
      title: `API References`,
      link: `api/introduction.html`,
    },
    {
      title: `Releases`,
      link: `releases/introduction.html`,
    }],
  },
  resourcesPart: {
    headerTitle: `Resources`,
    links: [{
      title: `Centreon Website`,
      link: `https://www.centreon.com`,
      external: true,
    },
    {
      title: `Blog`,
      link: `https://www.centreon.com/en/blog/`,
      external: true,
    },
    {
      title: `Download`,
      link: `https://download.centreon.com`,
      external: true,
    }],
  },
  socialPart: {
    headerTitle: `Follow us`,
  }
}

const linkElement = ({ baseUrl }, listLinks) => {
  const links = listLinks.map((linkProps) => {
    const href = linkProps.external ? linkProps.link : baseUrl + linkProps.link;
    return <a href={`${href}`}>{linkProps.title}</a>
  })
  return links;
}

function LogoColumn({ config }) {
  return (
    <React.Fragment>
    {config.footerIcon && (
      <a href={config.baseUrl} className="nav-home">
        <img
          src={`${config.baseUrl}${config.footerIcon}`}
          alt={config.title}
        />
      </a>
    )}
    </React.Fragment>
  )
}

function DocumentationColumn({ config }) {
  return (
    <div className="footerSection">
    <h5>{labels.documentationPart.headerTitle}</h5>
    {linkElement(config, labels.documentationPart.links)}
  </div>
  )
}

function ResourceColumn({ config }) {
  return (
    <div className="footerSection">
    <h5>{labels.resourcesPart.headerTitle}</h5>
    {linkElement(config, labels.resourcesPart.links)}
    </div>
  )
}

function SocialColumn({ config }) {
  const repoUrl = `https://github.com/${config.organizationName}/centreon`;
  return (
    <React.Fragment>
    <div className="footerSection">
    <h5>{labels.socialPart.headerTitle}</h5>
      <div className="social">
        <a
          className="github-button" // part of the https://buttons.github.io/buttons.js script in siteConfig.js
          href={repoUrl}
          data-count-href={`${repoUrl}/stargazers`}
          data-show-count="true"
          data-count-aria-label="# stargazers on GitHub"
          aria-label="Star this project on GitHub">
          {config.organizationName}
        </a>
      </div>
      {config.twitterUsername && (
        <div className="contentSocial">
          <a
            href={`https://twitter.com/${config.twitterUsername}`}
            className="twitter-follow-button">
            Follow @{config.twitterUsername}
          </a>
        </div>
      )}
    </div>
    </React.Fragment>
  )
}

function Footer({ config }) {
  return (
    <footer className="nav-footer" id="footer">
      <section className="sitemap">
        <LogoColumn config={config} />
        <DocumentationColumn config={config} />
        <ResourceColumn config={config} />
        <SocialColumn config={config} />
      </section>
      <section className="copyright">
        {config.copyright && (
          <span>{config.copyright}</span>
        )}
      </section>
    </footer>
  );
}

module.exports = Footer;