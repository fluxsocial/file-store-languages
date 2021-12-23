#!/bin/bash
set -e

################### Begin release process ###################
echo "Creating releases of file store languages inside ./release"
rm -rf release && mkdir release

[ ! -e "./src/config_origin.ts" ] && cp ./src/language_config.ts ./src/language_config_origin.ts
[ ! -e "./src/schema_origin.json" ] && cp ./src/schema.json ./src/schema_origin.json

################### UI bundle store ###################
echo "Create UI bundle store language release..."

# Get new config & build language
cp ./src/ui-bundle/language_config.ts ./src/language_config.ts
cp ./src/ui-bundle/schema.json ./src/schema.json
npm install && npm run build

# Copy the build files to the release dir
cp ./build/bundle.js ./release/ui-bundle-store.js

################### Finish release process, move original files back ###################
mv ./src/language_config_origin.ts ./src/language_config.ts
mv ./src/schema_origin.json ./src/schema.json
