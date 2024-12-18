package database

import (
	"context"
	"database/sql"
	"time"
)

func New(addr string, maxOpenConns, maxIdleCons int, maxIdleTime string) (*sql.DB, error) {
	db, err := sql.Open("postgres", addr)
	if err != nil {
		return nil, err
	}

	db.SetMaxOpenConns(maxOpenConns)
	db.SetMaxIdleConns(maxIdleCons)

	duration, err := time.ParseDuration(maxIdleTime)
	if err != nil {
		return nil, err
	}
	db.SetConnMaxIdleTime(duration)

	ctx, cancle := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancle()

	if err = db.PingContext(ctx); err != nil {
		return nil, err
	}

	return db, nil
}
