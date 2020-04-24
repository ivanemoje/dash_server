const latestEntry = (req, res, pool) => {
      
  console.log('Latest entries requested by', req.connection.remoteAddress);
 
  query_run = `SELECT 
                a.id, a.manifest_name,  a.settlement,  a.fdp, a.area, a.field, a.modality, a.begin_date, a.end_date, a.servedHH, a.servedPopn, 
                a.plannedHH, a.plannedPopn, a.percent_HH, a.percent_Popn, a.hostname,
                a.cycle, a.cycle_year,   a.create_date 
                FROM gdt_ddr a 
                LEFT OUTER JOIN gdt_ddr b 
                ON a.manifest_name = b.manifest_name 
                AND a.create_date < b.create_date 
                WHERE b.manifest_name IS NULL ORDER BY a.create_date desc`; 

  pool.query(query_run, function (error, results, fields) {
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
  latestEntry 
}


