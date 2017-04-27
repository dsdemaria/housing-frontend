import { actionEmitter } from '../utils';
import { actionTypes } from './constants';
import { api } from '../api';
import { getOtherUnitSizeValue, getOtherDemographicValue } from '../parameters/selectors';

export const affordabilityStart = actionEmitter(actionTypes.CALL_START);
export const affordabilityFail = actionEmitter(actionTypes.CALL_FAIL);
export const affordabilitySuccess = actionEmitter(actionTypes.CALL_SUCCESS);

export const fetchAffordabilityData = api('/affordable', {
  start: affordabilityStart,
  success: affordabilitySuccess,
  fail: affordabilityFail,
  normalizer: json => json.map(({ affordable, NP_ID }) => ({
    id: NP_ID,
    affordable,
  })),
  buildParams: state => ({
    housing_size: getOtherUnitSizeValue(state),
    demographic: getOtherDemographicValue(state),
  }),
});
