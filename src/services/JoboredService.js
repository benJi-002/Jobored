import { useEffect } from 'react';
import { useHttp } from "../hooks/http.hook";

const useJoboredService = () => {
    const {loading, request, error, clearError} = useHttp();
    
    useEffect(() => {

        if (!localStorage.favoritesIds) {
            localStorage.setItem('favoritesIds', []);
        }

    }, []);

    const _apiBase = 'https://api.hh.ru';


    const getAllVacancies = async (page, from, key, keyword, agreement) => {
        
        from = from ? `&salary=${from}` : '';
        key = key ? `&industry=${key}` : '';
        keyword = keyword ? `&text=${keyword}` : '';
        agreement = agreement ? `&only_with_salary=true` : '';

        const res = await request(`${_apiBase}/vacancies/?page=${page - 1}&per_page=4&area=16${agreement}${from}&currency=BYR${key}${keyword}`, 
        'GET', null, 
            {
                'Content-Type': 'application/json'
            });


        return [res.items.map(_transformJobData), res.pages]
    }


    const getVacancyById = async (id) => {
        const res = await request(`${_apiBase}/vacancies/${id}`, 
        'GET', null, 
            {
                'Content-Type': 'application/json',
            });


        return _transformJobData(res)
    }


    const getCatalogues = async () => {
        const res = await request(`${_apiBase}/industries`, 
        'GET', null, 
            {
                'Content-Type': 'application/json'
            });

        return  res.map(_transformCataloguesData)
    }


    const _transformCataloguesData = (catalogues) => {

        const limForCatalogues = (catalogues) => {

            const limitLetterPerField = Math.floor(document.querySelector('.job__filter-industry').offsetWidth / 9.2);

            let arrCatalogues = catalogues.split(' ');
            let lengthLine = 0;
            let index = 0;

            arrCatalogues.forEach(element => {
                lengthLine += element.length;

                if (lengthLine >= limitLetterPerField) {

                    arrCatalogues[index - 1] +='\n';
                    lengthLine = element.length; 
                }

                index++;
            });

            index = 0;
            lengthLine = 0;
    
            return arrCatalogues.join(' ');
        }

        return {
            key: catalogues.id,
            catalogues: limForCatalogues(catalogues.name)
        }
    }

    const _transformJobData = (job) => {

        const salaryDisplay = (from, to, curr) => {
            if (from === null && to === null) {
                return `з/п не указана`
            } else if (from === to || from === null) {
                return `з/п ${to} ${curr}`
            } else if (from < to) {
                return `з/п ${from} - ${to} ${curr}`
            } else if (to === null) {
                return `з/п от ${from} ${curr}`
            }
        }

        return {
            id: job.id,
            vacancy: job.name,
            city: job.area.name,
            employment: job.employment.name,
            firm: job.employer.name,
            // from: job.salary ? job.salary.from : 0,
            // to: job.salary ? job.salary.to : 0,
            salary: salaryDisplay(
                job.salary ? job.salary.from : null, 
                job.salary ? job.salary.to : null, 
                job.salary ? job.salary.currency : ''
            ),
            description: job.description ? job.description : 'Описание отсутствует'
        }
    }

    return {getAllVacancies, getVacancyById, getCatalogues, loading, error, clearError}
}

export default useJoboredService;