#!/bin/bash
set -e

################### Begin release process ###################
echo "Creating releases of file store languages inside ./release"
rm -rf release && mkdir release

[ ! -e "./src/config_origin.ts" ] && cp ./src/config.ts ./src/config_origin.ts

################### UI bundle store ###################
echo "Create UI bundle store language release..."

# Get new config & build language
cp ./src/ui-bundle/config.ts ./src/config.ts
npm install && npm run build

# Copy the build files to the release dir
cp ./build/bundle.js ./release/ui-bundle-store.js

################### Finish release process, move original files back ###################
mv ./src/config_origin.ts ./src/config.ts
