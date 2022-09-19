# cron-parser

The typescript project processes the input command. Below are the steps to setup the project.

pre-requisites:
node > v12

Steps to run the program:
git clone git@github.com:stopcharla/cron-parser.git
cd cron-parse
npm install
npm run parser "<command goes here>"

sample: 

command
npm run parser "*/15 0 1,15 * 1-5 /usr/bin/find"

minutes 0 15 30 45 60  
hours 0  
day_month 1 15  
month 1 2 3 4 5 6 7 8 9 10 11 12  
day_week 1 2 3 4 5  
command /usr/bin/find
