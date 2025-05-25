postgresql://admin:admin123@localhost:5432/skillshare_docker

docker run --rm --env DATABASE_URL="postgresql://admin:admin123@host.docker.internal:5432/skillshare" skillshare-migrate

docker run -d \
  --name docker-postgres \
  -e POSTGRES_USER=vikash \
  -e POSTGRES_PASSWORD=vikash@123 \
  -e POSTGRES_DB=skillshare \
  -p 5433:5432 \
  postgres:15


docker run -d --name skillshare-rest-api-1 -p 5000:5000 --env PORT="5000" --env DATABASE_URL="postgresql://admin:admin123@host.docker.internal:5432/skillshare" --env TASK_GRPC_PROTO="./shared/proto/" --env TASK_SERVICE_URI="host.docker.internal:4000" skillshare-rest-api


docker run -d --name skillshare-task-service-1 -p 4000:4000 --env PORT="4000" --env DATABASE_URL="postgresql://admin:admin123@host.docker.internal:5432/skillshare" --env TASK_GRPC_PROTO="./shared/proto/" skillshare-task-service


docker build -f task-service/Dockerfile -t skillshare-task-service .
