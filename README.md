# Backend GCP Services

## API Gateway

The API Gateway controls access to the backend functions and handles authentication.

To deploy a new version of the API, run this command:

```shell
gcloud api-gateway api-configs create realtime-locations --project campus-shuttle-monitor --api realtime-locations --openapi-spec realtime-location.yaml --backend-auth-service-account realtime-location-gateway@campus-shuttle-monitor.iam.gserviceaccount.com
```

## Functions

Functions are snippets of code that run in response to HTTP(S) queries.

To deploy a new Function, ensure you are in the `functions` module and run this command:

```shell
gcloud functions deploy shuttle --runtime nodejs14 --trigger-http --project campus-shuttle-monitor
```

## Troubleshooting

Ensure you are logged in with a Google account that has permission to deploy Functions or API Gateways.
