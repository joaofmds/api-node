variable "digitalocean_token" {
  description = "DigitalOcean API token"
  type        = string
}

variable "cluster_name" {
  description = "Name of the Kubernetes cluster"
  type        = string
}

variable "region" {
  description = "DigitalOcean region"
  type        = string
}

variable "node_pool" {
  description = "Configuration for the Kubernetes cluster node pool"
  type        = map
  default = {
    size      = "s-1vcpu-2gb"
    count     = 3
    disk_size = 25
  }
}

variable "min_nodes" {
  description = "Minimum number of cluster nodes for autoscaling"
  type        = number
  default     = 2
}

variable "max_nodes" {
  description = "Maximum number of cluster nodes for autoscaling"
  type        = number
  default     = 5
}
