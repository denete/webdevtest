start:
	docker-compose up -d

stop:
	docker-compose down --remove-orphans

restart: stop start

serve:
	docker-compose run node ng serve --host 0.0.0.0

node-install:
	docker-compose run node npm install $(package)
