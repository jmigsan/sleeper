const asyncHandler = require("express-async-handler");
const pool = require('../db')
const { v4: uuidv4 } = require("uuid");

const test = asyncHandler(async (req, res) => {
  try {
    console.log('yo');
    res.status(200).json('yo');
  } 
  
  catch (err) {
    throw new Error(err);
  }

});

const test2 = asyncHandler(async (req, res) => {
  console.log('yo')

  try {
    const latest_sleep_value = await pool.query("SELECT sleep_value FROM all_sleeper_logs WHERE sleeper_id = $1 ORDER BY log_timestamp DESC FETCH FIRST ROW ONLY", ['r1QsxmVwPzXq9aD4Ku5xUbZQWme2']);
    if (latest_sleep_value.rowCount !== 0) {
      res.status(200).json(latest_sleep_value);
    }
    if (latest_sleep_value.rowCount == 0) {
      res.status(200).json(latest_sleep_value);
    }
    
  } 
  
  catch (err) {
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

    const latest_sleep_value = await pool.query("SELECT sleep_value FROM all_sleeper_logs WHERE sleeper_id = $1 ORDER BY log_timestamp DESC FETCH FIRST ROW ONLY", [req.body.userUid]);
    if (latest_sleep_value.rowCount !== 0) {
      const sv_data = latest_sleep_value.rows[0];
      const sv_data_value = sv_data.sleep_value;
      const float_sleep_value = parseFloat(sv_data_value)
      sleep_value = 1.23 + float_sleep_value;
    }
    if (latest_sleep_value.rowCount == 0) {
      const float_sleep_value = parseFloat(0.0);
      sleep_value = 1.23 + float_sleep_value;
    }    
    
    const new_sleep_log = await pool.query("INSERT INTO all_sleeper_logs (log_id, log_timestamp, sleeper_id, sleep_time, awake_time, minutes_slept, sleep_value, log_date) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [log_id, log_timestamp, req.body.userUid, req.body.sleepyTime, req.body.wakeyTime, mins_slept, sleep_value, req.body.wakeyDate]);
    res.status(200).json(new_sleep_log);
  } 
  
  catch (err) {
    // console.log(err);
    throw new Error(err);
  }

});

const getSleepLogs = asyncHandler(async (req, res) => {
  // console.log('yo');
  // console.log(req.body.userUid)

  try {
    const allLogs = await pool.query("SELECT * FROM all_sleeper_logs WHERE sleeper_id = $1 ORDER BY log_timestamp ASC", [req.body.userUid]);
    res.status(200).json(allLogs.rows);
  } 
  
  catch (err) {
    throw new Error(err);
  }

});

const getIfUserPublic = asyncHandler(async (req, res) => {

  try {
    const ifPublic = await pool.query("SELECT publicly_tradable FROM all_sleepers WHERE sleeper_id = $1", [req.body.userUid]);
    res.status(200).json(ifPublic.rows);
  } 
  
  catch (err) {
    throw new Error(err);
  }

});

const changeIfUserPublic = asyncHandler(async (req, res) => {

  try {
    const ifPublic = await pool.query("UPDATE all_sleepers SET publicly_tradable = $1 WHERE sleeper_id = $2 RETURNING publicly_tradable", [req.body.newPublicSetting, req.body.userUid]);
    res.status(200).json(ifPublic.rows);
  } 
  
  catch (err) {
    throw new Error(err);
  }

});

const getPublicSleepers = asyncHandler(async (req, res) => {

  try {
    const publicSleepers = await pool.query("SELECT * FROM all_sleepers WHERE publicly_tradable = TRUE");
    res.status(200).json(publicSleepers.rows);
  } 
  
  catch (err) {
    throw new Error(err);
  }

});

const getLastSleeperValue = asyncHandler(async (req, res) => {

  try {
    const latestSleepValue = await pool.query("SELECT sleep_value FROM all_sleeper_logs WHERE sleeper_id = $1 ORDER BY log_timestamp DESC FETCH FIRST ROW ONLY", [req.body.userUid]);
    res.status(200).json(latestSleepValue.rows);
  } 
  
  catch (err) {
    throw new Error(err);
  }

});

const snapshotAllPortfolios = asyncHandler( async (req, res) => {
	try {
		const every_sleeper = await pool.query("SELECT * FROM all_sleeper_portfolios");

		let now = new Date();
		let nowUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
		let snapshot_date = nowUTC.toISOString();

		every_sleeper.forEach( async (x) => {
			let invested_sleep_value = 0.0;

			x.portfolio_picks_of_sleeper_ids.forEach( async (x) => {
				const single_sleep_value = await pool.query("SELECT * FROM all_speeper_logs WHERE sleeper_id = $1 ORDER BY log_timestamp DESC FETCH FIRST ROW ONLY", [x])
				invested_sleep_value = invested_sleep_value + parseFloat(single_sleep_value); 
        console.log(invested_sleep_value);
        // not sure if return is string or not
			});

      // for (let i = 0; i < x.portfolio_picks_of_sleeper_ids.length; i++) {
      //   const single_sleep_value = await pool.query("SELECT * FROM all_speeper_logs WHERE sleeper_id = $1 ORDER BY log_timestamp DESC FETCH FIRST ROW ONLY", [x.portfolio_picks_of_sleeper_ids[i]])
			//   invested_sleep_value = invested_sleep_value + parseFloat(single_sleep_value);
      //   console.log(invested_sleep_value);
      // };

			const sleeper_cash_on_hand = await pool.query("SELECT sleeper_cash_on_hand FROM all_sleepers WHERE sleeper_id = $1", [x.sleeper_id]);
			const total_sleep_value = parseFloat(sleeper_cash_on_hand) + invested_sleep_value;
			const new_portfolio_log = await pool.query("INSERT INTO all_sleeper_portfolio_logs (sleeper_id, snapshot_date, snapshot_sleep_value) VALUES($1, $2, $3) RETURNING *", [x.sleeper_id, snapshot_date, total_sleep_value]);
		});
		res.status(200);
	} 
  
	catch (err) {
		throw new Error(err);
	}
});

module.exports = {
  test,
  test2,
  createSleepLog,
  getSleepLogs,
  getIfUserPublic,
  changeIfUserPublic,
  getPublicSleepers,
  getLastSleeperValue,
  snapshotAllPortfolios,
};