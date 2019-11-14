'use strict';

// Express
const express = require('express');

// Constants
const PORT = process.env.PORT || '8080';
const K8S_NAMESPACE = process.env.K8S_NAMESPACE || 'default';
const K8S_DEPLOYMENT_NAME = process.env.K8S_DEPLOYMENT_NAME || 'shopping';

// k8s
const { Client, KubeConfig } = require('kubernetes-client');
const Request = require('kubernetes-client/backends/request');

function initKubeClient() {
    const kubeconfig = new KubeConfig();
  
    if (process.env.NODE_ENV === 'production') {
      kubeconfig.loadFromCluster();
    } else {
      kubeconfig.loadFromDefault();
    }
  
    const backend = new Request({ kubeconfig });
    const client = new Client({ backend, version: '1.11' });
  
    return client;
}

const kubeclient = initKubeClient();
console.log(kubeclient);

// App
const app = express();
app.get('/', (req, res) => {
    console.log(`K8S_NAMESPACE: ${K8S_NAMESPACE}`);
    kubeclient.apis.apps.v1.namespaces(K8S_NAMESPACE).deployments.get().then(function(deployment) {
        console.log('Deployment:', deployment);
        res.send(deployment);
    }).catch(function(error) {
        res.status(500);
        res.send(error.message);
    });
});

app.listen(PORT);
console.log(`Running on ${PORT}`);