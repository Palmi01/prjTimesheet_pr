import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {prjTimesheetEntity} from '../../dto/prjTimesheet-entity.model';
import {prjTimesheetEntityService} from '../../service/prjTimesheet-entity.service';
import {lastValueFrom} from 'rxjs';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButton, MatButtonModule} from '@angular/material/button';

//@@ Riferimento alla tabella contenente i dati dei progetti
//@@ e struttura dati per il refresh della pagina con i dati di un singolo progetto
let prjTimesheetTable: prjTimesheetEntity[];
let SingleProjectTimesheetTable: prjTimesheetEntity[] = [];
let pageReload: boolean;

@Component({
  selector: 'app-sample-entities',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatButton
  ],
  templateUrl: './prjTimesheet-entities.component.html',
  styleUrl: './prjTimesheet-entities.component.scss'
})

export class prjTimesheetEntitiesComponent implements OnInit {
  //@@ La colonna id non viene visualizzazione perchè non da valore aggiunto
  displayedColumns: string[] = ['name', 'resourceName', 'resourceSurname','hours','phase','dataAndTime','action'];
  dataSource: prjTimesheetEntity[]=[];
  readonly dialog = inject(MatDialog);

  constructor(private prjTimesheetEntitiesService: prjTimesheetEntityService) {}

  async ngOnInit() {
    await this.loadprjTimesheetEntities();
  }

  async loadprjTimesheetEntities(): Promise<void> {
 
    if (pageReload) { 
        //@@ Refresh della pagina con i dati di un singolo progetto
        this.dataSource = SingleProjectTimesheetTable;
        pageReload = false;
    }  
    //@@ Refresh della pagina con i dati di tutti i progetti 
    else this.dataSource=await lastValueFrom(this.prjTimesheetEntitiesService.getAll());
    console.log(this.dataSource);
    //@@ Salvataggio riferimento a tabella contenete i dati dei progetti per successive analisi 
    prjTimesheetTable = this.dataSource;
  }

  //@@ Gestione apertura finestra di dialogo per inserimento di un nuovo progetto
  openDialogProject(): void {
    const dialogRef = this.dialog.open(DialogAddProject, {});
    this.loadprjTimesheetEntities();
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadprjTimesheetEntities().then(r => {
        console.log('prjTimesheet entities reloaded');
      });
    });
  }
 
  //@@ Gestione apertura finestra di dialogo per l'inserimento delle ore spese 
  //@@ in un'attività di un progetto
  openDialogTime(): void { 
    const dialogRef = this.dialog.open(DialogAddTime, {});
    this.loadprjTimesheetEntities();
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadprjTimesheetEntities().then(r => {
        console.log('prjTimesheet entities reloaded');
      });
    });
  }
 
  //@@ Gestione apertura finestra di dialogo per la visualizzazione dei dati 
  //@@ di un singolo progetto 
  openDialogData(): void {
    const dialogRef = this.dialog.open(DialogProjectData, {});
    this.loadprjTimesheetEntities();
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadprjTimesheetEntities().then(r => {
        console.log('prjTimesheet entities reloaded');
      });
    });
  }

  async deleteItem(id: string): Promise<void> {
    await lastValueFrom(this.prjTimesheetEntitiesService.delete(id));
    await this.loadprjTimesheetEntities();
  }
}

@Component(
  {
    selector: 'dialog-add-time',
    templateUrl: './dialog-add-time.html',
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatButtonModule,
      MatDialogTitle,
      MatDialogContent,
      MatDialogActions
    ]
  }
)

//@@ Gestione della finestra di l'inserimento delle ore spese in un'attività 
//@@ realtiva a una fase di un progetto
export class DialogAddTime{
  readonly dialogRef = inject(MatDialogRef<DialogAddTime>);
  name: string='';
  resourceName: string='';
  resourceSurname: string='';
  hours: number = 0;
  phase: string='';
  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor(private prjTimesheetEntityService: prjTimesheetEntityService) {}

  async save() {
    let projectFound: boolean = false;
    let entity = new prjTimesheetEntity();
    const dataAndTime = new Date();

    entity.dataAndTime = dataAndTime.toLocaleString();
    entity.name = this.name;
    entity.resourceName = this.resourceName;
    entity.resourceSurname = this.resourceSurname;
    entity.hours = this.hours;
    entity.phase = this.phase;
    //@@ Verifica completezza dei dati inseriti
    if ((entity.name == "") ||
    (entity.resourceName == "") ||
    (entity.resourceSurname == "") ||
    (entity.hours == 0) ||
    (entity.phase == "")) prompt("Error: A field is empty");
    else { 
       //@@ Verifica esistenza progetto nella tabella dati dei progetti
       projectFound = false;
       for (let i in prjTimesheetTable) {
         if (prjTimesheetTable[i].name == entity.name)  projectFound = true;
       }
       if (!projectFound) prompt("Error: Error: Project Not Found")
       else { 
         await lastValueFrom(this.prjTimesheetEntityService.create(entity));
         this.dialogRef.close();
       }
    }
  }
}

@Component(
  {
    selector: 'dialog-add-project',
    templateUrl: './dialog-add-project.html',
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatButtonModule,
      MatDialogTitle,
      MatDialogContent,
      MatDialogActions
    ]
  }
)

//@@ Gestione della finestra per l'inserimento di un nuovo progetto
export class DialogAddProject{
  readonly dialogRef = inject(MatDialogRef<DialogAddProject>);
  name: string='';
  resourceName: string='';
  resourceSurname: string='';
  hours: number = 0;
  phase: string='';
  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor(private prjTimesheetEntityService: prjTimesheetEntityService) {}

  async save() {

    let projectFound: boolean = false;
    let entity = new prjTimesheetEntity();
    const dataAndTime = new Date();

    entity.dataAndTime = dataAndTime.toLocaleString();
    entity.name = this.name;
    entity.resourceName = this.resourceName;
    entity.resourceSurname = this.resourceSurname;
    entity.hours = this.hours;
    entity.phase = this.phase;
    entity.phase = "Project Management";
    //@@ Verifica completezza dei dati inseriti
    if ((entity.name == "") ||
    (entity.resourceName == "") ||
    (entity.resourceSurname == "") ||
    (entity.hours == 0) ||
    (entity.phase == "")) prompt("Error: A field is empty");
    else { 
      //@@ Verifica esistenza progetto nella tabella dati dei progetti
      projectFound = false;
      for (let i in prjTimesheetTable) {
        if (prjTimesheetTable[i].name == entity.name)  projectFound = true;
      }
      if (projectFound) prompt("Error: Project Already Exist")
      else { 
        await lastValueFrom(this.prjTimesheetEntityService.create(entity));
        this.dialogRef.close();
      }
    }
  }
}

@Component(
  {
    selector: 'dialog-project-data',
    templateUrl: './dialog-project-data.html',
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatButtonModule,
      MatDialogTitle,
      MatDialogContent,
      MatDialogActions
    ]
  }
)
//@@ Gestione finestra di visualizzazione dei dati di un progetto
export class DialogProjectData{
  readonly dialogRef = inject(MatDialogRef<DialogAddProject>);
  name: string='';
  resourceName: string='';
  resourceSurname: string='';
  hours: number = 0;
  phase: string='';
  onNoClick(): void {
    this.dialogRef.close();
  }

  async save() {

    let projectFound: boolean = false;
    let analisysHours: number = 0;
    let designHours: number = 0;
    let implementationHours: number = 0;
    let testingHours: number = 0;
    let projectManagementHours: number = 0;
    let totalHours: number = 0;
    let entity = new prjTimesheetEntity();
   
    entity.name = this.name;
    SingleProjectTimesheetTable = [];

    for (let i in prjTimesheetTable) {
      if (prjTimesheetTable[i].name == entity.name)  projectFound = true;
      if ((prjTimesheetTable[i].name == entity.name) && projectFound) {
       //@@ Creazione della tabella con i soli dati del progetto selezionato
        SingleProjectTimesheetTable.push(prjTimesheetTable[i]);
       //@@ Calcolo dei dati relativi alle ore impiegate nelle fasi di progettazione
        totalHours += prjTimesheetTable[i].hours;
        switch (prjTimesheetTable[i].phase) {
          case "Analisys":
            analisysHours += prjTimesheetTable[i].hours ;
          break;
          case "Design":
            designHours += prjTimesheetTable[i].hours ;
          break;
          case "Implementation":
            implementationHours += prjTimesheetTable[i].hours ;
          break;
          case "Testing":
            testingHours += prjTimesheetTable[i].hours ;
          break;      
          case "Project Management":
            projectManagementHours += prjTimesheetTable[i].hours ;
          break; 
        }
      }
    }

    //@@ Verifica del dato inserito
    if (entity.name == "")  prompt("Error: A field is empty");
    else if (!projectFound) prompt("Error: Error: Project Not Found")
      else { 
        //@@ Visualizzazione dei dati del progetto selezionato in una finestra di pop up 
        const popUpWindow = window.open("", "_blank", "width=300,height=225");
        if (popUpWindow) {
          popUpWindow.document.writeln(`
            <html>
              <head>
                <title>Project Data</title>
                <style>
                  body { font-family: Arial; padding: 20px; }
                  h2 { color: #2c3e50; }
                  ul { list-style-type: none; padding: 0; }
                  li { margin-bottom: 5px; }
                </style>
              </head>
              <body>
                <h2>Project: ${entity.name}</h2>
                <ul>
                  <li><strong>Analisys:</strong> ${analisysHours} hours</li>
                  <li><strong>Design:</strong> ${designHours} hours</li>
                  <li><strong>Implementation:</strong> ${implementationHours} hours</li>
                  <li><strong>Testing:</strong> ${testingHours} hours</li>
                  <li><strong>Project Management:</strong> ${projectManagementHours} hours</li>
                  <li><strong>Total:</strong> ${totalHours} hours</li>
                </ul>
              </body>
            </html>
          `);
          pageReload = true;
        }  
        this.dialogRef.close(); 
      }    
  }
  
}