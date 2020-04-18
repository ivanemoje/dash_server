const postGdt = (db)  =>  (req, res) => {
	const {  
		host_name,
		modality
	} = req.body;
  
	console.log(req.body);
  
/*	if (  !host_name ||
		  !modality
		  )
	{
	  return res.status(400).json('Incorrect form submission');
	}
	*/
  
	db.transaction ( trx => {
	  trx.insert ({
		host_name : host_name,
		modality : modality
	  })
	  .into('gdt_test')
	  .then(trx.commit)
	  .then(trx.rollback)
	})
	 .catch (err => res.status(400).json("Unable to Add Entry"));
	 console.log('Entries submitted by', req.connection.remoteAddress);
	 return res.status(200).json ("Entry submitted");
  
  
  }
  
  module.exports = {
	postGdt: postGdt
  } 