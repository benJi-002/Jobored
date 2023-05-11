import { Select, Button } from '@mantine/core';

import './jobFilter.scss';




const JobFilter = () => {

    return (
        <div className="job__filter">
            <div className='job__filter-title_wrapper'>
                <h2 className='job__filter-title'>Фильтры</h2>

                <button className='job__filter-reset'>Сбросить все <span>×</span></button>
            </div>

            <div className="job__filter-industry">
                <Industry/>
            </div>

            <div className="job__filter-salary">
                <Salary/>
            </div>

            <div className='job__filter-apply'>
                <Button
                    styles={{
                        root: {
                            backgroundColor: '#5E96FC',
                            borderRadius: '8px',
                            width: '275px',
                            height: '40px',
                            fontFamily: 'inherit',
                            fontWeight: '500',
                            fontSize: '14px',
                            transition: 'all .3s ease'
                        }
                    }}
                >
                    Применить
                </Button>
            </div>
        </div>
    )
}

const Industry = () => {
    return (
        <>
            <Select
                data={['React', 'Angular', 'Svelte', 'Vue', 'Angular', 'Svelte', 'Vue', 'Angular']}
                placeholder="Выберете отрасль"
                label="Отрасль"
                searchable
                nothingFound="Отрасль отсутствует"
                dropdownPosition="bottom"
                transitionProps={
                    { transition: 'pop-top-left', duration: 100, timingFunction: 'ease' }
                }
                rightSection={
                    <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 0.999999L7.21905 6.33061C7.66844 6.7158 8.33156 6.7158 8.78095 6.33061L15 1" stroke="#ACADB9" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                }
                rightSectionWidth={14}

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
                    },
                    dropdown: {
                        borderRadius: '8px'
                    },
                    item: {
                        fontFamily: 'inherit',
                        fontWeight: '400',
                        fontSize: '14px',
                        width: '255px',
                        lineHeight: '1.55',
                    },
                    rightSection: {
                        marginRight: '18px'
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

const Salary = () => {
    return (
        <>
            <Select
                data={['0', '10000', '20000', '30000', '40000', '50000', '70000', '100000', '150000', '200000', '300000']}
                placeholder="От"
                label="Оклад"
                searchable
                dropdownPosition="bottom"
                transitionProps={
                    { transition: 'pop-top-left', duration: 100, timingFunction: 'ease' }
                }
                rightSection={
                    <div className='job__filter-salary_arrows'>

                        <svg  width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.50006 4.5L5.39054 1.83469C5.16584 1.6421 4.83428 1.6421 4.60959 1.83469L1.50006 4.5" stroke="#ACADB9" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>

                        <svg  width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.49994 1.5L4.60946 4.16531C4.83416 4.3579 5.16572 4.3579 5.39041 4.16531L8.49994 1.5" stroke="#ACADB9" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>

                    </div>  
                }
                rightSectionWidth={12}

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
                    },
                    dropdown: {
                        borderRadius: '8px'
                    },
                    item: {
                        fontFamily: 'inherit',
                        fontWeight: '400',
                        fontSize: '14px',
                        width: '255px',
                        lineHeight: '1.55',
                    },
                    rightSection: {
                        marginRight: '11px'
                    },
                    label: {
                        marginTop: '20px',
                        fontFamily: 'inherit',
                        fontWeight: '700',
                        fontSize: '16px',
                        lineHeight: '19px',
                        color: '#232134',
                    },
                }}
            />
            <Select
                data={['10000', '20000', '30000', '40000', '50000', '70000', '100000', '150000', '200000', '300000', '500000']}
                placeholder="До"
                searchable
                dropdownPosition="bottom"
                transitionProps={
                    { transition: 'pop-top-left', duration: 100, timingFunction: 'ease' }
                }
                rightSection={
                    <div className='job__filter-salary_arrows'>

                        <svg  width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.50006 4.5L5.39054 1.83469C5.16584 1.6421 4.83428 1.6421 4.60959 1.83469L1.50006 4.5" stroke="#ACADB9" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>

                        <svg  width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.49994 1.5L4.60946 4.16531C4.83416 4.3579 5.16572 4.3579 5.39041 4.16531L8.49994 1.5" stroke="#ACADB9" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>

                    </div>  
                }
                rightSectionWidth={12}

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
                    },
                    dropdown: {
                        borderRadius: '8px'
                    },
                    item: {
                        fontFamily: 'inherit',
                        fontWeight: '400',
                        fontSize: '14px',
                        width: '255px',
                        lineHeight: '1.55',
                    },
                    rightSection: {
                        marginRight: '11px'
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