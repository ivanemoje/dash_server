
const hhDetail = (req, res, pool) => {
      
    console.log('HH entries requested by', req.connection.remoteAddress);
   
    // query_run = `SELECT * from query_outputs where cycle_code = '2019-08'`; 
    query_run = `SELECT * FROM query_outputs WHERE processing_group_no = 'XSE-18H00880'`; 
            
  
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
    hhDetail 
  }


  