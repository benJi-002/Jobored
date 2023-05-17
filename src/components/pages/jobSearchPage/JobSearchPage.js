import { useState } from "react";

import useJoboredService from "../../../services/JoboredService";

import JobFilter from "../../jobFilter/JobFilter";
import JobList from "../../jobList/JobList";
import JobSearchBar from "../../jobSearchBar/JobSearchBar";
import JobPagination from "../../jobPagination/JobPagination";

import './jobSearchPage.scss';

const JobSearchPage = () => {
    const [jobsList, setJobsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [pagesCount, setPagesCount] = useState(125)

    const [searchInputVal, setSearchInputVal] = useState('');
    const [selectVal, setSelectVal] = useState('');
    const [firstInputVal, setFirstInputVal] = useState('');
    const [secondInputVal, setSecondInputVal] = useState('');
    const [cataloguesList, setCataloguesList] = useState([]);
    const [catalogueKey, setCatalogueKey] = useState(0);

    const [filterLoaded, setFilterLoaded] = useState(false);

    const [selectedPage, setSelectedPage] = useState(1);

    const {loading, getAllVacancies} = useJoboredService();

    const onPageSelectedFromMain = (page) => {
        setSelectedPage(page)
    }
    
    const onChangeCountPages = (total) => {
        if (total > 500) {
            setPagesCount(pagesCount => 125);
        } else {
            setPagesCount(pagesCount => Math.ceil(total / 4))
        }
    }
    
    const onRequest = (initial, page, from, to, key, keyword) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllVacancies(page, from, to, key, keyword)
            .then(onJobsListLoaded);
    }
    
    const onJobsListLoaded = (response) => {

        setJobsList(jobsList => [...response[0]]);
        onChangeCountPages(response[1]);
        console.log(response[1])
        setNewItemLoading(newItemLoading => false);
    }

    const onUseFilter = () => {
        setSelectedPage(page => 1);
        onRequest(true, selectedPage - 1, +firstInputVal, +secondInputVal, catalogueKey, searchInputVal);
        setFilterLoaded(filterLoaded => true)
        window.scrollTo(0, 0);
    }


    return (
        <div className="job__content">
            <JobFilter
                selectVal={selectVal}
                setSelectVal={setSelectVal}
                firstInputVal={firstInputVal}
                setFirstInputVal={setFirstInputVal}
                secondInputVal={secondInputVal}
                setSecondInputVal={setSecondInputVal}
                cataloguesList={cataloguesList}
                setCataloguesList={setCataloguesList}
                setCatalogueKey={setCatalogueKey}
                onUseFilter={onUseFilter}
                setFilterLoaded={setFilterLoaded}
                onRequest={onRequest}
                selectedPage={selectedPage}
                setSearchInputVal={setSearchInputVal}
                />
            <div className="job__content-wrapper">
                <JobSearchBar
                    searchInputVal={searchInputVal}
                    setSearchInputVal={setSearchInputVal}
                    onUseFilter={onUseFilter}
                />
                <JobList 
                    jobsList={jobsList}
                    newItemLoading={newItemLoading}
                    onRequest={onRequest}
                    loading={loading}

                    searchInputVal={searchInputVal}
                    firstInputVal={firstInputVal}
                    secondInputVal={secondInputVal}
                    catalogueKey={catalogueKey}

                    filterLoaded={filterLoaded}

                    page={selectedPage - 1} 
                />
                <div className="pag__wrapper">
                    <JobPagination 
                        onPageSelected={onPageSelectedFromMain}
                        page={selectedPage} 
                        count={pagesCount}
                    />
                </div>
            </div>
        </div>
    )
}

export default JobSearchPage;