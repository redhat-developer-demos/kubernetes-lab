/**
 * JBoss, Home of Professional Open Source
 * Copyright 2016, Red Hat, Inc. and/or its affiliates, and individual
 * contributors by the @authors tag. See the copyright.txt in the
 * distribution for a full listing of individual contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.redhat.developers.helloworld;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.text.StrSubstitutor;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.http.HttpMethod;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.CorsHandler;

public class HelloworldVerticle extends AbstractVerticle {

	public static final String version = "1.0";

	@Override
	public void start() throws Exception {
		Router router = Router.router(vertx);
		
		//Config CORS
		router.route().handler(CorsHandler.create("*")
	            .allowedMethod(HttpMethod.GET)
	            .allowedHeader("Content-Type"));
		
		// hello endpoint
		router.get("/api/hello/:name").handler(ctx -> {
			ctx.response().end(hello(ctx.request().getParam("name")));
		});
		vertx.createHttpServer().requestHandler(router::accept).listen(8080);
	}

	private String hello(String name) {
		String configGreeting = ApplicationConfiguration.load(config()).getString("GREETING");
		String greeting = configGreeting == null ? "Hello {name} from {hostname} with {version}" : configGreeting;
		Map<String, String> values = new HashMap<String, String>();
		values.put("name", name);
		values.put("hostname", System.getenv().getOrDefault("HOSTNAME", "unknown"));
		values.put("version", version);
		return new StrSubstitutor(values, "{", "}").replace(greeting);
	}

}
