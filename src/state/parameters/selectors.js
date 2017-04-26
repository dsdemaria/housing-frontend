import { createSelector } from 'reselect';
import { propOr, path } from 'ramda';
import {
  DEMOGRAPHICS,
  UNIT_SIZES_AFFORDABILITY,
  DEFAULT_INCOME,
  UNIT_SIZES_RENT,
} from '../../utils/data-constants';

export const getUserState = state => path(['parameters', 'user', 'value'], state);

export const getOtherState = state => path(['parameters', 'other', 'value'], state);

export const getUserParameters = createSelector(
  getUserState,
  user => user,
);

export const getOtherParameters = createSelector(
  getOtherState,
  other => other,
);

export const getUserIncome = createSelector(
  getUserParameters,
  propOr(DEFAULT_INCOME, 'income'),
);

export const getUserUnitSize = createSelector(
  getUserParameters,
  propOr(UNIT_SIZES_RENT[0].value, 'unitSize'),
);

export const getOtherDemographic = createSelector(
  getOtherParameters,
  propOr(DEMOGRAPHICS[0].value, 'demographic'),
);

export const getOtherUnitSize = createSelector(
  getOtherParameters,
  propOr(UNIT_SIZES_AFFORDABILITY[0].value, 'unitSize'),
);
