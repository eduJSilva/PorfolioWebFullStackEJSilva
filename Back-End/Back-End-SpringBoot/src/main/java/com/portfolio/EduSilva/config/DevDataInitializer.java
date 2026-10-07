package com.portfolio.EduSilva.config;

import com.portfolio.EduSilva.model.authapp.User;
import com.portfolio.EduSilva.repository.RoleRepository;
import com.portfolio.EduSilva.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;

/**
 * Crea un usuario administrador para trabajar en local con el perfil "dev".
 */
@Component
@Profile("dev")
public class DevDataInitializer implements ApplicationRunner {

    private static final Logger logger = LoggerFactory.getLogger(DevDataInitializer.class);

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final String adminEmail;
    private final String adminPassword;

    public DevDataInitializer(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder,
                              @Value("${app.dev.admin.email}") String adminEmail,
                              @Value("${app.dev.admin.password}") String adminPassword) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.adminEmail = adminEmail;
        this.adminPassword = adminPassword;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        if (userRepository.findByEmail(adminEmail).isPresent()) {
            return;
        }
        User admin = new User();
        admin.setEmail(adminEmail);
        admin.setUsername("admin");
        admin.setPassword(passwordEncoder.encode(adminPassword));
        admin.setActive(true);
        admin.setEmailVerified(true);
        admin.setRoles(new HashSet<>());
        admin.addRoles(new HashSet<>(roleRepository.findAll()));
        userRepository.save(admin);
        logger.info("Usuario admin de desarrollo creado: {} / {}", adminEmail, adminPassword);
    }
}
