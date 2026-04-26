import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://grimaldi-realty-portfolio.vercel.app"),
  title: "Maria Luisa Grimaldi | Luxury GTA Real Estate",
  description:
    "Maria Luisa Grimaldi — Sales Representative at HomeLife/ROMANO Realty Ltd. Luxury residential and commercial real estate across the Greater Toronto Area. Expert market analytics, bilingual service, maximum exposure marketing.",
  keywords: [
    "Maria Luisa Grimaldi",
    "Toronto real estate",
    "GTA realtor",
    "HomeLife ROMANO",
    "luxury homes Toronto",
    "Mississauga real estate",
    "Vaughan homes",
    "real estate agent Toronto",
  ],
  openGraph: {
    title: "Maria Luisa Grimaldi | Luxury GTA Real Estate",
    description:
      "Your trusted real estate partner across the Greater Toronto Area. Luxury residential, commercial, and investment properties.",
    url: "https://grimaldi-realty-portfolio.vercel.app",
    siteName: "Maria Luisa Grimaldi Realty",
    images: [{ url: "/portrait.jpg", width: 800, height: 1000 }],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maria Luisa Grimaldi | Luxury GTA Real Estate",
    description:
      "Expert real estate services across the Greater Toronto Area.",
    images: ["/portrait.jpg"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Maria Luisa Grimaldi",
  jobTitle: "Sales Representative",
  url: "https://grimaldi-realty-portfolio.vercel.app",
  image: "https://grimaldi-realty-portfolio.vercel.app/portrait.jpg",
  telephone: "+1-647-287-1276",
  email: "marialuisa@grimaldirealty.ca",
  address: {
    "@type": "PostalAddress",
    streetAddress: "3500 Dufferin Street, Suite 101",
    addressLocality: "Toronto",
    addressRegion: "ON",
    postalCode: "M3K 1N2",
    addressCountry: "CA",
  },
  worksFor: {
    "@type": "RealEstateAgent",
    name: "HomeLife/ROMANO Realty Ltd., Brokerage",
  },
  areaServed: [
    { "@type": "City", name: "Toronto" },
    { "@type": "City", name: "Mississauga" },
    { "@type": "City", name: "Vaughan" },
    { "@type": "City", name: "Oakville" },
    { "@type": "City", name: "Markham" },
  ],
  knowsLanguage: ["English", "Spanish"],
  sameAs: [
    "https://www.www1.homelife.ca/Maria-Luisa-Grimaldi",
    "https://www.realtor.ca/agent/1869338/maria-luisa-grimaldi-3500-dufferin-st-ste-101-toronto-ontario-m3k1n2",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <footer className="site-footer">
          <div className="footer-inner">
            <div className="footer-brand">
              <span className="footer-logo">
                <span className="logo-accent">MLG</span> Realty
              </span>
              <p className="footer-tagline">
                Luxury Real Estate Across the Greater Toronto Area
              </p>
            </div>
            <div className="footer-links">
              <a href="#about">About</a>
              <a href="#flagship">Listings</a>
              <a href="#experience">Experience</a>
              <a href="#connect">Contact</a>
              <a
                href="https://www.www1.homelife.ca/Maria-Luisa-Grimaldi"
                target="_blank"
                rel="noopener noreferrer"
              >
                HomeLife Profile
              </a>
              <a
                href="https://www.realtor.ca/agent/1869338/maria-luisa-grimaldi-3500-dufferin-st-ste-101-toronto-ontario-m3k1n2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Realtor.ca
              </a>
            </div>
            <div className="footer-legal">
              <p>
                &copy; {new Date().getFullYear()} Maria Luisa Grimaldi. All
                rights reserved. HomeLife/ROMANO Realty Ltd., Brokerage.
              </p>
              <p className="footer-disclaimer">
                Not intended to solicit properties already listed. Each office is
                independently owned and operated.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
