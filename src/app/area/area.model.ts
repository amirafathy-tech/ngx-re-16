
export class Area{
    public areaCode: number;
    public areaMaster: string;
    public description: string;
    public projectFlag:boolean;
    public buildingFlag:boolean;
    public unitFlag:boolean;
    public unitOfMeasurement: number;
   
    constructor(areaCode: number, areaMaster: string,description: string,
        projectFlag:boolean,buildingFlag:boolean,unitFlag:boolean,unitOfMeasurement: number
    ) {
        this.areaCode=areaCode;
        this.areaMaster=areaMaster;
        this.description=description;
        this.projectFlag=projectFlag;
        this.buildingFlag=buildingFlag;
        this.unitFlag=unitFlag;
        this.unitOfMeasurement=unitOfMeasurement;
      
    }

}