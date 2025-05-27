# js-common

a set of common node/js functions to be used in all projects



## Getting started

run `. ./setup.sh` to grab NPM_TOKEN from .env

## tags

`git fetch --prune --tags`
`git tag -l 'v1.0.*' | xargs -n 1 git push origin --delete`
`git tag -l | xargs -I {} git push origin --delete {}`
`git tag -l | xargs git tag -d`

  # Publish js-common
@rtorcato/js-common:registry=https://gitlab.com/api/v4/projects/69645966/packages/npm/
//gitlab.com/api/v4/projects/69645966/packages/npm/:_authToken=${NPM_TOKEN}

# Install js-tooling
@rtorcato/js-tooling:registry=https://gitlab.com/api/v4/projects/60855075/packages/npm/
//gitlab.com/api/v4/projects/60855075/packages/npm/:_authToken=${NPM_TOKEN}