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
  updateOtherUnitSize,
  updateOtherDemographic,
  updateUserIncome,
  updateUserUnitSizeValue,
} from '../../state/parameters/actions';
import {
  getUserIncome,
  getUserUnitSizeValue,
  getOtherDemographic,
  getOtherUnitSize,
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
  otherDemographic,
  otherUnitSize,
  setOtherUnitSize,
  setOtherDemographic,
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
        value={otherUnitSize}
        onChange={event => setOtherUnitSize(event.value)}
        options={UNIT_SIZES_AFFORDABILITY}
      />
      # Others Demographic
      <Dropdown
        value={otherDemographic}
        onChange={event => setOtherDemographic(event.value)}
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
  otherDemographic: DEMOGRAPHICS[0].value,
  otherUnitSize: UNIT_SIZES_AFFORDABILITY[0].value,
  setOtherDemographic: () => {},
  setOtherUnitSize: () => {},
  isLoading: false,
};

App.propTypes = {
  children: React.PropTypes.node,
  neighborhoodData: React.PropTypes.object,
  setOtherDemographic: React.PropTypes.func,
  setOtherUnitSize: React.PropTypes.func,
  isLoading: React.PropTypes.bool,
  otherDemographic: React.PropTypes.string,
  otherUnitSize: React.PropTypes.string,
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
  otherDemographic: getOtherDemographic(state),
  otherUnitSize: getOtherUnitSize(state),
});

export default connect(mapProps, mapDispatch)(App);
