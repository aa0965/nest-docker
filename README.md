- Running Development Environment (hot reloading support enabled):

\$ docker-compose up --build

- All logs will show up in a single terminal, to see individual logs:

(see individual docker containers, get container id)
\$ docker ps
\$ docker logs [containerId]

- To access shell inside a container:

\$ docker exec -it [containerId] sh

- Running Kubernetes local cluster

\$ minikube start --driver=virtualbox
\$ kubectl apply k8s/

- Adding new files to the project (use nest cli):

\$ nest generate [schematicType][name] [path]

- Some schematic types:

  - application (for new microservice)
  - controller (for apis)
  - service (for business logic)
  - module (for grouping functionalities)
  - library (for re-usable code)

- Use \$ nest --help for cli help
