import { CronParser } from "./src/cronParser";
const args = process.argv;

if(args.length === 3){
  try{
    const expression = new CronParser(args[2]);
    console.log(expression.getStringValue());
  }catch(err){
    console.log('Invalid cron expression!', err);
  }
}else{
  console.log('Invalid arguments');
}

