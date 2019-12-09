
const householdDetail = (req, res, pool) => {
	const { processing_group_no } = req.params;
	
	console.log('Household', req.connection.remoteAddress);

	query_run = `SELECT * from query_outputs where processing_group_no = 'XSE-18H00880'`; 


	pool.query(query_run, function (error, res, fields) {
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
	householdDetail: householdDetail
}


