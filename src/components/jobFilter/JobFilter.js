import { useRef, useEffect } from 'react';
import { NumberInput, Select, Button } from '@mantine/core';

import useJoboredService from '../../services/JoboredService';
import './jobFilter.scss';

const JobFilter = (props) => {
    
    const arrowRef = useRef([]);

    const {getCatalogues} = useJoboredService();

    const {selectVal, setSelectVal, firstInputVal, setFirstInputVal, secondInputVal, setSecondInputVal, cataloguesList, setCataloguesList, setCatalogueKey, onUseFilter, setFilterLoaded, setSelectedPage, setSearchInputVal, OnClearAll} = props;


    useEffect(() => {
        onRequestForFilter(true);
    }, [])

    const onRequestForFilter = () => {
        getCatalogues()
            .then(onCataloguesListLoaded)
    }

    const onCataloguesListLoaded = (cataloguesList) => {
        setCataloguesList([...cataloguesList]);
    }
    
    const OnChangeArrow = (e) => {
        if (arrowRef.current[0].classList.contains('active')) {
            arrowRef.current[0].classList.remove('active');

        } else if (e.target === arrowRef.current[1] ) {
            arrowRef.current[0].classList.add('active');

        } else {
            arrowRef.current[0].classList.remove('active');
        }
    } 

    return (
        <div onClick={(e) => OnChangeArrow(e)} className="job__filter">
            <div className='job__filter-title_wrapper'>
                <h2 className='job__filter-title'>Фильтры</h2>

                <button 
                    className='job__filter-reset'
                    onClick={() => OnClearAll(setSelectVal, setCatalogueKey, setFirstInputVal, setSecondInputVal, setSelectedPage, setSearchInputVal, setFilterLoaded)}
                >
                    Сбросить все <span>×</span>
                </button>
            </div>

            <div className="job__filter-industry">
                <IndustryInput
                    selectVal={selectVal}
                    setSelectVal={setSelectVal}
                    arrowRef={arrowRef}
                    cataloguesList={cataloguesList}
                    setCatalogueKey={setCatalogueKey}
                />
            </div>

            <div className="job__filter-salary">
                <SalaryInput 
                    firstInputVal={firstInputVal}
                    setFirstInputVal={setFirstInputVal}
                    secondInputVal={secondInputVal}
                    setSecondInputVal={setSecondInputVal}
                    OnChangeArrow={OnChangeArrow}
                />
            </div>

            <div className='job__filter-apply'>
                <Button
                    onClick={() => {onUseFilter()}}
                    data-elem='search-button'

                    styles={{
                        root: {
                            backgroundColor: '#5E96FC',
                            borderRadius: '8px',
                            width: '100%',
                            height: '40px',
                            fontFamily: 'inherit',
                            fontWeight: '500',
                            fontSize: '14px',
                            transition: 'all .2s ease',
                            '&:hover': {backgroundColor: '#92C1FF'},
                            '&:active': {backgroundColor: '#3B7CD3'},
                        }
                    }}
                >
                    Применить
                </Button>
            </div>
        </div>
    )
}

const IndustryInput = (props) => {


    const {selectVal, setSelectVal, arrowRef, cataloguesList, setCatalogueKey} = props

    const onChangeSelect = (value) => {
        setSelectVal(selectVal => value)
        onChangeCatalogueKey(value)
    }

    const onChangeCatalogueKey = (value) => {
        cataloguesList.forEach((item) => { 
            if (item.catalogues === value) {
                setCatalogueKey(key => item.key)
            }
        });
    }

    return (
        <>
            <Select
                onChange={(value) => onChangeSelect(value)}
                ref={el => arrowRef.current[1] = el}
                data-elem='industry-select'

                data={cataloguesList.map(item => item.catalogues)}
                value={selectVal}
                placeholder="Выберите отрасль"
                label="Отрасль"
                allowDeselect
                searchable
                nothingFound="Отрасль отсутствует"
                dropdownPosition="bottom"
                transitionProps={
                    { transition: 'pop-top-left', duration: 300, timingFunction: 'ease' }
                }
                rightSection={
                    <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path  ref={el => arrowRef.current[0] = el} d="M1 0.999999L7.21905 6.33061C7.66844 6.7158 8.33156 6.7158 8.78095 6.33061L15 1" stroke="#ACADB9" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                }
                rightSectionWidth={48}

                styles={{
                    root: {
                        fontFamily: 'inherit',
                        lineHeight: '0',

                    },
                    input: {
                        paddingLeft: '10px',
                        marginTop: '8px',
                        height: '42px',
                        fontFamily: 'inherit',
                        fontWeight: '400',
                        fontSize: '14px',
                        border: '1px solid #D5D6DC',
                        borderRadius: '8px',
                        transition: 'all .2s ease',
                    },
                    dropdown: {
                        borderRadius: '8px'
                    },
                    item: {
                        fontFamily: 'inherit',
                        fontWeight: '400',
                        fontSize: '14px',
                        width: '97%',
                        height: '36px',
                        borderRadius: '8px',
                        lineHeight: '1.55',
                        '&:hover': {
                            backgroundColor: '#DEECFF', 
                            transition: 'all .2s ease',
                        },
                        '&[data-selected]': {
                            '&, &:hover': {
                                backgroundColor: '#5E96FC',
                                color: '#FFFFFF'
                                },

                        },
                        '&[data-hovered]': {}
                    },
                    label: {
                        marginTop: '30px',
                        fontFamily: 'inherit',
                        fontWeight: '700',
                        fontSize: '16px',
                        lineHeight: '19px',
                        color: '#232134',
                    },
                }}
            />
        </>
    )
}

const SalaryInput = (props) => {

    const clickUp = (state, setState) => {
        setState(state => +state + 10000)
    }
    
    const clickDown = (state, setState) => {

        if (state > 0) {
            setState(state => +state - 10000)
            
        } else {
            setState(state => 0)
        }
    }

    const {firstInputVal, setFirstInputVal, secondInputVal, setSecondInputVal} = props;

    return (
        <>
            <NumberInput
                onChange={(value) => {setFirstInputVal(value)}}
                data-elem='salary-from-input'
                
                placeholder="От"
                label="Оклад"
                value={firstInputVal}
                min={0}
                step={10000}
                rightSection={
                    <div className='job__filter-salary_arrows'>

                        <svg onClick={() => clickUp(firstInputVal, setFirstInputVal)}  width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.50006 4.5L5.39054 1.83469C5.16584 1.6421 4.83428 1.6421 4.60959 1.83469L1.50006 4.5" stroke="#ACADB9" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>

                        <svg onClick={() => clickDown(firstInputVal, setFirstInputVal)} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.49994 1.5L4.60946 4.16531C4.83416 4.3579 5.16572 4.3579 5.39041 4.16531L8.49994 1.5" stroke="#ACADB9" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>

                    </div>  
                }
                rightSectionWidth={36}
                
                styles={{
                    root: {
                        fontFamily: 'inherit',
                        lineHeight: '0',
                    },
                    input: {
                        paddingLeft: '10px',
                        marginTop: '8px',
                        height: '42px',
                        fontFamily: 'inherit',
                        fontWeight: '400',
                        fontSize: '14px',
                        border: '1px solid #D5D6DC',
                        borderRadius: '8px',
                        transition: 'all .2s ease',
                        '&:hover': {
                            border: '1px solid #5E96FC', 
                            transition: 'all .2s ease',
                        }
                    },
                    item: {
                        fontFamily: 'inherit',
                        fontWeight: '400',
                        fontSize: '14px',
                        width: '255px',
                        lineHeight: '1.55',
                    },
                    label: {
                        marginTop: '20px',
                        fontFamily: 'inherit',
                        fontWeight: '700',
                        fontSize: '16px',
                        lineHeight: '19px',
                        color: '#232134',
                    }
                }}
            />

            <NumberInput
                onChange={(value) => {setSecondInputVal(value)}}
                data-elem='salary-to-input'

                placeholder="До"
                value={secondInputVal}
                min={0}
                step={10000}
                rightSection={
                    <div className='job__filter-salary_arrows'>

                        <svg onClick={() => clickUp(secondInputVal, setSecondInputVal)} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.50006 4.5L5.39054 1.83469C5.16584 1.6421 4.83428 1.6421 4.60959 1.83469L1.50006 4.5" stroke="#ACADB9" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>

                        <svg onClick={() => clickDown(secondInputVal, setSecondInputVal)} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.49994 1.5L4.60946 4.16531C4.83416 4.3579 5.16572 4.3579 5.39041 4.16531L8.49994 1.5" stroke="#ACADB9" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>

                    </div>  
                }
                rightSectionWidth={36}

                styles={{
                    root: {
                        fontFamily: 'inherit',
                        lineHeight: '0',
                    },
                    input: {
                        paddingLeft: '10px',
                        marginTop: '8px',
                        height: '42px',
                        fontFamily: 'inherit',
                        fontWeight: '400',
                        fontSize: '14px',
                        border: '1px solid #D5D6DC',
                        borderRadius: '8px',
                        transition: 'all .2s ease',
                        '&:hover': {
                            border: '1px solid #5E96FC', 
                            transition: 'all .2s ease',
                        }
                    },
                    item: {
                        fontFamily: 'inherit',
                        fontWeight: '400',
                        fontSize: '14px',
                        width: '255px',
                        lineHeight: '1.55',
                    },
                    label: {
                        fontWeight: '700',
                        fontSize: '16px',
                        lineHeight: '19px',
                        color: '#232134',
                    },
                }}
            />
        </>
    )
}

export default JobFilter;