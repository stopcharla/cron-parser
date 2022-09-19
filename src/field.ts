import { cronFieldType } from "./types";

export class CronField {
  private type: cronFieldType;
  private values = new Set<number>();
  public text: string;
  private areValuesUpdated: boolean;

  constructor(type: cronFieldType,text: string){
    this.type = type;
    this.text = text;
    this.areValuesUpdated = false;

    this.parseText();
  }

  parseText(){
    this.parseExactValues();
    this.parseRangeValues();
    this.parseStepValues();
    this.parseSingleValue();
  }

  parseSingleValue(){
    if(!this.areValuesUpdated){
      this.updateNumberValues(parseInt(this.text),parseInt(this.text),1);
      this.areValuesUpdated = true;
    }
  }

  parseExactValues(){
    if(!this.areValuesUpdated){
      const exactValues = this.text.split(",");
      if (exactValues.length > 1) {
        for(let value of exactValues){
          this.updateNumberValues(parseInt(value), parseInt(value), 1)
        }
        this.areValuesUpdated = true;
      }
    }
  }

  updateNumberValues(start:number, end: number, increment: number){
    if(increment === 0 ||
       isNaN(start) ||
       isNaN(end) ||
       isNaN(increment) ||
       start > end ||
       start < this.type.min ||
       end > this.type.max){
      throw new Error('Invalid cron expression!')
    }

    for(let i=start; i<= end; i+=increment){
      this.values.add(i);
    }
  }

  parseStepValues(){
    if(!this.areValuesUpdated){
      const stepValues = this.text.split("/");
      if(stepValues[0] === '*' && stepValues.length < 3){
        let increment = 1;
        if(stepValues.length === 2){
          increment = parseInt(stepValues[1]);
        }
        this.updateNumberValues(this.type.min, this.type.max, increment);
        this.areValuesUpdated = true;
      }else if(stepValues.length > 1){
        throw new Error('Invalid cron expression!');
      }
    }
  }

  parseRangeValues(){
    if(!this.areValuesUpdated){
      const rangeValues = this.text.split("-");
      if (rangeValues.length === 2) {
        let value1 = rangeValues[0];
        let value2 = rangeValues[1];
        this.updateNumberValues(parseInt(value1),parseInt(value2),1);
        this.areValuesUpdated = true;
      }
    }
  }

    getText(){
      let valuesArray = Array.from(this.values.values());
      return `${this.type.type} ${valuesArray.reduce((prev, cur) => prev + cur + ' ', '')} \n`
    }
  }