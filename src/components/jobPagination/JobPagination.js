import { Pagination } from '@mantine/core';

import './jobPagination.scss';


const JobPagination = (props) => {
    return (
            <Pagination 
                onChange={(value) => {
                    props.onPageSelected(value)
                }}
                total={props.count}
                position='center'
                // previousIcon={
                //     <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                //         <path d="M3.63298 4.99999L0.332977 1.69999L1.27598 0.756989L5.51898 4.99999L1.27598 9.24299L0.332977 8.29999L3.63298 4.99999Z" fill="#7B7C88"/>
                //     </svg>
                // }
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
