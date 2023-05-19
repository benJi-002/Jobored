import { useEffect } from 'react';
import { useHttp } from "../hooks/http.hook";

const useJoboredService = () => {
    const {loading, request, error, clearError} = useHttp();
    
    const _apiBase = 'https://startup-summer-2023-proxy.onrender.com/2.0',
    _login = 'login=sergei.stralenia@gmail.com',
    _password = 'password=paralect123',
    _clienId = 'client_id=2356',
    _xApiAppId = 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
    _clientSecret = `client_secret=${_xApiAppId}`,
    _hr = 'hr=0',
    _xSecretKey = 'GEU4nvd3rej*jeh.eqp',
    _authorization = `Bearer ${JSON.parse(localStorage.autorization).accessToken}`;
    
    useEffect(() => {
        if (!localStorage.autorization) {
            localStorage.autorization = JSON.stringify(
                {
                    accessToken: 'v3.r.137440105.4da55a6ad2cf2ea5a14156a7018537b0e2a9b149.aa9aaf398179c9d4b37eabf8e0452539d49e6agg',
                    ttl: 604800
                }
            );
        }

        if (!localStorage.favoritesIds) {
            localStorage.setItem('favoritesIds', []);
        }

        if (JSON.parse(localStorage.autorization).ttl < (Date.now() / 1000)) {
            getAuthorization()
                .then(onSetAuthorization);
        }
    }, [])

    const onSetAuthorization = (token) => {
        localStorage.autorization = JSON.stringify(
            {
                accessToken: token[0],
                ttl: token[1]
            }
        );
    }
        
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

    const getAllVacancies = async (page, from, to, key, keyword) => {

        from = from ? `&payment_from=${from}` : '';
        to = to ? `&payment_to=${to}` : '';
        key = key ? `&catalogues=${key}` : '';
        keyword = keyword ? `&keyword=${keyword}` : '';
        // console.log({page, from, to, key, keyword})

        const res = await request(`${_apiBase}/vacancies/?page=${page}&count=4&no_agreement=1&published=1${from}${to}${key}${keyword}`, 
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
            if (from === to || from === 0) {
                return `з/п ${to} ${curr}`
            } else if (from < to) {
                return `з/п ${from} - ${to} ${curr}`
            } else if (to === 0) {
                return `з/п от ${from} ${curr}`
            }
        }

        const limitWords = (name) => {
            const maxLength = 57;
    
            if (name.length > maxLength) {
                const limitName = name.slice(0, maxLength) + '...';
                return limitName;
            } else {
                return name;
            }
        }

        return {
            id: job.id,
            vacancy: limitWords(job.profession.replace(/ \(.+\)/, '')),
            city: job.town.title,
            employment: job.type_of_work.title,
            firm: job.firm_name,
            from: job.payment_from,
            to: job.payment_to,
            salary: salaryDisplay(job.payment_from, job.payment_to, job.currency),
            description: job.vacancyRichText
        }
    }

    return {getAuthorization, getAllVacancies, getVacancyById, getCatalogues, /* getJobDescription, */ loading, error, clearError}
}

export default useJoboredService;