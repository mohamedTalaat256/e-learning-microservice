package com.mtalaat.gatewayserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;


@SpringBootApplication
public class GatewayserverApplication {

    public static void main(String[] args) {
        SpringApplication.run(GatewayserverApplication.class, args);
    }
    @Bean
    public RouteLocator eLearningRouteConfig(RouteLocatorBuilder routeLocatorBuilder) {
        return routeLocatorBuilder.routes()

                .route(p -> p
                        .path("/eLearning/users/**")
                        .filters( f -> f.rewritePath("/eLearning/users/(?<segment>.*)","/${segment}")
                                .addResponseHeader("X-Response-Time", LocalDateTime.now().toString()))
                        .uri("lb://USERS"))

                .route(p -> p
                        .path("/eLearning/courses/**")
                        .filters( f -> f.rewritePath("/eLearning/courses/(?<segment>.*)","/${segment}")
                                .addResponseHeader("X-Response-Time", LocalDateTime.now().toString()))
                        .uri("lb://COURSES"))


                .route(p -> p
                        .path("/eLearning/lectures/**")
                        .filters( f -> f.rewritePath("/eLearning/lectures/(?<segment>.*)","/${segment}")
                                .addResponseHeader("X-Response-Time", LocalDateTime.now().toString()))
                        .uri("lb://LECTURES"))

                .route(p -> p
                        .path("/eLearning/messages/**")
                        .filters( f -> f.rewritePath("/eLearning/messages/(?<segment>.*)","/${segment}")
                                .addResponseHeader("X-Response-Time", LocalDateTime.now().toString()))
                        .uri("lb://MESSAGES"))

                .build();


    }


}