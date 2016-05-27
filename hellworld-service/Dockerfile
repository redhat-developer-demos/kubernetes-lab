FROM fabric8/java-jboss-openjdk8-jdk:1.0.10

ENV JAVA_APP_JAR helloworld-service-fat.jar
ENV AB_JOLOKIA_OFF true

ADD target/helloworld-service-fat.jar /app/
ADD config.json /app/

EXPOSE 8080
CMD []

ENTRYPOINT ["java", "-jar", "/app/helloworld-service-fat.jar"]

