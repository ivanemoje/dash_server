const cycleRecon = (req, res, pool) => {
      
    console.log('Recon entries requested by', req.connection.remoteAddress);
   
    query_run = `SELECT * from query_outputs where cycle_code = '2019-08'`; 
            
  
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
    cycleRecon 
  }
