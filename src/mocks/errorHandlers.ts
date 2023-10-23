import {rest} from 'msw';
    export const errorHandlers = [
    rest.get('https://covid-19-statistics.p.rapidapi.com/reports', (req, res, ctx) => {
        const date = req.url.searchParams.get('date')
        if(date)
            return res(
            ctx.status(429),
            ctx.json({success: false, message: 'Error Occured!!!!'}),
    )
    })
]