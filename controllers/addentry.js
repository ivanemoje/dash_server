const addEntry = (req, res, pool) => {
  
  console.log('Data posted by', req.connection.remoteAddress);

  const {
    hostname, 
    manifest_name,
    area,
    field,
    settlement,
    modality, 
    fdp,
    cycle,
    cycle_year,
    servedHH,
    servedPopn,
    plannedHH,
    plannedPopn,
    percent_HH,
    percent_Popn,
    begin_date,
    end_date
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
      modality, 
      manifest_name, 
      area, 
      field,
      settlement,
      fdp,
      cycle,
      cycle_year,
      servedHH,
      servedPopn,
      plannedHH,
      plannedPopn,
      percent_HH,
      percent_Popn,
      begin_date,
      end_date) 
      VALUES (
        "${hostname}", 
        "${modality}", 
        "${manifest_name}",
        "${area}",
        "${field}",
        "${settlement}", 
        "${fdp}",
        "${cycle}",
        "${cycle_year}", 
        "${servedHH}",
        "${servedPopn}",
        "${plannedHH}", 
        "${plannedPopn}",
        "${percent_HH}",
        "${percent_Popn}",
        "${begin_date}",
        "${end_date}"
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
    addEntry : addEntry
  }


