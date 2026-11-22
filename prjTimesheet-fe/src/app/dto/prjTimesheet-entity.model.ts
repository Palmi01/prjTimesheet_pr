//@@ Struttura dati del singolo elemento del Timesheet
export class prjTimesheetEntity {
  id: string|undefined;
  name!: string;    //@@ Nome del progetto
  resourceName!: string;
  resourceSurname!: string;
  hours!: number;
  phase!: string;
  dataAndTime!: string;
}
