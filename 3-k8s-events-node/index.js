const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const watch = new k8s.Watch(kc);

// /api/extensions/v1beta1/namespaces/myproject/deployments
// /api/v1/namespaces/myproject/pods
// /apis/extensions/v1beta1/namespaces/myproject/deployments
const req = watch.watch('/apis/extensions/v1beta1/namespaces/myproject/deployments',
    // optional query parameters can go here.
    {},
    // callback is called for each received object.
    (type, obj) => {
        if (type === 'ADDED') {
            // tslint:disable-next-line:no-console
            console.log('new object:');
        } else if (type === 'MODIFIED') {
            // tslint:disable-next-line:no-console
            console.log('changed object:');
        } else if (type === 'DELETED') {
            // tslint:disable-next-line:no-console
            console.log('deleted object:');
        } else {
            // tslint:disable-next-line:no-console
            console.log('unknown type: ' + type);
        }
        // tslint:disable-next-line:no-console
        //console.log(obj);
        console.log(`Deployment Name: ${obj.metadata.name}, Replicas: ${obj.spec.replicas}`);
    },
    // done callback is called if the watch terminates normally
    (err) => {
        // tslint:disable-next-line:no-console
        console.log(err);
    });

// watch returns a request object which you can use to abort the watch.
//setTimeout(() => { req.abort(); }, 10 * 1000);



/*const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

k8sApi.listNamespacedPod('default').then((res) => {
    console.log(res.body);
});*/