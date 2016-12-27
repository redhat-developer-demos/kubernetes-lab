/*
 * JBoss, Home of Professional Open Source
 * Copyright 2015, Red Hat, Inc. and/or its affiliates, and individual
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
package com.redhat.developers.guestbook;

import org.wildfly.swarm.container.Container;
import org.wildfly.swarm.datasources.DatasourcesFraction;

public class Main {

	public static void main(String[] args) throws Exception {
		Container container = new Container();

		container.fraction(new DatasourcesFraction().jdbcDriver("com.mysql", (d) -> {
			d.driverClassName("com.mysql.jdbc.Driver");
			d.xaDatasourceClass("com.mysql.jdbc.jdbc2.optional.MysqlXADataSource");
			d.driverModuleName("com.mysql");
		}).dataSource("MySQLDS", (ds) -> {
			ds.driverName("com.mysql");
			ds.connectionUrl(System.getenv().getOrDefault("JDBC_URL", "jdbc:mysql://mysql:3306/guestbook?useSSL=false&autoReconnect=true"));
			ds.userName(System.getenv().getOrDefault("DATASOURCE_USERNAME", "myuser"));
			ds.password(System.getenv().getOrDefault("DATASOURCE_PASSWORD", "mypassword"));
			ds.backgroundValidation(true);
			ds.validConnectionCheckerClassName("org.jboss.jca.adapters.jdbc.extensions.mysql.MySQLValidConnectionChecker");
			ds.validateOnMatch(true);
			ds.checkValidConnectionSql("SELECT 1");
		}));

		// Start the container and deploy the default war
		container.start().deploy();
	}

}
