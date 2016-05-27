package com.redhat.developers.helloworld;

import java.util.Map;
import java.util.Objects;
import java.util.Properties;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.json.JsonObject;

/**
 * Just some configuration utilities.
 *
 * @author <a href="http://escoffier.me">Clement Escoffier</a>
 */
public class ApplicationConfiguration {

  /**
   * Creates a Json Object from the environment variables and system properties.
   * The system properties override the environment variables.
   *
   * @return the json object
   */
  public static JsonObject load() {
    return putAll(
        putAll(
            new JsonObject(), System.getenv()), System.getProperties()
    );
  }

  /**
   * Creates a Json Object from the given configuration, the environment variables
   * and system properties.
   * The system properties override the environment variables that override the given json object.
   * <p>
   * This method is intended to be used with {@link AbstractVerticle#config()}:
   * {@code JsonObject json = ApplicationConfiguration.load(config())}
   *
   * @param json the json object
   * @return
   */
  public static JsonObject load(JsonObject json) {
    return putAll(
        putAll(
            json, System.getenv()), System.getProperties()
    );
  }


  /**
   * Creates a new json object containing the content of the given json object merged with
   * the given Map. The content of the Map overrides the content of the given json object.
   *
   * @param conf  the configuration
   * @param props the map
   * @return the json object
   */
  private static JsonObject putAll(JsonObject conf, Map<String, String> props) {
    Objects.requireNonNull(conf);
    Objects.requireNonNull(props);
    JsonObject json = conf.copy();
    props.entrySet().stream().forEach(entry -> put(json, entry.getKey(), entry.getValue()));
    return json;
  }

  /**
   * Creates a new json object containing the content of the given json object merged with
   * the given Properties. The content of the Properties overrides the content of the given
   * json object.
   *
   * @param conf  the configuration
   * @param props the map
   * @return the json object
   */
  private static JsonObject putAll(JsonObject conf, Properties props) {
    Objects.requireNonNull(conf);
    Objects.requireNonNull(props);
    JsonObject json = conf.copy();
    props.stringPropertyNames().stream()
        .forEach(name -> put(json, name, props.getProperty(name)));
    return json;
  }

  private static void put(JsonObject json, String name, String value) {
    Objects.requireNonNull(value);
    Boolean bool = asBoolean(value);
    if (bool != null) {
      json.put(name, bool);
    } else {
      Double integer = asNumber(value);
      if (integer != null) {
        json.put(name, integer);
      } else {
        json.put(name, value);
      }
    }
  }


  private static Double asNumber(String s) {
    try {
      return Double.parseDouble(s);
    } catch (NumberFormatException nfe) {
      return null;
    }
  }

  private static Boolean asBoolean(String s) {
    if (s.equalsIgnoreCase("true")) {
      return Boolean.TRUE;
    } else if (s.equalsIgnoreCase("false")) {
      return Boolean.FALSE;
    } else {
      return null;
    }
  }

}