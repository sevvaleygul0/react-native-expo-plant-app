const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Ensure uppercase .OTF font files are resolved (Metro's default assetExts use lowercase)
config.resolver.assetExts = [
  ...config.resolver.assetExts,
  "OTF",
];

module.exports = config;
