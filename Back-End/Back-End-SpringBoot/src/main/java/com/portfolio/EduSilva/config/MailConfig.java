package com.portfolio.EduSilva.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.ui.freemarker.FreeMarkerConfigurationFactoryBean;

/**
 * El JavaMailSender lo autoconfigura Spring Boot a partir de las propiedades spring.mail.*
 * (ver application.properties / variables de entorno MAIL_*).
 */
@Configuration
@EnableAsync
public class MailConfig {

    @Bean
    @Primary
    public FreeMarkerConfigurationFactoryBean getFreeMarkerConfiguration() {
        FreeMarkerConfigurationFactoryBean bean = new FreeMarkerConfigurationFactoryBean();
        bean.setTemplateLoaderPath("classpath:/templates/");
        return bean;
    }
}
