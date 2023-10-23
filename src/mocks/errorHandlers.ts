import { rest } from 'msw'

export const errorHandlers = [
    
    rest.get('https://covid-19-statistics.p.rapidapi.com/reports/total', (req, res, ctx) => {
          
      const date = req.url.searchParams.get('date')
      return res(
        ctx.status(423),
        ctx.json(date ? {} : {}),
      )
    }),

    rest.get('https://covid-19-statistics.p.rapidapi.com/reports', (req, res, ctx) => {
          
      const date = req.url.searchParams.get('date')
      const iso = req.url.searchParams.get('iso')
      return res(
        ctx.status(423),
        ctx.json(date && iso ? {} : {}),
      )
    })
] 