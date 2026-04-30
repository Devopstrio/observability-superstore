resource "helm_release" "loki" {
  name       = "loki"
  repository = "https://grafana.github.io/helm-charts"
  chart      = "loki-distributed"
  namespace  = "monitoring"

  set {
    name  = "loki.schemaConfig.configs[0].store"
    value = "boltdb-shipper"
  }

  set {
    name  = "loki.storageConfig.aws.s3"
    value = "s3://us-east-1/obs-loki-logs-bucket"
  }
}
