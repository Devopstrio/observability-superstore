resource "helm_release" "tempo" {
  name       = "tempo"
  repository = "https://grafana.github.io/helm-charts"
  chart      = "tempo-distributed"
  namespace  = "monitoring"

  set {
    name  = "storage.trace.backend"
    value = "s3"
  }

  set {
    name  = "storage.trace.s3.bucket"
    value = "obs-tempo-traces-bucket"
  }
}
