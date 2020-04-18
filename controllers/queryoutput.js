const allQueries = (req, res, pool) => {
      
    console.log('All entries requested by', req.connection.remoteAddress);
   
    query_run = `SELECT * FROM gdt_ddr`; 

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


  