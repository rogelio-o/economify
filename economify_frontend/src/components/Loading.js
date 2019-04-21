import React from 'react';
import { css } from '@emotion/core';
import FadeLoader from 'react-spinners/FadeLoader';
import { getColor } from 'utils/colors';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Loading = ({ errors }) => {
  return <FadeLoader css={override} color={getColor('primary')} />;
};

export default Loading;
