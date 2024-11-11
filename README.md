# GCP Cloud Credentials Sample

This is a sample app to show how you can have your applications interact with the cloud resources you create on GCP using the Cloud Credentials feature in Okteto.

## Prerequisites

- Access to a GKE cluster with Workload Identity enabled with Okteto Installed. 
- Cloud Credentials with GCP enabled for your Okteto instance.
- Grant the [Okteto Kubernetes service account](https://www.okteto.com/docs/admin/cloud-credentials/gcp-cloud-credentials/#step-3-create-the-iam-policy-binding) used for Workload Identity the following permissions: `Storage Admin`, `Service Account Admin`, `Project IAM Admin`

## How the Demo Works

1. Create a GCP Bucket:

    A Google Cloud Storage bucket is created using the Workload Identity set up with Okteto’s Cloud Credentials feature. This allows the Okteto instance to interact with GCP securely without storing static credentials.

1. Set Up a Google Cloud Service Account:

    We create a Google Cloud Service Account (GCP SA) with the necessary permissions to read and write data to the bucket.

1. Link GCP Service Account to Kubernetes Service Account:

    The Google Cloud Service Account is linked with a Kubernetes Service Account (K8s SA) that will be created when we deploy the Helm chart for the app. 

1. Deploy the Application:

    We deploy the app using a Helm chart. The app runs in a Kubernetes pod that uses the Kubernetes Service Account that we linked to the GCP service account in the previous step.

1. Behind the Scenes:

    When the app tries to access the GCP bucket, it automatically uses the Kubernetes Service Account associated with its pod. The Kubernetes Service Account is linked to the Google Cloud Service Account, which has the necessary permissions, allowing the app to securely access the GCP bucket.

