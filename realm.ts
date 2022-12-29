import { createRealmContext } from '@realm/react';
import { Category } from './models/category';
import { Expense } from './models/expense';

const config = {
  schema: [Category, Expense],
};
export default createRealmContext(config);
