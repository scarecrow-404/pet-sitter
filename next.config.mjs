/** @type {import('next').NextConfig} */
// import withImages from "next-images";

const nextConfig = {
  images: {
    domains: ["twbnpazhgudgqhmulgru.supabase.co"],
  },
};

// const withImages = require("next-images");
// const withTM = require("next-transpile-modules")(["@madzadev/image-slider"]);
// module.exports = withImages(withTM());

export default nextConfig;
