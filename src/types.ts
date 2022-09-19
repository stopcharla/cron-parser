export type cronFieldType = {
  max: number,
  min: number,
  type: string,
  fieldNames?:[string];
}

export const CronFields  = {
  MINUTES: { max: 60, min: 0, type: 'minutes' },
  HOURS: { max: 23, min: 0, type: 'hours' },
  DAY_OF_MONTH: { max: 30, min: 1, type: 'day_month' },
  MONTH: { min:1, max:12, type: 'month' },
  DAY_OF_WEEK: { min:1, max:7, type: 'day_week' },
}

export enum AllowedCronFields {
  MINUTES,
  HOURS,
  DAY_OF_MONTH,
  MONTH,
  DAY_OF_WEEK,
}
