const withPlugins = require('next-compose-plugins');

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
},
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'platform-lookaside.fbsbx.com',
      'res.cloudinary.com',
    ],
  },
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
