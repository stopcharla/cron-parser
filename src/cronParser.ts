import { CronField } from "./field";
import { CronFields } from "./types";

export class CronParser {
  private minutes: CronField;
  private hours: CronField;
  private dayOfMonth: CronField;
  private month: CronField;
  private dayOfWeek: CronField;
  private command: string;

  private expr;
  constructor(expr: string){
    this.expr = expr;
    let fields = this.expr.trim().split(/\s+/);
    if(fields.length < 6){
      throw new Error('Invalid cron expression');
    }

    this.minutes = new CronField(CronFields.MINUTES, fields[0]);
    this.hours = new CronField(CronFields.HOURS, fields[1]);
    this.dayOfMonth = new CronField(CronFields.DAY_OF_MONTH, fields[2]);
    this.month = new CronField(CronFields.MONTH, fields[3]);
    this.dayOfWeek = new CronField(CronFields.DAY_OF_WEEK, fields[4]);
    this.command = fields[5];
  }

  getStringValue() {
    return this.minutes.getText() +
           this.hours.getText() + 
           this.dayOfMonth.getText() + 
           this.month.getText() +
           this.dayOfWeek.getText() + 
           'command ' + this.command;
  }
}