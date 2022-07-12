create table all_sleeper_logs (
	log_id uuid primary key,
	log_timestamp timestamptz,
	sleeper_id CHAR(28),
	sleep_time time,
	awake_time time,
	minutes_slept smallint,
	sleep_value real,
	sleep_date VARCHAR(11)
);

create table all_sleepers (
	sleeper_id CHAR(28) primary key,
	sleeper_name text,
	sleeper_cash_on_hand real
);

create table all_sleeper_portfolios (
	sleeper_id CHAR(28) primary key, 
	portfolio_picks_of_sleeper_ids uuid[]
);

create table all_sleeper_portfolio_logs (
	sleeper_id CHAR(28) primary key,
	snapshot_date date,
	snapshot_sleep_value real
);