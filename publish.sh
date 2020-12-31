#!/bin/bash

git checkout publish
git merge --no-commit master
npm run build
date=$(date)
git add dist
git commit -m "$date"
git push origin publish
