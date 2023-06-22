

import React from 'react';
import styled from 'styled-components';

export const Symbols = ({insertSymbol}: any) => {
  const symbols = [
    '{', '}','[',']','(',')','<','>','/','-','`','"',"=",":",";"
  ]

  return (
    <S.Symbols>
      { 
        symbols.map(symbol => {
          return <div onClick={() => insertSymbol(symbol)} key={symbol} className='symbol'>{symbol}</div>
        }) 
      }
    </S.Symbols>
  ) 
}

const S = {
  Symbols: styled.div`
  width: 100%;
  background: #303030;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;

.symbol {
  width: 6.66%;
  color: white;
  cursor: pointer;
  text-align: center;
  height: auto;
  padding: 8px;
  border-radius: 0px;
  font-size: 24px;
}
  `
}