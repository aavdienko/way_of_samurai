import React, { useState } from 'react';
import styles from './Paginator.module.css';
import cn from 'classnames';

let Paginator = (props) => {
  let {
    totalItemsCount,
    pageSize,
    currentPage,
    onPageChanged,
    portionSize = 10,
  } = props;

  let pagesCount = Math.ceil(totalItemsCount / pageSize);

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);

  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  // (1 - 1) = 0 * 10 = 0 + 1 = 1
  // (2 - 1) = 1 * 10 = 10 + 1 = 11

  let rightPortionPageNumber = portionNumber * portionSize;
  // 1 * 10 = 10
  // 2 * 10 = 20


  return (
    <div className={styles.paginator}>
      {portionNumber > 1 && (
        <button onClick={() => setPortionNumber(portionNumber - 1)}>
          PREV
        </button>
      )}
        {pages
          .filter((pageF) => {
            return (
              pageF >= leftPortionPageNumber && pageF <= rightPortionPageNumber
            );
          })
          .map((page) => {
            return (
              <span
                className={cn(styles.pageNumber, {
                  [styles.selectedPage]: currentPage === page,
                })}
                key={page}
                onClick={() => {
                  onPageChanged(page);
                }}
              >
                {page}
              </span>
            );
          })}

        {portionNumber < portionCount && (
          <button onClick={() => setPortionNumber(portionNumber + 1)}>
            NEXT
          </button>
        )}
    </div>
  );
};

export default Paginator;
