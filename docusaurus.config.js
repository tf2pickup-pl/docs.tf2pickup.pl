/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'tf2pickup.org',
  tagline: 'Team Fortress 2 pick-up games',
  url: 'https://docs.tf2pickup.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'tf2pickup.org',
  projectName: 'docs.tf2pickup.org',
  themeConfig: {
    navbar: {
      title: 'tf2pickup.org',
      logo: {
        alt: 'tf2pickup.org logo',
        src: 'img/logo.png',
      },
      items: [
        {
          to: 'docs/about',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/tf2pickup-org',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'About tf2pickup.org',
              to: 'docs/about',
            },
            {
              label: 'For pickup admins',
              to: 'docs/responsibilities-and-powers'
            },
            {
              label: 'For server admins',
              to: 'docs/components'
            }
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/5w6WF7xFZp',
            }
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/tf2pickup-org',
            },
          ],
        },
      ],
      copyright: `Copyright © 2021 tf2pickup.org, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
<<<<<<< HEAD
            'https://github.com/tf2pickup-org/docs.tf2pickup.org/edit/master',
=======
            'https://github.com/tf2pickup-org/docs.tf2pickup.pl/edit/master',
>>>>>>> c9a93da (refactor: edit edit links to the repository on website)
        },
        blog: {
          showReadingTime: true,
          editUrl:
<<<<<<< HEAD
            'https://github.com/tf2pickup-org/docs.tf2pickup.org/edit/master/blog/',
=======
            'https://github.com/tf2pickup-org/docs.tf2pickup.pl/edit/master/blog/',
>>>>>>> c9a93da (refactor: edit edit links to the repository on website)
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
