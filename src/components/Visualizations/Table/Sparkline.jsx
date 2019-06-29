import React from 'react';
import PropTypes from 'prop-types';

import {
  YAxis,
  BarChart,
  Bar,
  Cell,
  ReferenceLine,
} from 'recharts';
import { StyledContainer, SparklineContainer } from './Styled';
import constants from '../../constants';

const Sparkline = ({
  values, altValues,
}) => {
  let lastValue = 0;
  const data = (values || altValues).map((v) => {
    const delta = v - lastValue;
    lastValue = v;
    return { v: delta };
  }).slice(0, 11);


  return (
    <StyledContainer>
      <SparklineContainer>
        <BarChart data={data} width={240} height={40} barCategoryGap={1}>
          <YAxis hide domain={[0, 12]} />
          <ReferenceLine y={6} stroke={constants.colorRed} strokeDasharray="3 3" />
          <Bar dataKey="v" barGap={0}>
            {
              data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.v >= 6 ? constants.colorGreen : constants.colorRed} />
              ))
            }
          </Bar>
        </BarChart>
      </SparklineContainer>
    </StyledContainer>
  );
};

const {
  instanceOf,
} = PropTypes;


Sparkline.propTypes = {
  values: instanceOf(Array),
  altValues: instanceOf(Array),
};

Sparkline.tdStyle = {
  paddingTop: 12,
  paddingBottom: 12,
};

export default Sparkline;
