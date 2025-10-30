import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface ULThemePageLayoutProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the layout.
   */
  children: ReactNode;
  /**
   * Optional class names for additional styling or overriding default styles.
   */
  className?: string;
}

const ULThemePageLayout = ({
  children,
  className,
  ...rest
}: ULThemePageLayoutProps) => {
  // Use theme token utilities for page alignment and background.
  const rootClasses = cn(
    "w-full min-h-screen",
    "justify-page-layout",
    className
  );

  return (
    <div className={rootClasses} {...rest}>
      {/* UL top blue header
          Color/gradient comes from `.ul-topbar` rules in `src/index.css` (uses hard-coded gradient)
          Logo image is read from the UL theme CSS variable `--ul-theme-widget-logo-url` set in `:root` of `src/index.css`.
      */}
      <div className="ul-topbar">
        <div className="container mx-auto py-9 px-6 flex items-center justify-between h-14">
          <div className="flex items-center">
            {/* Logo container
                Background image reads from CSS variable `--ul-theme-widget-logo-url` (defined in `src/index.css` :root). The sizing/positioning is controlled by `.ul-logo` styles.
            */}
            <div
              className="ul-logo bg-no-repeat bg-contain"
              style={{
                backgroundImage:
                  "url('https://www.dmv.ca.gov/imageserver/theme_10up/images/logo-ca-gov.svg')",
                height: "36px",
                width: "160px",
              }}
              aria-hidden
            />
            <div
              // remove visual gap by nudging the second logo left
              className="ul-logo bg-no-repeat bg-contain -ml-20"
              style={{
                backgroundImage:
                  "url('https://www.dmv.ca.gov/imageserver/theme_10up/images/logo-ca-dmv-white.svg')",
                height: "36px",
                width: "160px",
              }}
              aria-hidden
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Global logo (globe icon) placed before Translate button */}
            <span className="bg-white p-1 rounded-full" aria-hidden="true">
              <i
                className="fa-solid fa-globe"
                style={{ color: "#000" }}
                aria-hidden="true"
              ></i>
            </span>
            <button className="translate-btn">Translate</button>
          </div>
        </div>
      </div>

      {/* White nav strip with centered Home text */}
      {/* Navigation strip
          Background is white set by `.ul-nav` rules in `src/index.css` (keeps the centered white bar below the blue header).
      */}
      <div className="ul-nav">
        <div className="container mx-auto px-6">
          <div className="py-4 text-center font-bold">Home</div>
        </div>
      </div>

      {/* Hero/banner area
          Visual color/illustration is applied via `.ul-hero` rules in `src/index.css` which set gradients and the angled white strip (::after).
          If provided, the theme token `--ul-theme-page-bg-background-image-url` (in `:root` of `src/index.css` or injected by theme engine) will set a background image via the inline style here.
          The `hero-title` text color/size is controlled by `.ul-hero .hero-title` rules in `src/index.css`.
      */}
      <div
        className="ul-hero"
        style={{
          position: "relative", // ensure stacking context for overlap
          zIndex: 1,
          backgroundImage: `url('https://www.dmv.ca.gov/imageserver/theme_10up/images/hero-mountains.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          clipPath: "polygon(0 0, 100% 0, 100% 69%, 0 98%)",
          minHeight: "400px",
        }}
      >
        <div className="container mx-auto px-9 relative bg-cover">
          <div className="absolute inset-0 flex items-start justify-start">
            <h1
              className="hero-title m-10"
              style={{ fontFamily: "tt-commons-800-italic, sans-serif" }}
            >
              LOG IN
            </h1>
          </div>
        </div>
      </div>

      {/* Screen content inserted here */}
      {/* Main content wrapper
          Make the content overlap the hero by using a negative top margin and higher z-index.
          You can adjust the `marginTop` value to control how much the content overlays the hero.
      */}
      <div
        className="ul-content relative w-full"
        style={{
          marginTop: "-150px", // negative margin to lift content over the hero
          zIndex: 20,
        }}
      >
        {/* Wider container so screens can occupy more horizontal space (now using `max-w-7xl`) */}
        <div className="container mx-auto px-6 w-full max-w-7xl">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ULThemePageLayout;
