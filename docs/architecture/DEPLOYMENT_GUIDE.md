# Deployment Rehberi

## Ön Koşullar
- Docker ve Kubernetes kurulu
- PostgreSQL 14+
- Redis 7+

## Deployment Adımları

### 1. Docker Image Oluştur
```bash
docker build -t cerkesce-engine:latest .
```

### 2. Kubernetes Deploy
```bash
kubectl apply -f k8s/
```

### 3. Database Migration
```bash
npm run migrate
```

### 4. Monitoring Kurulumu
```bash
kubectl apply -f monitoring/
```

## Health Check
```bash
curl http://localhost:3000/health
```
