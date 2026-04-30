resource "helm_release" "prometheus" {
  name       = "prometheus"
  repository = "https://prometheus-community.github.io/helm-charts"
  chart      = "kube-prometheus-stack"
  namespace  = "monitoring"
  create_namespace = true

  set {
    name  = "prometheus.prometheusSpec.retention"
    value = "15d"
  }
  
  set {
    name  = "prometheus.prometheusSpec.remoteWrite[0].url"
    value = "http://mimir-nginx.monitoring.svc:80/api/v1/push"
  }
}
