resource "helm_release" "kafka" {
  name       = "kafka"
  repository = "https://charts.bitnami.com/bitnami"
  chart      = "kafka"
  namespace  = "observability-pipeline"
  create_namespace = true

  set {
    name  = "replicaCount"
    value = "3"
  }

  set {
    name  = "zookeeper.replicaCount"
    value = "3"
  }

  set {
    name  = "persistence.size"
    value = "100Gi"
  }
}
