import './jobSearchBar.scss';

import { Input, Button } from '@mantine/core';


const JobSearchBar = () => {
    return (
        <div className="jobSearch__wrapper">
            <Input
                icon={<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.468 10.468L13.5714 13.5714M12.0924 6.54622C12.0924 9.60931 9.60931 12.0924 6.54622 12.0924C3.48313 12.0924 1 9.60931 1 6.54622C1 3.48313 3.48313 1 6.54622 1C9.60931 1 12.0924 3.48313 12.0924 6.54622Z" stroke="#ACADB9" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>}
                placeholder="Введите название вакансии"

                styles={{
                    input: {
                        paddingLeft: '50px',
                        height: '48px',
                        fontFamily: 'inherit',
                        fontWeight: '400',
                        fontSize: '14px',
                        border: '1px solid #EAEBED',
                        borderRadius: '8px',
                    },
                    icon: {
                        paddingLeft: '5px',
                    }
                }}
            />
            <Button
                styles={{
                    root: {
                        position: 'absolute',
                        top: '8px',
                        right: '12px',
                        backgroundColor: '#5E96FC',
                        borderRadius: '8px',
                        width: '83px',
                        height: '32px',
                        fontFamily: 'inherit',
                        fontWeight: '500',
                        fontSize: '14px',
                        transition: 'all .3s ease'
                    }
                }}
            >
                Поиск
            </Button>
        </div>
    )
}

export default JobSearchBar; 