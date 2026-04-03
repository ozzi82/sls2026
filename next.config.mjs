/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["localhost", "127.0.0.1"],
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      // Products hub
      { source: "/wholesale-sign-products", destination: "/products" },
      // Channel letters hub
      { source: "/wholesale-channel-letters", destination: "/products/channel-letters" },
      // Block Acrylic (LP 11)
      { source: "/face-lit-channel-letters", destination: "/products/channel-letters/front-lit" },
      { source: "/halo-lit-channel-letters", destination: "/products/channel-letters/halo-lit" },
      { source: "/face-and-halo-channel-letters", destination: "/products/channel-letters/front-and-halo-lit" },
      { source: "/side-lit-channel-letters", destination: "/products/channel-letters/side-lit" },
      { source: "/back-side-lit-channel-letters", destination: "/products/channel-letters/back-side-lit" },
      { source: "/front-side-lit-channel-letters", destination: "/products/channel-letters/front-side-lit" },
      { source: "/faux-neon-channel-letters", destination: "/products/channel-letters/faux-neon" },
      { source: "/conical-channel-letters", destination: "/products/channel-letters/conical" },
      // Trimless (LP 5)
      { source: "/trimless-channel-letters", destination: "/products/channel-letters/trimless" },
      // Fabricated Stainless (LP 3)
      { source: "/stainless-steel-standoff-letters", destination: "/products/channel-letters/stainless-standoff" },
      { source: "/stainless-steel-flush-mount-letters", destination: "/products/channel-letters/stainless-flush" },
      // Non-illuminated
      { source: "/non-illuminated-channel-letters", destination: "/products/channel-letters/non-illuminated" },
      // Flat cut
      { source: "/flat-cut-letters", destination: "/products/flat-cut-letters" },
      // Other products
      { source: "/wholesale-blade-signs", destination: "/products/blade-signs" },
      { source: "/wholesale-lightbox-signs", destination: "/products/lightboxes" },
      { source: "/seg-light-boxes", destination: "/products/seg-light-boxes" },
      { source: "/custom-sign-fabrication", destination: "/products/custom-fabrication" },
    ];
  },
};

export default nextConfig;
