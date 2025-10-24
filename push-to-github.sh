#!/bin/bash

echo "🚀 Migrating js-common to GitHub..."
echo ""

# Check if GitHub repository exists first
echo "⚠️  IMPORTANT: Make sure you've created the repository on GitHub first!"
echo "   Go to https://github.com/new and create a repository named 'js-common'"
echo "   Set it as PUBLIC and do NOT initialize with README, .gitignore, or license"
echo ""
read -p "Have you created the GitHub repository? (y/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Please create the GitHub repository first, then run this script again."
    exit 1
fi

# Add the new GitHub remote
echo "🔗 Adding GitHub remote..."
git remote add origin https://github.com/rtorcato/js-common.git

# Push your code to GitHub
echo "📤 Pushing code to GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ Repository successfully pushed to GitHub!"
echo ""
echo "🎯 Complete the setup:"
echo "1. 🌐 Visit: https://github.com/rtorcato/js-common"
echo "2. 🔑 Set up npm publishing token:"
echo "   • Go to Settings > Secrets and variables > Actions"
echo "   • Click 'New repository secret'"
echo "   • Name: NPM_TOKEN"
echo "   • Value: Your npm access token (get from https://npmjs.com/settings/tokens)"
echo ""
echo "📦 To publish to npm:"
echo "1. Go to Releases section on GitHub"
echo "2. Click 'Create a new release'"
echo "3. Create a new tag (e.g., v1.0.12)"
echo "4. Add release notes"
echo "5. Publish release (this triggers the publish workflow)"
echo ""
echo "🧪 GitHub Actions will automatically:"
echo "• Run tests on every PR and push"
echo "• Build and publish to npm on every release"
echo ""
echo "🎉 Migration complete! Your package is now public and ready for GitHub!"