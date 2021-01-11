const pool = require('./pool')

export default {
   query(queryText, params) {
       pool.query(queryText, params)
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            reject
        })
   }
}