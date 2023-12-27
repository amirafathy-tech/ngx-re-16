import { LocalDate } from 'js-joda';
export class Unit {
  public unitCode: number;
  public buildingCode: number;
  public areaCode: number;
  public unitFixtureCode: number;
  public unitFloorCode: number;
  public unitOrientationCode: number;
  public unitStatusCode: number;
  public unitSubtypeCode: number;
  public unitViewCode: number;
  public usageTypeCode: number;


  public unitKey: string;
  public description: string;
  public oldNumber: number;
  public blockingDate: Date;
  public blockingReason: string;
  public salesPhase: string;
  public constructionDate: Date;
  public unitDeliveryDate: Date;
  public area: string;
  public areaValue: number;
  public noOfRooms: number;
  public price: number;
  public validFrom: Date;
  public fromFloor: number;
  public toFloor: number;
  constructor(buildingCode: number, areaCode: number, unitFixtureCode: number,
    unitFloorCode: number, unitOrientationCode: number, unitStatusCode: number,
    unitSubtypeCode: number, unitViewCode: number, usageTypeCode: number,
    unitKey: string, description: string, oldNumber: number, blockingDate: Date,
    blockingReason: string, salesPhase: string, constructionDate: Date, unitDeliveryDate: Date, area: string, areaValue: number, noOfRooms: number,
    price: number, validFrom: Date, fromFloor: number, toFloor: number
  ) {
    this.buildingCode = buildingCode;
    this.areaCode = areaCode;
    this.unitFixtureCode = unitFixtureCode;
    this.unitFloorCode = unitFloorCode;
    this.unitOrientationCode = unitOrientationCode;
    this.unitStatusCode = unitStatusCode;
    this.unitSubtypeCode = unitSubtypeCode;
    this.unitViewCode = unitViewCode;
    this.usageTypeCode = usageTypeCode;
    this.unitKey = unitKey;
    this.description = description;
    this.oldNumber = oldNumber;
    this.blockingDate = blockingDate;
    this.blockingReason = blockingReason;
    this.salesPhase = salesPhase;
    this.constructionDate = constructionDate;
    this.unitDeliveryDate = unitDeliveryDate;
    this.area = area;
    this.areaValue = areaValue;
    this.noOfRooms = noOfRooms;
    this.price = price;
    this.validFrom = validFrom;
    this.fromFloor = fromFloor;
    this.toFloor = toFloor;

  }

}