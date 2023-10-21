 // src/mocks/handlers.js
import { rest } from 'msw'
import { responsetotal, responsetotalbydate, responsesomecountries } from './mockResponses'
import { responsetoUK } from './mockResponsetoUK'


export const handlers = [
    
    rest.get('https://covid-19-statistics.p.rapidapi.com/reports/total', (req, res, ctx) => {
          
      const date = req.url.searchParams.get('date')
      return res(
        ctx.status(200),
        ctx.json(date ? responsetotalbydate : responsetotal),
      )
    }),//https://covid-19-statistics.p.rapidapi.com/reports

    rest.get('https://covid-19-statistics.p.rapidapi.com/reports', (req, res, ctx) => {
          
      const date = req.url.searchParams.get('date')
      const iso = req.url.searchParams.get('iso')
      return res(
        ctx.status(200),
        ctx.json((date && iso) ? responsetoUK : responsesomecountries),
      )
    })
    
    

] 