package kookmin.capstone.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedOrigins("https://teaming.netlify.app/");
    }

    @Bean
    public WebClient fastApiClient() {
//        return WebClient.create("https://54.87.37.39");
        return WebClient.create("http://localhost:8081/api/v1");
    }
}