import { LocalDate } from 'js-joda';
export class Unit{
    public unitCode:number;
    public unitKey:string;
    public description:string;  
    public oldNumber:number;  
    public blockingDate:LocalDate;
    public blockingReason:string; 
    public salesPhase:string;  
    public constructionDate:LocalDate; 
    public unitDeliveryDate:LocalDate;
    public area:string;  
    public areaValue:number;  
    public noOfRooms:number;  
    public price:number;  
    public validFrom:LocalDate;
    public fromFloor:number;  
    public toFloor:number;  
    constructor(unitCode:number,unitKey:string,description:string,oldNumber:number,blockingDate:LocalDate,
        blockingReason:string,salesPhase:string,constructionDate:LocalDate,unitDeliveryDate:LocalDate,area:string,areaValue:number,noOfRooms:number,
        price:number,validFrom:LocalDate,fromFloor:number,toFloor:number
        ){
      this.unitCode=unitCode;
      this.unitKey=unitKey;
      this.description=description;
      this.oldNumber=oldNumber;
      this.blockingDate=blockingDate;
      this.blockingReason=blockingReason;
      this.salesPhase=salesPhase;
      this.constructionDate=constructionDate;
      this.unitDeliveryDate=unitDeliveryDate;
      this.area=area;
      this.areaValue=areaValue;
      this.noOfRooms=noOfRooms;
      this.price=price;
      this.validFrom=validFrom;
      this.fromFloor=fromFloor;
      this.toFloor=toFloor;
        
    }
    
}