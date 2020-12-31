#!/bin/bash

git checkout publish
git merge --no-commit master
ng build
date=$(date)
git commit -m "$date"
git push origin publish
