const addEntryv2 = (req, res, pool) => {
  
  console.log('Data posted by', req.connection.remoteAddress);

  const {
        hostname, 
        manifest_name, 
        cycle, 
        cycle_year, 
        settlement,
        field,
        modality,
        fdp,
        distribution_date,
        plannedHH, 
        servedHH,
        servedHHToday,
        percent_HH,
        plannedPopn,
        servedPopn,
        servedPopnToday,
        percent_Popn
  } = req.body;

  // console.log(req.body);
  // console.log("Values:", hostname, modality);
  
  if (
    !hostname ||
    !modality
    )
    {
      return res.status(400).json('Incorrect form submission');
    }
  
  query_run = `
    INSERT INTO gdt_ddr (
        hostname, 
        manifest_name, 
        cycle, 
        cycle_year, 
        settlement,
        field,
        modality,
        fdp,
        distribution_date,
        plannedHH, 
        servedHH,
        servedHHToday,
        percent_HH,
        plannedPopn,
        servedPopn,
        servedPopnToday,
        percent_Popn ) 
      VALUES (
        "${hostname}", 
        "${manifest_name}", 
        "${cycle}", 
        "${cycle_year}", 
        "${settlement}",
        "${field}",
        "${modality}", 
        "${fdp}", 
        "${distribution_date}", 
        "${plannedHH}", 
        "${servedHH}",
        "${servedHHToday}", 
        "${percent_HH}", 
        "${plannedPopn}", 
        "${servedPopn}",
        "${servedPopnToday}", 
        "${percent_Popn}"
        );`; 
        
    pool.query(query_run, function (error, results) {
      // Bug. If statement conditions working in opposite
      if (error) throw error;
      
      if (results.length) {
        // res.json (results);
        res.status(404).json('Not found');
      } else {
        // res.status(404).json('Not found');
        res.status(200).json('Data Inserted');
      }
    })
  }
  
  module.exports = {
    addEntryv2 : addEntryv2
  }


