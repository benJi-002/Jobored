import { useHttp } from "../hooks/http.hook";

const useJoboredService = () => {
    const {loading, request, error, clearError} = useHttp();
    // debugger
    const _apiBase = 'https://startup-summer-2023-proxy.onrender.com/2.0/',
          _login = 'login=sergei.stralenia@gmail.com',
          _password = 'password=paralect123',
          _clienId = 'client_id=2356',
          _clientSecret = 'client_secret=v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
          _hr = 'hr=0',
          _xSecretKey = 'GEU4nvd3rej*jeh.eqp',
          _xApiAppId = 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
          _authorization = `Bearer ${localStorage.getItem('_accessToken')}`;



    const getAuthorization = async () => {
        const res = await request(`${_apiBase}oauth2/password/?${_login}&${_password}&${_clienId}&${_clientSecret}&${_hr}`, 
        'GET', null, 
        {
            'Content-Type': 'application/json', 
            'x-secret-key': `${_xSecretKey}`
        });
        return res.access_token
    }

    const getAllVacancies = async (page) => {
        const res = await request(`${_apiBase}vacancies/?page=${page}&count=4&no_agreement=1`, 
        'GET', null, 
        {
            'Content-Type': 'application/json', 
            'x-secret-key': `${_xSecretKey}`, 
            Authorization: `${_authorization}`,
            'X-Api-App-Id': `${_xApiAppId}`
        });

        // const res2 = await request(`${_apiBase}vacancies/?page=${page +1}&count=4&no_agreement=1`, 
        // 'GET', null, 
        // {
        //     'Content-Type': 'application/json', 
        //     'x-secret-key': `${_xSecretKey}`, 
        //     Authorization: `${_authorization}`,
        //     'X-Api-App-Id': `${_xApiAppId}`
        // });

        // console.log(res.objects.map(_transformJobData))
        // console.log(res)
        // console.log(res2.objects.map(_transformJobData))

        return res.objects.map(_transformJobData) /* console.log(res.objects.map(_transformJobData)) */
    }


    const getVacancyById = async (id) => {
        const res = await request(`${_apiBase}vacancies/${id}`, 
        'GET', null, 
        {
            'Content-Type': 'application/json', 
            'x-secret-key': `${_xSecretKey}`, 
            Authorization: `${_authorization}`,
            'X-Api-App-Id': `${_xApiAppId}`
        });

        // console.log(res.objects.map(_transformJobData))
        // console.log(res)

        return _transformJobData(res) /* console.log(_transformJobData(res)) */
    }

    // const getJobDescription = async (id) => {
    //     const res = await request(`${_apiBase}`, 
    //     'GET', null, 
    //     {
    //         'Content-Type': 'application/json', 
    //         'x-secret-key': `${_xSecretKey}`, 
    //         Authorization: `${_authorization}`,
    //         'X-Api-App-Id': `${_xApiAppId}`
    //     });
    //     return _transformJobData(res.data.results[0]);
    // }

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
            salary: salaryDisplay(job.payment_from, job.payment_to, job.currency)
        }
    }

    return {getAuthorization, getAllVacancies, getVacancyById, /* getJobDescription, */ loading, error, clearError}
}

export default useJoboredService;