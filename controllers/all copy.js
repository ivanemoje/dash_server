const allQueries = (req, res, pool) => {
      
    console.log('All entries requested by', req.connection.remoteAddress);
   
    query_run = `SELECT manifest_name, create_date FROM gdt_ddr limit 3`; 

    pool.query(query_run, function (error, results) {
      if (error) throw error;
      if (results.length) {

        // const json_date = JSON.stringify(results[0].create_date);
        // const dateSt = JSON.parse(json_date);

        // const dateStr_ = new Date(dateSt);
        // console.log('Parsed Date: \n',dateStr_); 

        // console.log( dateStr_.toISOString().split('.')[0]+"Z" );

        // console.log('Formatted Date: \n', dateStr_.toLocaleDateString("en-US", {
        //   year: 'numeric',
        //   month: 'numeric',
        //   day: 'numeric',
        //   hour: 'numeric',
        //   minute: 'numeric'
        // }));

        const create_date = results[0].create_date.toLocaleDateString("en-US", {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'})
          ;
          
        data = JSON.stringify(results);
        console.log(typeof(data));
        var thing = data.replace("T", " ");
        console.log(thing);
        lala = JSON.parse(thing);

        const objectifyRawPacket = row => ({...row});
        // console.log(objectifyRawPacket);

        // res.json(thing);
        res.json(results);

          for (let key in results) {
            // console.log(results[key]);
            // console.log(key.toUpperCase() + ':', results[key]);
            // console.log(results.keys(results));

            



          }

        
        //working
        // console.log('Formatted Raw Date: \n', results[0].create_date.toLocaleDateString("en-US", {
        //   year: 'numeric',
        //   month: 'numeric',
        //   day: 'numeric',
        //   hour: 'numeric',
        //   minute: 'numeric'
        // }));
        // res.json({
        //   create_date : create_date
        // });

        
        // res.json(results);

        }
      else {
        res.status(404).json('Not found');
        }      
    })
  }
  
  module.exports = {
    allQueries 
  }


  