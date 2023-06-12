terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
    }
  }
}

provider "digitalocean" {
  token = var.digitalocean_token
}

module "kubernetes_cluster" {
  source     = "<caminho_para_o_modulo_kubernetes_cluster>"
  cluster_name  = var.cluster_name
  region        = var.region
  node_pool     = var.node_pool
}

module "autoscaling" {
  source     = "<caminho_para_o_modulo_autoscaling>"
  cluster_id = module.kubernetes_cluster.cluster_id
  min_nodes  = var.min_nodes
  max_nodes  = var.max_nodes
}
