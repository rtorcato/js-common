#!/bin/bash

# Commands to complete the GitHub migration
# Run these after creating the repository on GitHub

# Add the new GitHub remote
git remote add origin https://github.com/rtorcato/js-common.git

# Push your code to GitHub
git branch -M main
git push -u origin main

echo "✅ Repository successfully pushed to GitHub!"
echo ""
echo "🎯 Next steps:"
echo "1. Go to https://github.com/rtorcato/js-common"
echo "2. Set up npm publishing token in GitHub Secrets"
echo "3. Go to Settings > Secrets and variables > Actions"
echo "4. Add a new secret named 'NPM_TOKEN' with your npm token"
echo ""
echo "📦 To publish to npm, create a release on GitHub:"
echo "1. Go to the Releases section"
echo "2. Click 'Create a new release'"
echo "3. Tag version (e.g., v1.0.12)"
echo "4. This will trigger the publish workflow"