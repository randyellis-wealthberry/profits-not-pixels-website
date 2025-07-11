interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface Footer2Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer2 = ({
  logo = {
    src: "/pnp-logo.svg",
    alt: "Profits Not Pixels - Official Logo",
    title: "Profits, Not Pixels",
    url: "#home",
  },
  tagline = "A Guide to Profits, Not Pixels",
  menuItems = [
    {
      title: "Book",
      links: [
        { text: "About Book", url: "#about" },
        { text: "Features", url: "#features" },
        { text: "Author", url: "#author" },
        { text: "Testimonials", url: "#testimonials" },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "Download", url: "#contact" },
        { text: "FAQ", url: "#faq" },
        { text: "Support", url: "#contact" },
      ],
    },
    {
      title: "Connect",
      links: [
        { text: "LinkedIn", url: "#" },
        { text: "Twitter", url: "#" },
        { text: "Instagram", url: "#" },
      ],
    },
  ],
  copyright = "© 2025 Profits, Not Pixels. All rights reserved.",
  bottomLinks = [
    { text: "Privacy Policy", url: "#" },
    { text: "Terms of Service", url: "#" },
  ],
}: Footer2Props) => {
  return (
    <section className="py-12 bg-[#0f172a] border-t border-gray-800">
      <div className="container mx-auto px-3 md:px-4">
        <footer>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
            <div className="col-span-1 md:col-span-2 mb-6 lg:mb-0">
              <div className="flex items-center gap-3 mb-2">
                <a href={logo.url}>
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    title={logo.title}
                    className="h-10 md:h-12 lg:h-14 w-auto"
                  />
                </a>
              </div>
              <div className="text-gray-300 font-medium max-w-md">
                <p>{tagline}</p>
                <p>Shift from Visual Appeal to Boardroom Fluency</p>
              </div>
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx} className="lg:col-span-1">
                <h3 className="mb-4 font-bold text-white">{section.title}</h3>
                <ul className="space-y-3 text-gray-300">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-[#fbbf24] transition-colors"
                    >
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-16 flex flex-col justify-between gap-4 border-t border-gray-800 pt-8 text-sm font-medium text-gray-400 md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex gap-6">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="hover:text-[#fbbf24] transition-colors">
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer2 };