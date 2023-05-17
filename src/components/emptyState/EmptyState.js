import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';

import './emptyState.scss';
import human from '../../resources/empty-human.svg';


const EmptyState = () => {

    return (
        <div className="empty__wrapper">
            <img className='empty__human' src={human} alt="human" />
            <h2 className="empty__text">Упс, здесь еще ничего нет!</h2>
            <div className="empty__button">
                <Link to={'/'}>
                    <Button
                        gradient
                        styles={{
                            root: {
                                backgroundColor: '#DEECFF',
                                borderRadius: '8px',
                                width: '164px',
                                height: '42px',
                                fontFamily: 'inherit',
                                fontWeight: '600',
                                fontSize: '14px',
                                color: '#3B7CD3',
                                transition: 'all .2s ease',
                                '&:hover': {backgroundColor: '#d7e2f2'},
                                '&:active': {backgroundColor: '#c8d3e3'}
                            }
                        }}
                    >
                        Поиск Вакансий
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default EmptyState;