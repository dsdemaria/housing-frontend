/* eslint-disable import/no-extraneous-dependencies */
// This should probably be the core component, containing, nav etc

import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Dropdown from '@hackoregon/component-library/lib/Dropdown/Dropdown';
import Slider from '@hackoregon/component-library/lib/Slider/Slider';
import { fetchAffordabilityData } from '../../state/affordability/actions';
import { fetchRentData } from '../../state/rent/actions';
import { fetchNeighborhoods } from '../../state/neighborhoods/actions';
import { isAnyCallPending, getCombinedNeighborhoodsData } from '../../state/globalSelectors';
import Map from '../Map';

import {
  updateOtherUnitSize,
  updateOtherDemographic,
  updateUserIncome,
  updateUserUnitSize,
} from '../../state/parameters/actions';
import {
  getUserIncome,
  getUserUnitSizeValue,
  getOtherDemographicValue,
  getOtherUnitSizeValue,
} from '../../state/parameters/selectors';
import {
  DEMOGRAPHICS,
  UNIT_SIZES_AFFORDABILITY,
  UNIT_SIZES_RENT,
  DEFAULT_INCOME,
  MIN_INCOME,
  MAX_INCOME,
} from '../../utils/data-constants';

const Container = styled.div`
  min-height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export function App({
  neighborhoodData,
  userIncome,
  userUnitSize,
  setUserIncome,
  setUserUnitSize,
  otherDemographic,
  otherUnitSize,
  setOtherUnitSize,
  setOtherDemographic,
}) {
  return (
    <Container>
      # Your income
      <Slider
        min={MIN_INCOME}
        max={MAX_INCOME}
        value={userIncome}
        onChange={setUserIncome}
      />
      # Your Housing Type
      <Dropdown
        value={userUnitSize}
        onChange={event => setUserUnitSize(event)}
        options={UNIT_SIZES_RENT}
      />
      # Others Housing Type
      <Dropdown
        value={otherUnitSize}
        onChange={event => setOtherUnitSize(event)}
        options={UNIT_SIZES_AFFORDABILITY}
      />
      # Others Demographic
      <Dropdown
        value={otherDemographic}
        onChange={event => setOtherDemographic(event)}
        options={DEMOGRAPHICS}
      />
      <Map neighborhoods={neighborhoodData} />
    </Container>
  );
}

App.displayName = 'App';
App.defaultProps = {
  children: <div />,
  neighborhoodData: {},
  userIncome: DEFAULT_INCOME,
  userUnitSize: UNIT_SIZES_RENT[0].value,
  setUserIncome: () => {},
  setUserUnitSize: () => {},
  otherDemographic: DEMOGRAPHICS[0].value,
  otherUnitSize: UNIT_SIZES_AFFORDABILITY[0].value,
  setOtherDemographic: () => {},
  setOtherUnitSize: () => {},
  isLoading: false,
};

App.propTypes = {
  neighborhoodData: React.PropTypes.object,
  setOtherDemographic: React.PropTypes.func,
  setOtherUnitSize: React.PropTypes.func,
  otherDemographic: React.PropTypes.string,
  otherUnitSize: React.PropTypes.string,
  userIncome: React.PropTypes.number,
  userUnitSize: React.PropTypes.string,
  setUserIncome: React.PropTypes.func,
  setUserUnitSize: React.PropTypes.func,
};

const mapDispatch = (dispatch) => {
  /**
   * Not sure if this is really where we should be doing this,
   * but doing it here for now since we already have access to dispatch
   */
  dispatch(fetchAffordabilityData());
  dispatch(fetchRentData());
  dispatch(fetchNeighborhoods());

  return {
    setOtherUnitSize: (size) => {
      dispatch(updateOtherUnitSize(size));
      dispatch(fetchAffordabilityData());
    },

    setOtherDemographic: (demographic) => {
      dispatch(updateOtherDemographic(demographic));
      dispatch(fetchAffordabilityData());
    },

    setUserIncome: (income) => {
      dispatch(updateUserIncome(income));
      // no call here, will filter
    },

    setUserUnitSize: (size) => {
      dispatch(updateUserUnitSize(size));
      dispatch(fetchRentData());
    },
  };
};

const mapProps = state => ({
  neighborhoodData: getCombinedNeighborhoodsData(state),
  isLoading: isAnyCallPending(state),
  userIncome: getUserIncome(state),
  userUnitSize: getUserUnitSizeValue(state),
  otherDemographic: getOtherDemographicValue(state),
  otherUnitSize: getOtherUnitSizeValue(state),
});

export default connect(mapProps, mapDispatch)(App);
