/* eslint-disable import/no-extraneous-dependencies */
// This should probably be the core component, containing, nav etc

import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Dropdown from '@hackoregon/component-library/lib/Dropdown/Dropdown';
import { fetchAffordabilityData } from '../../state/affordability/actions';
import { fetchRentData } from '../../state/rent/actions';
import { fetchNeighborhoods } from '../../state/neighborhoods/actions';
import { isAnyCallPending, getCombinedNeighborhoodsData } from '../../state/globalSelectors';

import {
  updateOtherUnitSizeValue,
  updateOtherDemographicValue,
  updateUserIncome,
  updateUserUnitSizeValue,
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
} from '../../utils/data-constants';

const Container = styled.div`
  min-height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export function App({
  children,
  isLoading,
  neighborhoodData,
  userIncome,
  userUnitSizeValue,
  setUserIncome,
  setUserUnitSizeValue,
  otherDemographicValue,
  otherUnitSizeValue,
  setOtherUnitSizeValue,
  setOtherDemographicValue,
}) {
  let content;
  if (isLoading) {
    content = <span>Loading...</span>;
  } else if (!neighborhoodData) {
    content = <span>No data loaded!</span>;
  } else {
    content = <span><pre>{JSON.stringify(neighborhoodData, null, 2) }</pre></span>;
  }

  return (
    <Container>
      # Your income
      <input type="number" value={userIncome} onChange={event => setUserIncome(event.target.value)} />
      # Your Housing Type
      <Dropdown
        value={userUnitSizeValue}
        onChange={event => setUserUnitSizeValue(event)}
        options={UNIT_SIZES_RENT}
      />
      # Others Housing Type
      <Dropdown
        value={otherUnitSizeValue}
        onChange={event => setOtherUnitSizeValue(event)}
        options={UNIT_SIZES_AFFORDABILITY}
      />
      # Others Demographic
      <Dropdown
        value={otherDemographicValue}
        onChange={event => setOtherDemographicValue(event)}
        options={DEMOGRAPHICS}
      />
      {content}
      {React.Children.toArray(children)}
    </Container>
  );
}

App.displayName = 'App';
App.defaultProps = {
  children: <div />,
  neighborhoodData: {},
  userIncome: DEFAULT_INCOME,
  userUnitSizeValue: UNIT_SIZES_RENT[0].value,
  setUserIncome: () => {},
  setUserUnitSizeValue: () => {},
  otherDemographicValue: DEMOGRAPHICS[0].value,
  otherUnitSizeValue: UNIT_SIZES_AFFORDABILITY[0].value,
  setOtherDemographicValue: () => {},
  setOtherUnitSizeValue: () => {},
  isLoading: false,
};

App.propTypes = {
  children: React.PropTypes.node,
  neighborhoodData: React.PropTypes.object,
  setOtherDemographicValue: React.PropTypes.func,
  setOtherUnitSizeValue: React.PropTypes.func,
  isLoading: React.PropTypes.bool,
  otherDemographicValue: React.PropTypes.string,
  otherUnitSizeValue: React.PropTypes.string,
  userIncome: React.PropTypes.number,
  userUnitSizeValue: React.PropTypes.string,
  setUserIncome: React.PropTypes.func,
  setUserUnitSizeValue: React.PropTypes.func,
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
    setOtherUnitSizeValue: (size) => {
      dispatch(updateOtherUnitSizeValue(size));
      dispatch(fetchAffordabilityData());
    },

    setOtherDemographicValue: (demographic) => {
      dispatch(updateOtherDemographicValue(demographic));
      dispatch(fetchAffordabilityData());
    },

    setUserIncome: (income) => {
      dispatch(updateUserIncome(income));
      // no call here, will filter
    },

    setUserUnitSizeValue: (size) => {
      dispatch(updateUserUnitSizeValue(size));
      dispatch(fetchRentData());
    },
  };
};

const mapProps = state => ({
  neighborhoodData: getCombinedNeighborhoodsData(state),
  isLoading: isAnyCallPending(state),
  userIncome: getUserIncome(state),
  userUnitSizeValue: getUserUnitSizeValue(state),
  otherDemographicValue: getOtherDemographicValue(state),
  otherUnitSizeValue: getOtherUnitSizeValue(state),
});

export default connect(mapProps, mapDispatch)(App);
