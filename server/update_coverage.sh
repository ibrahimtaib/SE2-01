#!/bin/bash

# Run Jest coverage and capture the coverage percentage
npx --coverage jest 2&> jest.txt
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


cat jest.txt
OUTPUT=$(cat jest.txt | grep "Tests:" | awk -F'[, ]+' '/Tests:/ { print $4, ($6 ? $6 : $2) }'
)
echo $OUTPUT
read -r tests_passed total_tests <<< $OUTPUT

TEST_COLOR="green"
# Check if tests passed is less than total tests
if [ "$tests_passed" -lt "$total_tests" ]; then
    TEST_COLOR="red"
fi
echo $tests_passed$total_tests
sed -i'' -e "s/\!\[Total tests\].*/\!\[Total tests\](https:\/\/img\.shields\.io\/badge\/Total%20tests-${total_tests}-green)/g" README.md 
sed -i'' -e "s/\!\[Passed tests\].*/\!\[Passed tests\](https:\/\/img\.shields\.io\/badge\/Passed%20tests-${tests_passed}-${TEST_COLOR})/g" README.md 

sed -i'' -e "s/\!\[Total tests\].*/\!\[Total tests\](https:\/\/img\.shields\.io\/badge\/Total%20tests-${total_tests}-green)/g" ../README.md 
sed -i'' -e "s/\!\[Passed tests\].*/\!\[Passed tests\](https:\/\/img\.shields\.io\/badge\/Passed%20tests-${tests_passed}-${TEST_COLOR})/g" ../README.md 
# Update REA  DME.md with shields.io badges
sed -i'' -e "s/\!\[Coverage\].*/\!\[Coverage\](https:\/\/img\.shields\.io\/badge\/Coverage-${COVERAGE}%25-${COLOR})/g" README.md 
sed -i'' -e "s/\!\[Coverage\].*/\!\[Coverage\](https:\/\/img\.shields\.io\/badge\/Coverage-${COVERAGE}%25-${COLOR})/g" ../README.md 
