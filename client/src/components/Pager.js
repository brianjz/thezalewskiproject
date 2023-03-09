import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from '../lib/usePagination';
import styled from 'styled-components';

const StyledPager = styled.ul`
  display: flex;
  list-style-type: none;
  padding: 5px 10px;
  width: 100%;
  justify-content: center;
`;

const StyledPagerItem = styled.li`
    padding: 20px 10px;
    height: 32px;
    text-align: center;
    margin: auto 4px;
    color: rgba(0, 0, 0, 0.87);
    display: flex;
    box-sizing: border-box;
    align-items: center;
    line-height: 1.43;
    font-size: 1.5rem;
    min-width: 32px;
    border: 1px solid #666;

    @media (max-width: 768px) {
        padding: 20px 7px;
        min-width: initial;
    }

    &.dots:hover {
      background-color: transparent;
      cursor: default;
    }
    &:hover {
      background-color: var(--lightest-slate);
      cursor: pointer;
    }

    &.selected {
      background-color: var(--lightest-slate);
    }

    .arrow {
      &::before {
        position: relative;
        content: '';
        /* By using an em scale, the arrows will size with the font */
        display: inline-block;
        width: 0.4em;
        height: 0.4em;
        border-right: 0.12em solid rgba(0, 0, 0, 0.87);
        border-top: 0.12em solid rgba(0, 0, 0, 0.87);
      }

      &.left {
        transform: rotate(-135deg) translate(-50%);
        margin-right: 7px;
        margin-top: 3px;
      }

      &.right {
        transform: rotate(45deg);
        margin-left: 7px;
        margin-bottom: 3px;
      }
    }

    &.disabled {
      pointer-events: none;

      .arrow::before {
        border-right: 0.12em solid rgba(0, 0, 0, 0.43);
        border-top: 0.12em solid rgba(0, 0, 0, 0.43);
      }

      &:hover {
        background-color: transparent;
        cursor: default;
      }
    }
`;

const Pager = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
    isMobile
  } = props;

  const newSiblingCount = isMobile ? 0 : siblingCount
  console.log(isMobile, siblingCount, newSiblingCount)

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    newSiblingCount,
    pageSize,
  });
//   console.log('PGR: ', paginationRange)

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <StyledPager
      className={classnames('pagination-container', { [className]: className })}
    >
      <StyledPagerItem
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </StyledPagerItem>
      {paginationRange.map((pageNumber, i) => {
        if (pageNumber === DOTS) {
          return <StyledPagerItem key={`dots${i}`} className="pagination-item dots">&#8230;</StyledPagerItem>;
        }

        return (
          <StyledPagerItem
            key={pageNumber}
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </StyledPagerItem>
        );
      })}
      <StyledPagerItem
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </StyledPagerItem>
    </StyledPager>
  );
};

export default Pager;