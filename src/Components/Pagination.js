import React from "react";
import { range } from "lodash";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

const MoviePagination = (props) => {
    const { page, setPage, totalPages } = props;

    const changePageNumber = (pageNumber) => {
        setPage(pageNumber);
    };

    const createPageArrayToShow = () => {
        if (page <= 3) {
            return range(1, page + 4);
        } else if (page >= totalPages - 2) {
            return range(totalPages - 4, totalPages + 1);
        } else {
            return range(page - 2, page + 3);
        }
    };

    const onClickPrevious = () => {
        if (page > 0) setPage(page - 1);
    };

    const onClickNext = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const onClickFirst = () => {
        setPage(1);
    };

    const onClickLast = () => {
        setPage(totalPages);
    };

    return (
        <Pagination className="mt-3">
            <div className="d-flex flex-wrap">
                <PaginationItem onClick={onClickFirst}>
                    <PaginationLink href="#" ><FaAngleDoubleLeft /></PaginationLink>
                </PaginationItem>
                <PaginationItem onClick={onClickPrevious}>
                    <PaginationLink href="#" ><FaChevronLeft /></PaginationLink>
                </PaginationItem>
                {createPageArrayToShow().map((e) => {
                    const currentPageNo = e;

                    return (
                        <PaginationItem
                            active={currentPageNo === page}
                            onClick={() => changePageNumber(currentPageNo)}
                        >
                            <PaginationLink href="#">{currentPageNo}</PaginationLink>
                        </PaginationItem>
                    );
                })}
            </div>
            <PaginationItem onClick={onClickNext}>
                <PaginationLink href="#" > <FaChevronRight /></PaginationLink>
            </PaginationItem>
            <PaginationItem onClick={onClickLast}>
                <PaginationLink href="#" ><FaAngleDoubleRight /></PaginationLink>
            </PaginationItem>
        </Pagination>
    );
};

export default MoviePagination;
