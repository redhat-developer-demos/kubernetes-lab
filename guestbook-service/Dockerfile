FROM fabric8/java-jboss-openjdk8-jdk:1.0.10

ENV JAVA_APP_JAR guestbook-service-swarm.jar
ENV AB_JOLOKIA_OFF true

EXPOSE 8080

ADD target/guestbook-service-swarm.jar /app/