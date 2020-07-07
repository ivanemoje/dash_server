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


  //   pool.query(query_run, function (error, results) {
  //     if (error) throw error;
  //     let dateSt;
  //     if (results.length) {
  //       Object.keys(results).forEach(function(key){
  //         var row = results[key];
  //         const manifest_name = row.manifest_name;
  //         const create_date = row.create_date.toLocaleDateString("en-US", {year: 'numeric',month: 'numeric',day: 'numeric',hour: 'numeric',minute: 'numeric'});
  //         // console.log(manifest_name,create_date);
  //         dateSt = (manifest_name + create_date);
  //         console.log(dateSt);

  //       // res.json({create_date:create_date});
        
  //       // res.json(dateSt);
  //       })
  //     // res.json(dateSt);
  //     res.json(results);

  //     }
  //     else {
  //       res.status(404).json('Not found');
  //       }      
  //   })
  // }
  
  // module.exports = {
  //   allQueries 
  // }


  