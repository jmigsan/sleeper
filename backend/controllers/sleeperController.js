const asyncHandler = require("express-async-handler");

const test = asyncHandler(async (req, res) => {
  try {
    res.status(200).json('yo');
  } 
  
  catch (err) {
    throw new Error(err);
  }

});

const snapshot_all_portfolios = asyncHandler(async (req, res) => {
	try {
		const every_sleeper = await pool.query("SELECT * FROM all_sleeper_portfolios");

		let now = new Date();
		let nowUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
		let snapshot_date = nowUTC.toISOString();

		every_sleeper.forEach((x) => {
			let invested_sleep_value = 0.0;
			x.portfolio_picks_of_sleeper_ids.forEach((x) => {
				const single_sleep_value = await pool.query("SELECT * FROM all_speeper_logs WHERE sleeper_id = $1 ORDER BY log_timestamp DESC FETCH FIRST ROW ONLY", [x])
				invested_sleep_value = invested_sleep_value + parseFloat(single_sleep_value); 
        // not sure if return string is or not
			});
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
  snapshot_all_portfolios,
};