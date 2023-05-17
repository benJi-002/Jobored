import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import empty from '../../resources/balloon_empty_state.svg';
import location from '../../resources/location.svg';
import {SkeletonForCards} from '../skeleton/SkeletonFrame';
import './jobList.scss';

const JobList = (props) => {
    
    const {jobsList, newItemLoading, onRequest, loading, page, firstInputVal, secondInputVal, catalogueKey, filterLoaded, searchInputVal} = props;
    
    const itemRefs = useRef([]);

    let favItems = [];
    

    useEffect(() => {
        if (filterLoaded) {
            console.log('if')
            onRequest(true, page, +firstInputVal, +secondInputVal, catalogueKey, searchInputVal);
        } else {    
            console.log('else')
            onRequest(true, page);
        }
    }, [page])
    

    useEffect(() => {
        if (localStorage.getItem('favoritesIds').length && !favItems.length) {
            favItems = onLocalStorageParse((localStorage.getItem('favoritesIds')), favItems);
        }

    }, [])    


    const onLocalStorageParse = (lStorage, list) => {
        list = lStorage
            .replace(/[,]+/g, " ")
            .split(' ')
        list = list.map(item => Number(item))
        console.log(list)
        return list
    }

    const favoriteOnItem = (id) => {

        if (localStorage.getItem('favoritesIds').length && !favItems.length) {
            favItems = onLocalStorageParse((localStorage.getItem('favoritesIds')), favItems);
        }

        if ( itemRefs.current[id].classList.contains('active')) {
            itemRefs.current[id].classList.remove('active');
            
            favItems = favItems.filter((remote) => remote !== id );
            localStorage.setItem('favoritesIds', favItems);
        } else {
            itemRefs.current[id].classList.add('active');

            favItems.push(id);
            localStorage.setItem('favoritesIds', favItems);
        }
    }

    const renderItems = (arr) => {

        const items = arr.map((item) => {


            return (

                <li 
                    className="job__item"
                    key={item.id}
                    
                >
                    <Link to={`/description/${item.id}`}>
                        <span className="job__title">{item.vacancy}</span> 
                    </Link>
                    
                    <div className="job__descr">
                        <span className="job__descr-salary">{item.salary}</span>
                        <div className="job__descr-dot_wrapper">
                            <div className="job__descr-dot"></div>
                        </div>
                        <span className="job__descr-schedule">{item.employment}</span>
                    </div>

                    <div className="job__location">
                        <img className="job__location-icon" src={location} alt="location" />
                        <span className="job__location-name">{item.city}</span>
                    </div>

                    <button 
                        className={(localStorage.getItem('favoritesIds')).includes(item.id) ? 'job__item-star active' : 'job__item-star'}
                        tabIndex={0}
                        ref={el => itemRefs.current[item.id] = el}
                        onClick={() => {
                            favoriteOnItem(item.id)
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.9718 2.70846C11.4382 1.93348 12.5618 1.93348 13.0282 2.70847L15.3586 6.58087C15.5262 6.85928 15.7995 7.05784 16.116 7.13116L20.5191 8.15091C21.4002 8.35499 21.7474 9.42356 21.1545 10.1066L18.1918 13.5196C17.9788 13.765 17.8744 14.0863 17.9025 14.41L18.2932 18.9127C18.3714 19.8138 17.4625 20.4742 16.6296 20.1214L12.4681 18.3583C12.1689 18.2316 11.8311 18.2316 11.5319 18.3583L7.37038 20.1214C6.53754 20.4742 5.62856 19.8138 5.70677 18.9127L6.09754 14.41C6.12563 14.0863 6.02124 13.765 5.80823 13.5196L2.8455 10.1066C2.25257 9.42356 2.59977 8.35499 3.48095 8.15091L7.88397 7.13116C8.20053 7.05784 8.47383 6.85928 8.64138 6.58087L10.9718 2.70846Z" stroke="#ACADB9" strokeWidth="1.5"/>
                        </svg>
                    </button>
                </li>
            )
        })
        
        if (loading && !newItemLoading) {      
            return (
                <ul className="job__grid" >
                    <SkeletonForCards count={4}/>
                </ul>
            )
/*         } else if (jobsList === []) {
            return (
                <ul className="job__grid" >
                    <div>{empty}</div>
                </ul>
            )    */      
        } else {
            return (
                <ul className="job__grid" >
                    {items}
                </ul>
            )
        }           
    }

    const items = renderItems(jobsList);


    // const spinner = loading && !newItemLoading ? <Spinner/> : null;
    
    if (jobsList.length === 0 && (!loading && !newItemLoading)) {
        console.log('empty')
        return (
            <img className='job__empty' src={empty} alt="empty_ballon" />       
        )   
    } else {
        return (
            <div className="job__list">
                {items}
            </div>
        )

    }
}



export default JobList;