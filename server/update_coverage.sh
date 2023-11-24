#!/bin/bash

# Run Jest coverage and capture the coverage percentage
npx --coverage jest 
COVERAGE=$(npx jest | grep -oP "All files.*" | awk '{ match($0, /[0-9]+(\.[0-9]+)?/); print substr($0, RSTART, RLENGTH) }')'%'
echo $COVERAGE
# Update REA  DME.md with shields.io badges
sed -i'' -e "s/\!\[Coverage\].*/\!\[Coverage\](https:\/\/img\.shields\.io\/badge\/Coverage-${COVERAGE}-green)/g" README.md 
