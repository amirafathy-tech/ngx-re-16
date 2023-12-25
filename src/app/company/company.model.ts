export class Company{
   // public id:number;
   public companyCodeId:string;
    public companyCodeDescription:string;    
    constructor(code:string,desc:string){
        // this.id = id;
        this.companyCodeId=code;
        this.companyCodeDescription=desc;
        
    }
    
}