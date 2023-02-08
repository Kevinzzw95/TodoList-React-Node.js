package com.web.daily_keeper.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.web.daily_keeper.entity.Tag;
import com.web.daily_keeper.entity.Task;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {

    @Value("${allowed.origins}")
    private String[] theAllowedOrigins;

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {


        config.exposeIdsFor(Task.class);
        config.exposeIdsFor(Tag.class);

        cors.addMapping(config.getBasePath() + "/**").allowedOrigins(theAllowedOrigins);


    }

}
