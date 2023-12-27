import { LocalDate } from 'js-joda';
export class Project {
    public projectCode:number;
    public companyCode: number;
    public profitCode: number;
    public locationCode: number;
    public projectId: string;
    public projectDescription: string;
    public validFrom: Date;
    public profit: string;
    
    constructor(projectId: string, projectDescription: string, validFrom: Date, profit: string,
        companyCode: number,profitCode: number,locationCode: number,
    ) {
        this.companyCode=companyCode;
        this.profitCode=profitCode;
        this.locationCode=locationCode;
        this.projectId=projectId;
        this.projectDescription=projectDescription;
        this.validFrom = validFrom;
        this.profit = profit;
    }

}