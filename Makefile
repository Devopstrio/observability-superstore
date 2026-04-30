.PHONY: help build up down test lint migrate ingest correlate

help:
	@echo "Observability Superstore - Management Commands"
	@echo "----------------------------------------------"
	@echo "build              : Build all service containers"
	@echo "up                 : Start all services in the background"
	@echo "down               : Stop all services"
	@echo "test               : Run all tests (Unit + Correlation logic)"
	@echo "lint               : Run linting checks"
	@echo "migrate            : Run database migrations"
	@echo "ingest             : Simulate telemetry ingestion to Kafka"
	@echo "correlate          : Trigger the cross-telemetry correlation engine"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

test:
	pytest tests/api tests/pipelines
	npm test --prefix apps/web

lint:
	flake8 apps/api apps/worker
	npm run lint --prefix apps/web

migrate:
	docker-compose exec api alembic upgrade head

ingest:
	docker-compose exec api python scripts/ingest/simulate_telemetry.py

correlate:
	docker-compose exec api python scripts/correlate/trigger_correlation.py
