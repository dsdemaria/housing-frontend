import { actionEmitter } from '../utils';
import { actionTypes } from './constants';

export const updateUserIncome = actionEmitter(actionTypes.UPDATE_USER_INCOME);
export const updateUserUnitSizeValue = actionEmitter(actionTypes.UPDATE_USER_UNIT_SIZE);
export const updateOtherUnitSizeValue = actionEmitter(actionTypes.UPDATE_OTHER_UNIT_SIZE);
export const updateOtherDemographicValue = actionEmitter(actionTypes.UPDATE_OTHER_DEMOGRAPHIC);
