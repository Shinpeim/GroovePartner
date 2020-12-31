#!/bin/bash

git pull publish
git merge --no-commit master
npm run build
date=$(date)
git add -f dist 
git commit -m "$date"
git push origin HEAD:publish
