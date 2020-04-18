const sqlGdt = (req, res, pool) => {
      
    console.log('Data posted by', req.connection.remoteAddress);
    
    const hostname = req.body.hostname;
    const modality = req.body.modality;
    console.log(req.body);
    console.log("Values:", hostname, modality);


    if (  
      !hostname ||
		  !modality
		  )
	{
	  return res.status(400).json('Incorrect form submission');
	}
   
    query_run = `INSERT INTO gdt_test (hostname, modality) VALUES ("${hostname}", "${modality}");`; 



    pool.query(query_run, function (error, results) {
      // Bug. If statement conditions working in opposite
      if (error) throw error;

      if (results.length) {
        res.status(404).json('Not found');
            // res.json (results);
            }
      else {
        // res.status(404).json('Not found');
        res.status(200).json('inserted');
        // res.json (results);
        }      
    })
}
  module.exports = {
    sqlGdt : sqlGdt
  }


  