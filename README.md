## Setup

### Running Development Environment

```bash
docker-compose up --build
```

This command must be run every time a library is changed or a new package is installed

To see individual logs from each service, get container id from docker ps and use docker logs

```bash
docker ps
docker logs <containerId>
```

To access the shell inside a container:

```bash
docker exec -it <containerId> sh
```

### Running Local Kubernetes Cluster

First, build images inside minikube. To access minikube docker instance, use eval command

```bash
minikube start --driver=virtualbox
eval $(minikube docker-env)
docker build -f <pathToDockerfile> .  -t <tag>
```

Update the k8s folder with the tag of the image created and run kubectl apply to run the cluster

```bash
kubectl apply k8s/
```

To shut down cluster, use kubectl delete

```bash
kubectl delete k8s/
```

## Adding New files to the repo

Always use nest-cli to add any files to the repo.

```bash
nest generate <schematicType> <fileName> <filePath>
```

Some schematic types are:

- application (for new microservice)
- controller (for apis)
- service (for business logic)
- module (for code grouping)
- library (for reusable code)

For help on the cli:

```bash
nest --help
nest generate --help
```

Ensure the setup for following is done in any new microservice:

- Swagger
- NATS
- Required environment variables (in separate keys.ts file)
- Global validation pipe setup
- Helmet Middleware (api security)

## Accessing Docs and SwaggerUI

Use npm run docs to see the auto-generated docs

```bash
npm run docs
```

Visit localhost/api to see the SwaggerUI and interact with the endpoints

## Coding practices for Nest.JS

- Always create typescript interfaces as a class in a separate file with the extension .dto.ts (to support validation, swagger, other add-ons)
- Write all the business logic in services, use minimal code in controllers
