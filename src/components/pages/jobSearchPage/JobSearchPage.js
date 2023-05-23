import { useState, useEffect } from "react";

import useJoboredService from "../../../services/JoboredService";

import JobFilter from "../../jobFilter/JobFilter";
import JobList from "../../jobList/JobList";
import JobSearchBar from "../../jobSearchBar/JobSearchBar";
import JobPagination from "../../jobPagination/JobPagination";

import './jobSearchPage.scss';

const JobSearchPage = () => {

    const locSearchVal = localStorage.cache ? JSON.parse(localStorage.cache).locSearchVal : '',
          locSelectVal = localStorage.cache ? JSON.parse(localStorage.cache).locSelectVal : '',
          locForVal = localStorage.cache ? JSON.parse(localStorage.cache).locForVal : '',
          locToVal = localStorage.cache ? JSON.parse(localStorage.cache).locToVal : '',
          locCatalogueKey = localStorage.cache ? JSON.parse(localStorage.cache).locCatalogueKey : 0,
          locFilterLoaded = localStorage.cache ? JSON.parse(localStorage.cache).locFilterLoaded : false,
          locPage = localStorage.cache ? JSON.parse(localStorage.cache).locPage + 1 : 1;

    const [jobsList, setJobsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    
    const [searchInputVal, setSearchInputVal] = useState(locSearchVal);
    const [selectVal, setSelectVal] = useState(locSelectVal);
    const [firstInputVal, setFirstInputVal] = useState(locForVal);
    const [secondInputVal, setSecondInputVal] = useState(locToVal);
    const [cataloguesList, setCataloguesList] = useState([]);
    const [catalogueKey, setCatalogueKey] = useState(locCatalogueKey);
    
    const [filterLoaded, setFilterLoaded] = useState(locFilterLoaded);
    
    const [selectedPage, setSelectedPage] = useState(locPage);
    const [pagesCount, setPagesCount] = useState(125)

    const {loading, getAllVacancies} = useJoboredService();
    
    useEffect(() => { 
        localStorage.cache = JSON.stringify(
            {
                locPage: selectedPage - 1,
                locSelectVal: selectVal,
                locCatalogueKey: catalogueKey,
                locForVal: firstInputVal,
                locToVal: secondInputVal,
                locSearchVal: searchInputVal,
                locFilterLoaded: filterLoaded,
            }
        );

    }, [selectedPage, selectVal, catalogueKey, firstInputVal, secondInputVal, searchInputVal, filterLoaded]);

    const onPageSelectedFromMain = (page) => {
        setSelectedPage(page);
        window.scrollTo(0, 0);
    }
    
    const onChangeCountPages = (total) => {
        if (total > 500) {
            setPagesCount(pagesCount => 125);
        } else {
            setPagesCount(pagesCount => Math.ceil(total / 4));
        }
    }
    
    const onRequest = (initial, page, from, to, key, keyword, agreement) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllVacancies(page, from, to, key, keyword, agreement)
            .then(onJobsListLoaded);
    }
    
    const onJobsListLoaded = (response) => {

        setJobsList(jobsList => [...response[0]]);
        onChangeCountPages(response[1]);
        setNewItemLoading(newItemLoading => false);
    }

    const onUseFilter = () => {
        setSelectedPage(page => 1);
        
        onRequest(true, selectedPage - 1, +firstInputVal, +secondInputVal, catalogueKey, searchInputVal, (+firstInputVal || +secondInputVal) ? true : false);

        if (searchInputVal || selectVal || firstInputVal || secondInputVal) {
            setFilterLoaded(filterLoaded => true);

        } else {
            setFilterLoaded(filterLoaded => false);
        }
        

        window.scrollTo(0, 0);
    }
    
    const OnClearAll = (clSelect, clCatalogueKey, clFirstInput, clSecondInput, clSelectedPage, clSearch, clFilterLoaded) => {
        clSelect(select => '');
        clCatalogueKey(key => 0);
        clFirstInput(firstInput => '');
        clSecondInput(secondInput => '');
        clSelectedPage(page => 1);
        clSearch(searchInputVal => '');
        clFilterLoaded(filterLoaded => false);
        
        onRequest(true, selectedPage - 1);
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
                setSelectedPage={setSelectedPage}
                setSearchInputVal={setSearchInputVal}
                OnClearAll={OnClearAll}
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