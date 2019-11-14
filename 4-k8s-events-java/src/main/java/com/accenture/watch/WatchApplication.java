package com.accenture.watch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.google.gson.reflect.TypeToken;

import io.kubernetes.client.apis.ExtensionsV1beta1Api;
import io.kubernetes.client.ApiClient;
import io.kubernetes.client.ApiException;
import io.kubernetes.client.Configuration;
import io.kubernetes.client.apis.CoreV1Api;
import io.kubernetes.client.models.V1Deployment;
import io.kubernetes.client.util.Config;
import io.kubernetes.client.util.Watch;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

@SpringBootApplication
public class WatchApplication {

	public static void main(String[] args) throws IOException, ApiException {
		SpringApplication.run(WatchApplication.class, args);

		while (true) {
			ApiClient client = Config.defaultClient();
			client.getHttpClient().setReadTimeout(180, TimeUnit.SECONDS);
			Configuration.setDefaultApiClient(client);

			ExtensionsV1beta1Api api = new ExtensionsV1beta1Api();

			Watch<V1Deployment> watch = null;

			try {
				watch = Watch.createWatch(
						client,
						api.listNamespacedDeploymentCall("myproject", null, null, null, null, null, 5, null, null, Boolean.TRUE, null, null),
						new TypeToken<Watch.Response<V1Deployment>>(){}.getType());

				for (Watch.Response<V1Deployment> item : watch) {
					System.out.printf("%s : %s, Replicas: %d%n", item.type, item.object.getMetadata().getName(), item.object.getSpec().getReplicas());
				}

			} catch(Exception e) {
				System.out.printf("Something happened: %s%n", e.getMessage());
			} finally {
				System.out.println("Closing watch connection");
				watch.close();
			}

			System.out.println("Trying again...");
		}

	}
}
