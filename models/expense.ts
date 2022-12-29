import Realm from 'realm';

import { Recurrence } from '../types/recurrence';
import { Category } from './category';

export class Expense extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  amount: number;
  recurrence: string;
  date: Date;
  note: string;
  category: Category;

  static generate(
    amount: number,
    recurrence: Recurrence,
    date: Date,
    note: string,
    category: Category
  ) {
    return {
      _id: new Realm.BSON.ObjectId(),
      amount,
      recurrence: recurrence.toString(),
      date,
      note,
      category,
    };
  }
  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema = {
    name: 'Expense',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      amount: 'int',
      recurrence: 'string',
      date: 'date',
      note: 'string',
      category: 'Category?',
    },
  };
}
