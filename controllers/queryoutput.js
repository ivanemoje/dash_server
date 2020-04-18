const allQueries = (req, res, pool) => {
      
    console.log('All fdp_codes entries requested by', req.connection.remoteAddress);
   
    query_run = `SELECT 
                    distinct (a.fdp_code) 
                    FROM gdt_eod_manifests a`; 



    pool.query(query_run, function (error, results, fields) {
      if (error) throw error;
      if (results.length) {
            res.json (results);
            }
      else {
        res.status(404).json('Not found');
        }      
    })
}
  module.exports = {
    allQueries 
  }


  