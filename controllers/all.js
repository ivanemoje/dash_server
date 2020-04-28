const allQueries = (req, res, pool) => {
      
    console.log('All entries requested by', req.connection.remoteAddress);
   
    query_run = `SELECT manifest_name, create_date FROM gdt_ddr limit 3`; 

    pool.query(query_run, function (error, results, fields) {
      if (error) throw error;
      if (results.length) {
        // console.log(JSON.stringify(results));
          // console.log(results.create_date);
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


  