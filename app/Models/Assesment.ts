import { DateTime } from "luxon";
import { BaseModel, column, HasOne, hasOne } from "@ioc:Adonis/Lucid/Orm";
import User from "App/Models/User";

export default class Assesment extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public createdBy: Number;

  @column()
  public title: string;

  @column()
  public description: string;

  @column()
  public grade: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
