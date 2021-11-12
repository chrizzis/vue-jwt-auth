#!/usr/bin/env sh

# abort on errors
set -e

# build
NODE_ENV=production yarn build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# !!! GitHub repos init to main, git init to master
# git push -f git@github.com:chrizzis/vue-jwt-auth.git main:gh-pages
# WOW: git is still defaulting to master vs main - need to update local git
git push -f git@github.com:chrizzis/vue-jwt-auth.git master:gh-pages
# git push -f git@github.com:chrizzis/<REPO>.git master:gh-pages

cd -