import { useState } from "react";

import JobFilter from "../../jobFilter/JobFilter";
import JobList from "../../jobList/JobList";
import JobSearchBar from "../../jobSearchBar/JobSearchBar";
import JobPagination from "../../jobPagination/JobPagination";

import './jobSearchPage.scss';

const JobSearchPage = () => {

    const [selectedPage, setSelectedPage] = useState(0);
    const [pageCount, setPageCount] = useState(125);

    const onPageSelectedFromMain = (page) => {
        setSelectedPage(page - 1)
        // console.log(selectedPage)
    }

    const onSetCountPagesFromMain = (count) => {
        setPageCount(count)
    }

    return (
        <div className="job__content">
            <JobFilter/>
            <div className="job__content-wrapper">
                <JobSearchBar/>
                <JobList page={selectedPage} onSetCountPages={onSetCountPagesFromMain}/>
                <div className="pag__wrapper">
                    <JobPagination onPageSelected={onPageSelectedFromMain} count={pageCount}/>
                </div>
            </div>
        </div>
    )
}

export default JobSearchPage;