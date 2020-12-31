#!/bin/bash
git fetch
git checkout publish
git merge --no-commit master
npm run build
date=$(date)
git add -f dist 
git commit -m "$date"
git push origin HEAD:publish
