import { Pagination } from '@mantine/core';

import './jobPagination.scss';


const JobPagination = (props) => {
    return (
            <Pagination 
                onChange={(value) => {
                    props.onPageSelected(value)
                }}
                value={props.page}
                total={props.count}
                position='center'
                styles={{
                    control: {
                        color: '#232134',
                        border: '1px solid #D5D6DC',
                        borderRadius: '4px',
                        height: '32px',
                        fontFamily: 'inherit',
                        fontWeight: '400',
                        fontSize: '16px',
                        transition: 'all .2s ease',
                        '&[data-active]' : {
                            backgroundColor: '#5E96FC'
                        },
                        '&:hover': {
                            transition: 'all .2s ease',
                        },
                    }
                }}
            />
    )
}

export default JobPagination;
