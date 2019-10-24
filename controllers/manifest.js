const allManifests = (req, res, pool) => {
      
    console.log('All manifests entries requested by', req.connection.remoteAddress);
   
    query_run = `SELECT 
                    distinct (a.manifest_id),  
                    a.manifest_type, 
                    b.region, 
                    a.manifest_file, 
                    a.manifest_date, 
                    a.is_suplimentary 
                  FROM manifests a
                  INNER JOIN fdp b 
                  ON a.manifest_fdp = b.settlement_id`; 
            
  
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
    allManifests 
  }


  