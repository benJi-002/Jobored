import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { TypographyStylesProvider } from '@mantine/core';


import { SkeletonForDescriptionUp, SkeletonForDescriptionDown } from '../skeleton/SkeletonFrame';
import useJoboredService from '../../services/JoboredService';

import location from '../../resources/location.svg'
import './jobDescription.scss'


const JobDescription = () => {

    const {jobId} = useParams();
    const [jobDescr, setJobDescr] = useState([]);

    

    const {getVacancyById, loading} = useJoboredService();


    useEffect(() => {
        updateDescr(jobId)
    }, [jobId])

    const updateDescr = (id) => {
        getVacancyById(id)
            .then(onDescrLoaded);
    }

    const onDescrLoaded = (response) => {

        setJobDescr(jobDescr => response);
    }

    const skeletonUp = loading ? <SkeletonForDescriptionUp/> : null;
    const skeletonDown = loading ? <SkeletonForDescriptionDown/> : null;
    const viewUp = !(loading ||  !jobDescr) ? <LittleCard jobDescr={jobDescr}/> : null;
    const viewDown = !(loading ||  !jobDescr) ? <BigCard jobDescr={jobDescr}/> : null;

    return (
        <div className="job__list descr">
            <div className="job__grid descr">

                <div className="job__item descr">
                    {skeletonUp}
                    {viewUp}
                </div>

                <div className="job__item descr">
                    {skeletonDown}
                    {viewDown}
                </div>

            </div>
        </div>
    )
}


const LittleCard = ({jobDescr}) => {
    const {id, vacancy, city, employment, salary} = jobDescr;

    const itemRef = useRef([]);

    let favItem = [];

    const onLocalStorageParse = (lStorage, list) => {
        list = lStorage
            .replace(/[,]+/g, " ")
            .split(' ')
        list = list.map(item => Number(item))
        return list
    }

    const favoriteOnItem = (id) => {

        if (localStorage.getItem('favoritesIds').length && !favItem.length) {
            favItem = onLocalStorageParse((localStorage.getItem('favoritesIds')), favItem);
        }

        if ( itemRef.current[id].classList.contains('active')) {
            itemRef.current[id].classList.remove('active');
            
            favItem = favItem.filter((remote) => remote !== id );
            localStorage.setItem('favoritesIds', favItem);
        } else {
            itemRef.current[id].classList.add('active');

            favItem.push(id);
            localStorage.setItem('favoritesIds', favItem);
        }
    }

    return (
        <>
            <h3 className="job__title descr">{vacancy}</h3>
            <div className="job__descr descr">
                <span className="job__descr-salary descr">{salary}</span>
                <div className="job__descr-dot_wrapper descr">
                    <div className="job__descr-dot descr"></div>
                </div>
                <span className="job__descr-schedule descr">{employment}</span>
            </div>

            <div className="job__location descr">
                <img className="job__location-icon descr" src={location} alt="location" />
                <span className="job__location-name descr">{city}</span>
            </div>

            <button
                className={(localStorage.getItem('favoritesIds')).includes(id) ? 'job__item-star active' : 'job__item-star'}
                tabIndex={0}
                ref={el => itemRef.current[id] = el}
                onClick={() => {
                    favoriteOnItem(id)
                }}
                data-elem={`vacancy-${id}-shortlist-button`} 
            >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.9718 2.70846C11.4382 1.93348 12.5618 1.93348 13.0282 2.70847L15.3586 6.58087C15.5262 6.85928 15.7995 7.05784 16.116 7.13116L20.5191 8.15091C21.4002 8.35499 21.7474 9.42356 21.1545 10.1066L18.1918 13.5196C17.9788 13.765 17.8744 14.0863 17.9025 14.41L18.2932 18.9127C18.3714 19.8138 17.4625 20.4742 16.6296 20.1214L12.4681 18.3583C12.1689 18.2316 11.8311 18.2316 11.5319 18.3583L7.37038 20.1214C6.53754 20.4742 5.62856 19.8138 5.70677 18.9127L6.09754 14.41C6.12563 14.0863 6.02124 13.765 5.80823 13.5196L2.8455 10.1066C2.25257 9.42356 2.59977 8.35499 3.48095 8.15091L7.88397 7.13116C8.20053 7.05784 8.47383 6.85928 8.64138 6.58087L10.9718 2.70846Z" stroke="#ACADB9" strokeWidth="1.5"/>
                </svg>
            </button>
        </>
    )
}

const BigCard = ({jobDescr}) => {
    const {description} = jobDescr;

    return (
        <TypographyStylesProvider>
            <div dangerouslySetInnerHTML={{ __html: `${description}` }} />
        </TypographyStylesProvider>
    )
}

export default JobDescription;