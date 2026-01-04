import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="border-t bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white font-bold text-lg">
                V
              </div>
              <span className="font-bold text-lg text-gray-900 dark:text-white">
                Vishal Techzone
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Empowering the next generation of investors with transparent,
              data-driven analysis.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Platform
            </h3>
            <ul className="space-y-2">
              {/* <li>
                <Link
                  href="/crypto-gems"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  Crypto Gems
                </Link>
              </li>
              <li>
                <Link
                  href="/stock-picks"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  Stock Picks
                </Link>
              </li> */}
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="pt-4">
  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
    Follow Us
  </h3>
  <div className="flex flex-wrap justify-start gap-5">
    {/* YouTube */}
    <a
      href="https://www.youtube.com/@Vishalsahu21"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition"
      aria-label="YouTube"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    </a>

    {/* X / Twitter */}
    <a
      href="https://x.com/VishalSahu21"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition"
      aria-label="X / Twitter"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
      </svg>
    </a>

    {/* Facebook */}
    <a
      href="https://www.facebook.com/Vishalshahu21"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition"
      aria-label="Facebook"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    </a>

    {/* Instagram */}
    <a
      href="https://www.instagram.com/vishalsahu21"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400 transition"
      aria-label="Instagram"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 
          1.366.062 2.633.35 3.608 1.325.975.975 
          1.263 2.242 1.325 3.608.058 1.266.07 
          1.646.07 4.85s-.012 3.584-.07 4.85c-.062 
          1.366-.35 2.633-1.325 3.608-.975.975-2.242 
          1.263-3.608 1.325-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.35-3.608-1.325-.975-.975-1.263-2.242-1.325-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.35-2.633 1.325-3.608.975-.975 2.242-1.263 3.608-1.325C8.416 2.175 8.796 2.163 12 2.163zM12 6.838a5.162 5.162 0 1 0 0 10.324 
          5.162 5.162 0 0 0 0-10.324zm0 8.486a3.324 
          3.324 0 1 1 0-6.648 3.324 3.324 0 0 1 0 
          6.648zm6.406-8.845a1.44 1.44 0 1 0 0 
          2.88 1.44 1.44 0 0 0 0-2.88z"/>
      </svg>
    </a>

    {/* Telegram */}
    <a
      href="https://t.me/vishaltechzone"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-sky-500 dark:text-gray-400 dark:hover:text-sky-400 transition"
      aria-label="Telegram"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
        <path d="M9.993 15.674l-.398 5.59c.57 0 .82-.244 1.118-.537l2.68-2.545 5.56 4.067c1.02.563 1.747.266 2.002-.944L24 3.684c.334-1.484-.54-2.065-1.53-1.703L1.16 10.318c-1.455.566-1.434 1.378-.264 1.74l5.486 1.71L19.11 6.02c.6-.39 1.148-.174.697.217z" />
      </svg>
    </a>

    {/* CoinMarketCap */}
    <a
      href="https://coinmarketcap.com/community/profile/vishalsahu21/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition"
      aria-label="CoinMarketCap"
    >
      <svg viewBox="0 0 500.98 508.49" className="h-6 w-6 fill-current">
        <path
          fillRule="evenodd"
          d="M435.62,303.86c-8.87,5.6-19.31,6.3-27.25,1.82-10.08-5.69-15.63-19-15.63-37.57V212.64c0-26.79-10.59-45.85-28.3-51-30-8.74-52.58,28-61.07,41.77l-52.93,85.82V184.34c-.6-24.14-8.43-38.58-23.32-42.93-9.84-2.88-24.58-1.72-38.89,20.18L69.64,352a209.19,209.19,0,0,1-24.11-97.76c0-114.71,91.92-208,204.91-208s204.9,93.32,204.9,208c0,.2.05.37.06.55s0,.38,0,.58c1.07,22.21-6.12,39.88-19.75,48.49Zm65.25-49.6v-.57l0-.57C500.22,113.41,388.14,0,250.43,0,112.35,0,0,114.05,0,254.25S112.35,508.49,250.44,508.49a247.57,247.57,0,0,0,170.26-67.8A23.35,23.35,0,0,0,421.91,408a22.54,22.54,0,0,0-31.83-1.55l-.34.31a202.51,202.51,0,0,1-139.3,55.48c-60.5,0-114.93-26.78-152.47-69.24L204.91,221.31v79.16c0,38,14.75,50.32,27.11,53.91s31.29,1.14,51.15-31.1L342,227.92c1.89-3.08,3.62-5.73,5.21-8v48.22c0,35.55,14.24,64,39.06,78,22.37,12.62,50.5,11.48,73.42-3C487.46,325.56,502.43,293.23,500.87,254.26Z"
        />
      </svg>
    </a>

    {/* Binance */}
    <a
      href="https://www.binance.com/en-IN/square/profile/VishalTechzone"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-yellow-500 dark:text-gray-400 dark:hover:text-yellow-400 transition"
      aria-label="Binance"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
        <path d="M12 2.04L8.3 5.75l3.7 3.7 3.7-3.7L12 2.04zM5.75 8.3L2.04 12l3.71 3.7 3.7-3.7-3.7-3.7zm12.5 0l-3.7 3.7 3.7 3.7 3.71-3.7-3.71-3.7zM12 14.55l-3.7 3.7L12 21.96l3.7-3.71-3.7-3.7z" />
      </svg>
    </a>
  </div>
</div>

        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Vishal Techzone. All rights reserved. Developed by Aditya Thakur.</p>
          <p className="mt-1">Disclaimer: Not financial advice.</p>
        </div>
      </div>
    </footer>
  );
};

