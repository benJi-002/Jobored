import { useState } from "react";

import JobFavorites from "../../jobFavorites/JobFavorites";
import JobPagination from "../../jobPagination/JobPagination";

import './favoritesPage.scss'

const FavoritesPage = () => {

    const [pageCount, setPageCount] = useState(1);
    const [selectedPage, setSelectedPage] = useState(0);

    const onPageSelectedFromFavorite = (page) => {
        setSelectedPage(page - 1)
        window.scrollTo(0, 0);
    }

    const onSetCountPagesFromFavorite = (count) => {
        setPageCount(count);
    }

    return (
        <>
            <JobFavorites page={selectedPage} onSetCountPages={onSetCountPagesFromFavorite}/>
            <div className="pag__wrapper favorites">
                <JobPagination onPageSelected={onPageSelectedFromFavorite} count={pageCount}/>
            </div>
        </>
    )
}

export default FavoritesPage;