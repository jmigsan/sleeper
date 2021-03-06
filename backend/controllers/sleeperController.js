const asyncHandler = require("express-async-handler");
const pool = require('../db')
const { v4: uuidv4 } = require("uuid");

const test = asyncHandler(async (req, res) => {
  try {
    console.log('yo');
    res.status(200).json('yo');
  } 
  
  catch (err) {
    res.status(400);
    throw new Error(err);
  }

});

const test2 = asyncHandler(async (req, res) => {
  console.log('oi');
  const transaction_id = uuidv4();

  try {
    const checkIfThere = await pool.query('SELECT * FROM all_sleeper_portfolios WHERE sleeper_id=$1 AND pick_sleeper_id = $2', [req.body.investorId, req.body.investmentId]);
    if (checkIfThere.rowCount === 0) {
      await pool.query('INSERT INTO all_sleeper_portfolios(transaction_id, sleeper_id, pick_sleeper_id, pick_amount) VALUES($1, $2, $3, $4)', [transaction_id, req.body.investorId, req.body.investmentId, req.body.amount]);
      res.status(200).json('peng');
    };
    if (checkIfThere.rowCount !== 0) {
      await pool.query(`UPDATE all_sleeper_portfolios
                        SET pick_amount = pick_amount + $3
                        WHERE sleeper_id=$1 AND pick_sleeper_id = $2`,
                        [req.body.investorId, req.body.investmentId, req.body.amount]);
      res.status(200).json('pog');
    };    
  } 
  catch (err) {
    res.status(400);
    throw new Error(err);
  }

});

const createSleepLog = asyncHandler(async (req, res) => {
  try {
    const log_id = uuidv4();

    const now = new Date();
		const nowUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
		const log_timestamp = nowUTC.toISOString();

    let mins_slept = 0;

    const sleepyTime = req.body.sleepyTime
    const wakeyTime = req.body.wakeyTime

    const sleepyHourInt = parseInt(sleepyTime.substring(0,2));
    const wakeyHourInt = parseInt(wakeyTime.substring(0,2));
    const sleepyMinInt = parseInt(sleepyTime.substring(3,5));
    const wakeyMinInt = parseInt(wakeyTime.substring(3,5));

    if (sleepyHourInt > wakeyHourInt) {
      const hours_to_midnight_minus1 = 24 - sleepyHourInt - 1;
      const hours_from_midnight = wakeyHourInt;

      const minutes1 = 60 - sleepyMinInt;
      const minutes2 = wakeyMinInt;

      mins_slept = (hours_to_midnight_minus1 * 60) + (hours_from_midnight * 60) + minutes1 + minutes2;
    }

    if (sleepyHourInt < wakeyHourInt) {
      const time1_minus_time2_minus1 = wakeyHourInt - sleepyHourInt - 1

      const minutes1 = 60 - sleepyMinInt;
      const minutes2 = wakeyMinInt;

      mins_slept = (time1_minus_time2_minus1 * 60) + minutes1 + minutes2;
    }

    if (sleepyHourInt == wakeyHourInt) {
      if (sleepyMinInt < wakeyMinInt) {
        mins_slept = wakeyMinInt - sleepyMinInt;
      }

      if (sleepyMinInt > wakeyMinInt) {
        mins_slept = (24 * 60) - (sleepyMinInt - wakeyMinInt);
      }

    }

    let sleep_value = 0;

    const latest_sleep_value = await pool.query(
                                               `SELECT 
                                                  sleep_value 
                                                FROM 
                                                  all_sleeper_logs
                                                WHERE 
                                                  sleeper_id = $1 
                                                ORDER BY 
                                                  log_timestamp DESC 
                                                FETCH 
                                                  FIRST ROW ONLY`, [req.body.userUid]);
    if (latest_sleep_value.rowCount !== 0) {
      const sv_data = latest_sleep_value.rows[0];
      const sv_data_value = sv_data.sleep_value;
      const float_sleep_value = parseFloat(sv_data_value)
      
      const latestSleepTime = await pool.query("SELECT * FROM all_sleeper_logs WHERE sleeper_id = $1 ORDER BY log_timestamp DESC FETCH FIRST ROW ONLY", [req.body.userUid]);
      let lastTime = latestSleepTime.rows[0].sleep_time.substring(0,5)
      let thisTime = req.body.sleepyTime.substring(0,5)

      let date1 = new Date (`17 July 2022 ${thisTime}`)
      let date2 = new Date (`17 July 2022 ${lastTime}`)

      if (thisTime.substring(0,2) < 16 && lastTime.substring(0,2) < 16) {

       }
        
      if (thisTime.substring(0,2) > 16 && lastTime.substring(0,2) > 16) {

      }
      
      if (thisTime.substring(0,2) > 16 && lastTime.substring(0,2) < 16) {
        date1.setDate(16)
      }

      let diff = (Math.abs(date1.getTime() - date2.getTime()) / 60000)
      if (diff < 70) {
        if (thisTime.substring(0,2) >= 16) {
          // sleep_value = float_sleep_value + ((diff)*1.8);
          sleep_value = (float_sleep_value + 60) * 1.35;
        }
        if (thisTime.substring(0,2) < 16) {
          // sleep_value = float_sleep_value - ((diff)*1.8);
          if ((float_sleep_value - 60) < 0.01) {
            sleep_value = 0.01;
          }
          else {
            sleep_value = (float_sleep_value - 60) * 1.35;
          }
          
        }
      }
      else {
        if (thisTime.substring(0,2) >= 16) {
          // sleep_value = float_sleep_value + (diff);
          sleep_value = (float_sleep_value + 40) * 1.1;
        }
        if (thisTime.substring(0,2) < 16) {
          // sleep_value = float_sleep_value - (diff);
          if ((float_sleep_value - 40) < 0.01) {
            sleep_value = 0.01;
          }
          else {
            sleep_value = (float_sleep_value - 40) * 1.1;
          }
        }
      }
    }
    if (latest_sleep_value.rowCount === 0) {
      // const float_sleep_value = parseFloat(0.0);
      sleep_value = 60;
    }    
    
    const new_sleep_log = await pool.query("INSERT INTO all_sleeper_logs (log_id, log_timestamp, sleeper_id, sleep_time, awake_time, minutes_slept, sleep_value, log_date) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [log_id, log_timestamp, req.body.userUid, req.body.sleepyTime, req.body.wakeyTime, mins_slept, sleep_value, req.body.wakeyDate]);
    res.status(200).json('new_sleep_log');
  } 
  
  catch (err) {
    res.status(400);
    // console.log(err);
    throw new Error(err);
  }

});

const getSleepLogs = asyncHandler(async (req, res) => {
  // console.log('yo');
  // console.log(req.body.userUid)

  try {
    const allLogs = await pool.query("SELECT * FROM all_sleeper_logs WHERE sleeper_id = $1 ORDER BY log_timestamp ASC", [req.body.userUid]);

    if (allLogs.rowCount !== 0) {
      res.status(200).json(allLogs.rows);
    };

    if (allLogs.rowCount === 0) {
      res.status(200).json([{
        "sleeper_id": req.body.userUid,
        "minutes_slept": 0,
        "sleep_value": 0,
        "log_date": 0,
        "sleep_time": "00:00:00",
        "awake_time": "00:00:00",
        "log_id": "00000000-0000-0000-0000-000000000000"
      }]);
    }
    
  } 
  
  catch (err) {
    res.status(400);
    throw new Error(err);
  }

});

const getIfUserPublic = asyncHandler(async (req, res) => {

  try {
    const ifPublic = await pool.query("SELECT publicly_tradable FROM all_sleepers WHERE sleeper_id = $1", [req.body.userUid]);
    res.status(200).json(ifPublic.rows);
  } 
  
  catch (err) {
    res.status(400);
    throw new Error(err);
  }

});

const changeIfUserPublic = asyncHandler(async (req, res) => {

  try {
    const ifPublic = await pool.query("UPDATE all_sleepers SET publicly_tradable = $1 WHERE sleeper_id = $2 RETURNING publicly_tradable", [req.body.newPublicSetting, req.body.userUid]);
    res.status(200).json(ifPublic.rows);
  } 
  
  catch (err) {
    res.status(400);
    throw new Error(err);
  }

});

// const getPublicSleepers = asyncHandler(async (req, res) => {

//   try {
//     const publicSleepers = await pool.query("SELECT * FROM all_sleepers WHERE publicly_tradable = TRUE");
//     res.status(200).json(publicSleepers.rows);
//   } 
  
//   catch (err) {
//     throw new Error(err);
//   }

// });

// const getLastSleeperValue = asyncHandler(async (req, res) => {

//   try {
//     const latestSleepValue = await pool.query("SELECT sleep_value FROM all_sleeper_logs WHERE sleeper_id = $1 ORDER BY log_timestamp DESC FETCH FIRST ROW ONLY", [req.body.userUid]);
//     res.status(200).json(latestSleepValue.rows);
//   } 
  
//   catch (err) {
//     throw new Error(err);
//   }

// });

const initSleeper = asyncHandler(async (req, res) => {
  try {
    const sleeperInit = await pool.query("INSERT INTO all_sleepers (sleeper_id, sleeper_name, sleeper_cash_on_hand, publicly_tradable) VALUES ($1, $2, 1000, TRUE)", [req.body.userUid, req.body.displayName]);
    res.status(200).json('nice');
  } 
  
  catch (err) {
    res.status(400);
    // console.log(err);
    throw new Error(err);
  }

});

const getPublicSleepersInfo = asyncHandler(async (req, res) => {

  try {
    const publicSleepersInfo = await pool.query(
                           `SELECT * 
                            FROM (
                              SELECT 
                                all_sleepers.sleeper_id, 
                                all_sleepers.sleeper_name,
                                all_sleepers.publicly_tradable, 
                                all_sleeper_logs.sleep_value,
                                all_sleeper_logs.log_timestamp, 
                                ROW_NUMBER() OVER(PARTITION BY all_sleepers.sleeper_id ORDER BY all_sleeper_logs.log_timestamp DESC) rn 
                              FROM 
                                all_sleepers INNER JOIN all_sleeper_logs ON all_sleepers.sleeper_id=all_sleeper_logs.sleeper_id
                              WHERE
                                all_sleepers.publicly_tradable=TRUE
                              ) a 
                            WHERE rn = 1`);
    res.status(200).json(publicSleepersInfo.rows);
  }
  
  catch (err) {
    res.status(400);
    throw new Error(err);
  }

});

const getSleeperName = asyncHandler(async (req, res) => {

  try {
    const ifPublic = await pool.query('SELECT sleeper_name FROM all_sleepers WHERE sleeper_id = $1', [req.body.sleeperId]);
    res.status(200).json(ifPublic.rows);
  } 
  
  catch (err) {
    throw new Error(err);
  }

});

const getUserCash = asyncHandler(async (req, res) => {

  try {
    const getCash = await pool.query(`SELECT sleeper_cash_on_hand FROM all_sleepers WHERE sleeper_id = $1`, [req.body.userUid]);
    res.status(200).json(getCash.rows);
  } 
  
  catch (err) {
    throw new Error(err);
  }

});

const investInSleeper = asyncHandler(async (req, res) => {
  const transaction_id = uuidv4();

  try {   
    await pool.query('BEGIN');

    await pool.query(`UPDATE all_sleepers 
                      SET sleeper_cash_on_hand = sleeper_cash_on_hand - (
                        (SELECT sleep_value FROM all_sleeper_logs WHERE sleeper_id = $2 ORDER BY log_timestamp DESC FETCH FIRST ROW ONLY) 
                        * $3
                      ) 
                      WHERE sleeper_id = $1`,
                      [req.body.investorId, req.body.investmentId, req.body.amount]
                    );

    const checkIfThere = await pool.query('SELECT * FROM all_sleeper_portfolios WHERE sleeper_id=$1 AND pick_sleeper_id = $2', [req.body.investorId, req.body.investmentId]);
    
    if (checkIfThere.rowCount === 0) {
      await pool.query('INSERT INTO all_sleeper_portfolios(transaction_id, sleeper_id, pick_sleeper_id, pick_amount) VALUES($1, $2, $3, $4)', [transaction_id, req.body.investorId, req.body.investmentId, req.body.amount]);
    };
    
    if (checkIfThere.rowCount !== 0) {
      await pool.query(`UPDATE all_sleeper_portfolios
                        SET pick_amount = pick_amount + $3
                        WHERE sleeper_id=$1 AND pick_sleeper_id = $2`,
                        [req.body.investorId, req.body.investmentId, req.body.amount]);
    };

    await pool.query(`UPDATE all_sleepers
                      SET sleeper_cash_on_hand = sleeper_cash_on_hand + (
                        (SELECT sleep_value FROM all_sleeper_logs WHERE sleeper_id = $1 ORDER BY log_timestamp DESC FETCH FIRST ROW ONLY)
                        * $2
                      )
                      WHERE sleeper_id = $1`,
                      [req.body.investmentId, req.body.amount]
                    );

    await pool.query('COMMIT');

    res.status(200).json('Successful Transaction');
  } 
  
  catch (err) {
    // console.log(err);
    res.status(400);
    throw new Error(err);
  };

});

const getUserPortfolio = asyncHandler(async (req, res) => {

  try {
    const getPortfolio = await pool.query(
                     `SELECT * 
                      FROM (
                        SELECT
                          all_sleeper_portfolios.sleeper_id,
                          all_sleeper_portfolios.pick_sleeper_id, 
                          all_sleepers.sleeper_name, 
                          all_sleeper_logs.sleep_value, 
                          all_sleeper_portfolios.pick_amount, 
                          all_sleeper_logs.log_timestamp, 
                          ROW_NUMBER() OVER(PARTITION BY all_sleeper_portfolios.pick_sleeper_id ORDER BY all_sleeper_logs.log_timestamp DESC) rn 
                        FROM 
                          all_sleeper_portfolios INNER JOIN all_sleeper_logs ON all_sleeper_portfolios.pick_sleeper_id=all_sleeper_logs.sleeper_id INNER JOIN all_sleepers ON all_sleeper_portfolios.pick_sleeper_id=all_sleepers.sleeper_id
                        WHERE
                          all_sleeper_portfolios.sleeper_id=$1
                        ) a
                      WHERE rn = 1;`, 
                      [req.body.userUid]
                    );
    res.status(200).json(getPortfolio.rows);
  } 
  
  catch (err) {
    res.status(400);
    throw new Error(err);
  };

});

const sellSleeper = asyncHandler(async (req, res) => {
  // const transaction_id = uuidv4();

  try {   
    await pool.query('BEGIN');

    await pool.query(`UPDATE all_sleepers 
                      SET sleeper_cash_on_hand = sleeper_cash_on_hand + (
                        (SELECT sleep_value FROM all_sleeper_logs WHERE sleeper_id = $2 ORDER BY log_timestamp DESC FETCH FIRST ROW ONLY) 
                        * $3
                      ) 
                      WHERE sleeper_id = $1`,
                      [req.body.investorId, req.body.investmentId, req.body.amount]
                    );

    await pool.query(`UPDATE all_sleeper_portfolios
                      SET pick_amount = pick_amount - $3
                      WHERE sleeper_id=$1 AND pick_sleeper_id = $2`,
                      [req.body.investorId, req.body.investmentId, req.body.amount]);

    await pool.query('COMMIT');

    res.status(200).json('Successful Transaction');
  } 
  
  catch (err) {
    // console.log(err);
    res.status(400);
    throw new Error(err);
  };

});

const getUserPortfolioForOne = asyncHandler(async (req, res) => {

  try {
    const getPortfolio = await pool.query(
                     `SELECT * 
                      FROM (
                        SELECT
                          all_sleeper_portfolios.sleeper_id,
                          all_sleeper_portfolios.pick_sleeper_id, 
                          all_sleepers.sleeper_name, 
                          all_sleeper_logs.sleep_value, 
                          all_sleeper_portfolios.pick_amount, 
                          all_sleeper_logs.log_timestamp, 
                          ROW_NUMBER() OVER(PARTITION BY all_sleeper_portfolios.pick_sleeper_id ORDER BY all_sleeper_logs.log_timestamp DESC) rn 
                        FROM 
                          all_sleeper_portfolios INNER JOIN all_sleeper_logs ON all_sleeper_portfolios.pick_sleeper_id=all_sleeper_logs.sleeper_id INNER JOIN all_sleepers ON all_sleeper_portfolios.pick_sleeper_id=all_sleepers.sleeper_id
                        WHERE
                          all_sleeper_portfolios.sleeper_id=$1 AND all_sleeper_portfolios.pick_sleeper_id =$2
                        ) a
                      WHERE rn = 1;`, 
                      [req.body.userUid, req.body.pickId]
                    );
    res.status(200).json(getPortfolio.rows);
  } 
  
  catch (err) {
    res.status(400);
    throw new Error(err);
  };

});

// const snapshotAllPortfolios = asyncHandler( async (req, res) => {
// 	try {
// 		const every_sleeper = await pool.query("SELECT * FROM all_sleeper_portfolios");

// 		let now = new Date();
// 		let nowUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
// 		let snapshot_date = nowUTC.toISOString();

// 		every_sleeper.forEach( async (x) => {
// 			let invested_sleep_value = 0.0;

// 			x.portfolio_picks_of_sleeper_ids.forEach( async (x) => {
// 				const single_sleep_value = await pool.query("SELECT * FROM all_speeper_logs WHERE sleeper_id = $1 ORDER BY log_timestamp DESC FETCH FIRST ROW ONLY", [x])
// 				invested_sleep_value = invested_sleep_value + parseFloat(single_sleep_value); 
//         console.log(invested_sleep_value);
//         // not sure if return is string or not
// 			});

//       // for (let i = 0; i < x.portfolio_picks_of_sleeper_ids.length; i++) {
//       //   const single_sleep_value = await pool.query("SELECT * FROM all_speeper_logs WHERE sleeper_id = $1 ORDER BY log_timestamp DESC FETCH FIRST ROW ONLY", [x.portfolio_picks_of_sleeper_ids[i]])
// 			//   invested_sleep_value = invested_sleep_value + parseFloat(single_sleep_value);
//       //   console.log(invested_sleep_value);
//       // };

// 			const sleeper_cash_on_hand = await pool.query("SELECT sleeper_cash_on_hand FROM all_sleepers WHERE sleeper_id = $1", [x.sleeper_id]);
// 			const total_sleep_value = parseFloat(sleeper_cash_on_hand) + invested_sleep_value;
// 			const new_portfolio_log = await pool.query("INSERT INTO all_sleeper_portfolio_logs (sleeper_id, snapshot_date, snapshot_sleep_value) VALUES($1, $2, $3) RETURNING *", [x.sleeper_id, snapshot_date, total_sleep_value]);
// 		});
// 		res.status(200);
// 	} 
  
// 	catch (err) {
//     res.status(400);
// 		throw new Error(err);
// 	}
// });

module.exports = {
  test,
  test2,
  createSleepLog,
  getSleepLogs,
  getIfUserPublic,
  changeIfUserPublic,
  initSleeper,
  getPublicSleepersInfo,
  getSleeperName,
  getUserCash,
  investInSleeper,
  sellSleeper,
  getUserPortfolio,
  getUserPortfolioForOne,
};