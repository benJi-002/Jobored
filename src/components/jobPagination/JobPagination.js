import { Pagination } from '@mantine/core';

import './jobPagination.scss';


const JobPagination = (props) => {
    return (
            <Pagination 
                onChange={(value) => {
                    props.onPageSelected(value)
                }}
                value={props.page}
                // defaultValue={1}
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
                    }
                }}
            />
    )
}

export default JobPagination;
