#!/usr/bin/env bash
npm --no-git-tag-version --tag-version-prefix="" version patch
ng build --prod --aot
docker build -t fergalmoran/retns-frontent .
docker push fergalmoran/retns-frontent
