// import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import TopBar from '../topBar/TopBar';
import { JobSearchPage, JobPage, FavoritesPage, EmptyStatePage } from '../pages'

const App = () => {

    localStorage.setItem('favoritesIds', [])
    

    return (
        <Router>
            <TopBar/>
            <div className='app'>
                <main>
                    <Routes>
                        <Route path='/' element={<JobSearchPage/>}/>

                        <Route path='/description/:jobId' element={<JobPage/>}/>

                        <Route path='/favorites' element={<FavoritesPage/>}/>

                        <Route path='/favorites/empty' element={<EmptyStatePage/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;
