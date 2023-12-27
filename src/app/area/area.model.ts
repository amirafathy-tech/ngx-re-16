
export class Area{
    public areaCode: number;
    public projectAreaCode: number;
    public buildingAreaCode: number;
    public unitAreaCode: number;
    public measurementCode: number;

    public areaMaster: string;
    public description: string;
    // public projectFlag:boolean;
    // public buildingFlag:boolean;
    // public unitFlag:boolean;
    public projectFlag:string;
    public buildingFlag:string;
    public unitFlag:string;
   
    constructor(projectAreaCode: number,buildingAreaCode: number,unitAreaCode: number,
        measurementCode: number, areaMaster: string,description: string,
        projectFlag:string,
        buildingFlag:string,
        unitFlag:string
    ) {
        this.projectAreaCode=projectAreaCode;
        this.buildingAreaCode=buildingAreaCode;
        this.unitAreaCode=unitAreaCode;
        this.measurementCode=measurementCode;
        
        this.areaMaster=areaMaster;
        this.description=description;
        this.projectFlag=projectFlag;
        this.buildingFlag=buildingFlag;
        this.unitFlag=unitFlag;
      
    }

}