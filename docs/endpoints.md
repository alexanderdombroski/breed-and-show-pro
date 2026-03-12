# Endpoints

## Pig

- GET /pigs
- GET /api/pigs/:id
- POST /pigs
- PUT /pigs/:id
- DELETE /pigs/:id

- POST /api/pigs/:id/breeding
- POST /api/pigs/:id/farrowing
- POST /api/pigs/:id/weaning
- POST /api/pigs/:id/heat-date

- PATCH /api/pigs/:id/archive

### Herd Endpoint

- GET /api/stats/herd-summary
- GET /api/stats/herd-summary/bred
- GET /api/stats/herd-summary/farrowed
- GET /api/stats/herd-summary/open

### Litters Endpoints

- GET /api/litters
- POST /api/litters

- GET /api/litters/:id
- PUT /api/litters/:id
- DELETE /api/litters/:id

### Tasks Endpoints

- GET /api/tasks
- POST /api/tasks

- GET /api/tasks/:id
- PUT /api/tasks/:id
- PATCH /api/tasks/:id/complete
- DELETE /api/tasks/:id

### Upcoming dates Endpoints

- GET /api/upcoming-dates

### Breeding Calculator Endpoint

- POST /api/breeding-calculator

## Users

- POST /register (handled via OAuth)
- POST /login (handled via OAuth)
