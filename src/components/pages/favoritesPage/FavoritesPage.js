import { useState } from "react";

import JobFavorites from "../../jobFavorites/JobFavorites";
import JobPagination from "../../jobPagination/JobPagination";

import './favoritesPage.scss'

const FavoritesPage = () => {

    const [pageCount, setPageCount] = useState(1);

    const onSetCountPagesFromFavorite = (count) => {
        setPageCount(count)
    }

    return (
        <>
            <JobFavorites onSetCountPages={onSetCountPagesFromFavorite}/>
            <div className="pag__wrapper favorites">
                <JobPagination count={pageCount}/>
            </div>
        </>
    )
}

export default FavoritesPage;