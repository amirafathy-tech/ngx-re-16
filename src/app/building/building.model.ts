import { LocalDate } from 'js-joda';
export class Building {
    public buildingCode:number;
    public profitCode: number;
    public projectCode: number;
    public buildingTypeCode: number;
    public buildingId: string;
    public buildingDescription: string;
    public oldNumber: string;
    public validFrom: Date;
    public numberOfFloors: number;
    public profit: string;
    constructor(profitCode: number,projectCode: number,buildingTypeCode: number, buildingId: string,
         buildingDescription: string, oldNumber: string,
        validFrom: Date, numberOfFloors: number, profit: string
    ) {
        this.profitCode = profitCode;
        this.projectCode=projectCode;
        this.buildingTypeCode=buildingTypeCode;
        this.buildingId = buildingId;
        this.buildingDescription = buildingDescription;
        this.oldNumber = oldNumber;
        this.validFrom = validFrom;
        this.numberOfFloors = numberOfFloors;
        this.profit = profit;
    }

}