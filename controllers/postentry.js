const postEntry = (db)  =>  (req, res) => {
	const {  
		host_name,
		manifest_name,
		area,
		field,
		fdp,
		cycle,
		cycle_year,
		modality,
		begin_date,
		end_date,
		servedHH,
		servedPopn,
		plannedHH,
		plannedPopn,
		percent_HH,
		percent_Popn
	} = req.body;
  
	console.log(req.body);
  
/*	if (  !manifest_name ||
		  !begin_date ||
		  !end_date ||
		  !servedHH ||
		  !servedPopn ||
		  !plannedHH ||
		  !plannedPopn ||
		  !percent_HH ||
		  !percent_Popn
		  )
	{
	  return res.status(400).json('Incorrect form submission');
	}
	*/
  
	db.transaction ( trx => {
	  trx.insert ({
		host_name: host_name,
		manifest_name : manifest_name,
		area:area,
		field:field,
		fdp:fdp,
		cycle:cycle,
		cycle_year:cycle_year,
		modality:modality,
		begin_date : begin_date,
		end_date : end_date,
		servedHH : servedHH,
		servedPopn : servedPopn,
		plannedHH : plannedHH,
		plannedPopn : plannedPopn,
		percent_HH : percent_HH,
		percent_Popn : percent_Popn,
		entry_date : new Date()
	  })
	  .into('gdt_ddr')
	  .then(trx.commit)
	  .then(trx.rollback)
	})
	 .catch (err => res.status(400).json("Unable to Add Entry"));
	 console.log('Entries submitted by', req.connection.remoteAddress);
	 return res.status(200).json ("Entry submitted");
  
  
  }
  
  module.exports = {
	postEntry: postEntry
  } 