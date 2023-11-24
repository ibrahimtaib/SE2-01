#!/bin/bash

# Run Jest coverage and capture the coverage percentage
npx --coverage jest 
COVERAGE=$(npx jest | grep -oP "All files.*" | awk '{ match($0, /[0-9]+(\.[0-9]+)?/); print substr($0, RSTART, RLENGTH) }')
echo $COVERAGE
COLOR="green"
# Check if coverage is less than 80
if [ "$(echo "$COVERAGE < 80" | bc -l)" -eq 1 ]; then
    COLOR="yellow"
fi

# Check if coverage is less than 50
if [ "$(echo "$COVERAGE < 50" | bc -l)" -eq 1 ]; then
    COLOR="red"
fi

# Update REA  DME.md with shields.io badges
sed -i'' -e "s/\!\[Coverage\].*/\!\[Coverage\](https:\/\/img\.shields\.io\/badge\/Coverage-${COVERAGE}%-${COLOR})/g" README.md 
sed -i'' -e "s/\!\[Coverage\].*/\!\[Coverage\](https:\/\/img\.shields\.io\/badge\/Coverage-${COVERAGE}%-${COLOR})/g" ../README.md 
