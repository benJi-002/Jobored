import { useEffect } from 'react';
import { useHttp } from "../hooks/http.hook";

const useJoboredService = () => {
    const {loading, request, error, clearError} = useHttp();
    
    if (!localStorage.autorization) {
        localStorage.autorization = JSON.stringify(
            {
                accessToken: 'v3.r.137440105.ebb074038d4a612e22fcb58e4d00434dfccc78b2.170dd2ac1160c09e0a8e7e22ec35d4603480ff27',
                ttl: 1685350364
            }
        );
    }
    
    useEffect(() => {

        if (!localStorage.favoritesIds) {
            localStorage.setItem('favoritesIds', []);
        }

        if (JSON.parse(localStorage.autorization).ttl < (Date.now() / 1000)) {
            getAuthorization()
                .then(onSetAuthorization);
        }
    }, []);
    
    const onSetAuthorization = (token) => {
        localStorage.autorization = JSON.stringify(
            {
                accessToken: token[0],
                ttl: token[1]
            }
        );
    }

    const _apiBase = 'https://startup-summer-2023-proxy.onrender.com/2.0',
    _login = 'login=sergei.stralenia@gmail.com',
    _password = 'password=paralect123',
    _clienId = 'client_id=2356',
    _xApiAppId = 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
    _clientSecret = `client_secret=${_xApiAppId}`,
    _hr = 'hr=0',
    _xSecretKey = 'GEU4nvd3rej*jeh.eqp',
    _authorization = `Bearer ${JSON.parse(localStorage.autorization).accessToken}`;
    

        
    const getAuthorization = async () => {
        const res = await request(`${_apiBase}/oauth2/password/?${_login}&${_password}&${_clienId}&${_clientSecret}&${_hr}`, 
            'GET', null, 
            {
                'Content-Type': 'application/json', 
                'x-secret-key': `${_xSecretKey}`
            });

        console.log(res)

        return [res.access_token, res.ttl]
    }

    const getAllVacancies = async (page, from, to, key, keyword, agreement) => {

        from = from ? `&payment_from=${from}` : '';
        to = to ? `&payment_to=${to}` : '';
        key = key ? `&catalogues=${key}` : '';
        keyword = keyword ? `&keyword=${keyword}` : '';
        agreement = agreement ? `&no_agreement=1` : '';

        const res = await request(`${_apiBase}/vacancies/?page=${page}&count=4&published=1${agreement}${from}${to}${key}${keyword}`, 
        'GET', null, 
            {
                'Content-Type': 'application/json', 
                'x-secret-key': `${_xSecretKey}`, 
                Authorization: `${_authorization}`,
                'X-Api-App-Id': `${_xApiAppId}`
            });


        return [res.objects.map(_transformJobData), res.total]
    }


    const getVacancyById = async (id) => {
        const res = await request(`${_apiBase}/vacancies/${id}`, 
        'GET', null, 
            {
                'Content-Type': 'application/json', 
                'x-secret-key': `${_xSecretKey}`, 
                Authorization: `${_authorization}`,
                'X-Api-App-Id': `${_xApiAppId}`
            });


        return _transformJobData(res)
    }


    const getCatalogues = async () => {
        const res = await request(`${_apiBase}/catalogues/`, 
        'GET', null, 
            {
                'Content-Type': 'application/json', 
                'x-secret-key': `${_xSecretKey}`, 
                Authorization: `${_authorization}`,
                'X-Api-App-Id': `${_xApiAppId}`
            });

        return  res.map(_transformCataloguesData)
    }


    const _transformCataloguesData = (catalogues) => {

        const limForCatalogues = (catalogues, trim) => {

            const maxLength = 30;

            if (catalogues.length > maxLength) {
                return trim;
            } else {
                return catalogues;
            }
        }

        return {
            key: catalogues.key,
            catalogues: limForCatalogues(catalogues.title_rus, catalogues.title_trimmed),
            catalogues_trimmed: catalogues.title_trimmed,
        }
    }

    const _transformJobData = (job) => {

        const salaryDisplay = (from, to, curr) => {
            if (from === 0 && to === 0) {
                return `з/п не указана`
            } else if (from === to || from === 0) {
                return `з/п ${to} ${curr}`
            } else if (from < to) {
                return `з/п ${from} - ${to} ${curr}`
            } else if (to === 0) {
                return `з/п от ${from} ${curr}`
            }
        }

        return {
            id: job.id,
            vacancy: job.profession,
            city: job.town.title,
            employment: job.type_of_work.title,
            firm: job.firm_name,
            from: job.payment_from,
            to: job.payment_to,
            salary: salaryDisplay(job.payment_from, job.payment_to, job.currency),
            description: job.vacancyRichText ? job.vacancyRichText : 'Описание отсутствует'
        }
    }

    return {getAuthorization, getAllVacancies, getVacancyById, getCatalogues, loading, error, clearError}
}

export default useJoboredService;