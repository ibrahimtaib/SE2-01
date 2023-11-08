npx jest 2> jest.txt
cat jest.txt
passed=$(grep "Test Suites" < jest.txt | grep -o '[0-9]* passed' | sed 's/ passed//' | awk '{print $1}')
total=$(grep "Test Suites" < jest.txt | grep -o '[0-9]* total' | sed 's/ total//' | awk '{print $1}')
echo $passed
echo $total
anybadge -l Passed -v $passed -c lime -f passed-badge.svg -o
anybadge -l Total -v $total -c blue -f total-badge.svg -o