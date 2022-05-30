import React from 'react';
import s from "../../style/MyWorkplace.module.css";

const Pagination = ({currentPage, changePage, pagesArray, limitArray, currentLimit, changeLimit, total, length}) => {
    return (
        <div>
            {currentPage !== 1 && <span onClick={() => changePage(currentPage - 1)} className={s.page}>Prev</span>}
            {
                pagesArray.map((p: number, key: React.Key) => <span
                    className={currentPage === p ? s.page_current : s.page}
                    key={key}
                    onClick={() => changePage(p)}
                >{p}</span>)
            }

            {currentPage !== pagesArray.length &&
            <span onClick={() => changePage(currentPage + 1)} className={s.page}>Next</span>}

            <span style={{marginLeft: 30, padding: 5}}>Limit</span>
            {limitArray.map((l, key: React.Key) => <span
                className={currentLimit === l ? s.page_limit : s.limit}
                key={key}
                onClick={() => changeLimit(l)}
            >{l}</span>)
            }
            <span style={{marginLeft: 30, padding: 5}}>
                {`Showing ${length} of ${total}`}
            </span>
        </div>
    );
};

export default Pagination;