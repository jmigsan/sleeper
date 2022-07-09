create table all_sleeper_logs (
	log_id uuid primary key,
	log_timestamp timestamptz,
	sleeper_id uuid,
	sleep_time time,
	awake_time time,
	minutes_slept smallint,
	sleep_value real
);

create table all_sleepers (
	sleeper_id uuid primary key,
	sleeper_name text,
	sleeper_cash_on_hand real
);

create table all_sleeper_portfolios (
	sleeper_id uuid primary key, 
	portfolio_picks_of_sleeper_ids uuid[]
);

create table all_sleeper_portfolio_logs (
	sleeper_id uuid primary key,
	snapshot_date date,
	snapshot_sleep_value real
);