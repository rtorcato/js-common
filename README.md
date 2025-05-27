# js-common

a set of common node/js functions to be used in all projects



## Getting started

run `. ./setup.sh` to grab NPM_TOKEN from .env

## tags

`git fetch --prune --tags`
`git tag -l 'v1.0.*' | xargs -n 1 git push origin --delete`
`git tag -l | xargs -I {} git push origin --delete {}`
`git tag -l | xargs git tag -d`