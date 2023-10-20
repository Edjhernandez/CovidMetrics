// src/mocks/handlers.js
import { rest } from 'msw'

const responseworlddata = {
  data: {
      date: "2023-03-09",
      last_update: "2023-03-10 04:21:03",
      confirmed: 676544789,
      confirmed_diff: 194101,
      deaths: 6881737,
      deaths_diff: 1854,
      recovered: 0,
      recovered_diff: 0,
      active: 669663052,
      active_diff: 192247,
      fatality_rate: 0.0102
  }
}

export const handlers = [
    //data total world without date
    rest.get('https://covid-19-statistics.p.rapidapi.com/reports/total', (req, res, ctx) => {
          
        
    
        // If authenticated, return a mocked user details
        return res(
          ctx.status(200),
          ctx.json(responseworlddata),
        )
      })
]