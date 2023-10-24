import { rest } from 'msw'
import { responsetotal, responsetotalbydate, responsesomecountries } from './mockResponses'
import { responsetoUK } from './mockResponsetoUK'
import { responseToVe } from './mockResponseToVe'

export const handlers = [
    
    rest.get('https://covid-19-statistics.p.rapidapi.com/reports/total', (req, res, ctx) => {
          
      const date = req.url.searchParams.get('date')
      return res(
        ctx.status(200),
        ctx.json(date ? responsetotalbydate : responsetotal),
      )
    }),

    rest.get('https://covid-19-statistics.p.rapidapi.com/reports', (req, res, ctx) => {
          
      const date = req.url.searchParams.get('date')
      const iso = req.url.searchParams.get('iso')
      const response = iso === 'GBR' ? responsetoUK : responseToVe;
      
      return res(
        ctx.status(200),
        ctx.json((date && iso) ? response : responsesomecountries),
      )
    })
] 