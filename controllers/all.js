const allQueries = (req, res, pool) => {
      
    console.log('All entries requested by', req.connection.remoteAddress);
   
    query_run = `SELECT manifest_name, create_date FROM gdt_ddr limit 3`; 

    const queries =  {
      manifests : `SELECT manifest_name, create_date FROM gdt_ddr limit 3`
    };

    // const getList = (queryName, queryParams) => {
      return new Promise(function(resolve, reject){
        pool.query(queries[queryName], queryParams, function(err, result, fields){
          if (!err) resolve(JSON.parse(JSON.stringify(result))); // Hacky solution
          else reject(err);
        });
      });
    };
    
    module.exports = {
      allQueries
    };



  