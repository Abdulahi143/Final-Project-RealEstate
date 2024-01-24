const withPlugins = require('next-compose-plugins');

const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'platform-lookaside.fbsbx.com',
      'res.cloudinary.com',
    ],
  },
  // Add any other Next.js configurations here
};

module.exports = withPlugins([], nextConfig, {
  webpack: (config) => {
    // Add a rule for HTML files
    config.module.rules.push({
      test: /\.html$/,
      use: 'html-loader',
    });

    return config;
  },
});
