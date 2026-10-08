package com.portfolio.EduSilva.config;

import com.portfolio.EduSilva.model.authapp.Role;
import com.portfolio.EduSilva.model.authapp.RoleName;
import com.portfolio.EduSilva.model.authapp.User;
import com.portfolio.EduSilva.repository.RoleRepository;
import com.portfolio.EduSilva.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Asegura que el usuario indicado en APP_ADMIN_EMAIL tenga el rol ADMIN al arrancar la API.
 * Sirve para recuperar el acceso de administrador sin entrar a la base de datos.
 * Si la variable está vacía no hace nada. Nunca crea usuarios ni cambia contraseñas.
 */
@Component
public class AdminBootstrap implements ApplicationRunner {

    private static final Logger logger = LoggerFactory.getLogger(AdminBootstrap.class);

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final String adminEmail;

    public AdminBootstrap(UserRepository userRepository, RoleRepository roleRepository,
                          @Value("${app.admin.email:}") String adminEmail) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.adminEmail = adminEmail == null ? "" : adminEmail.trim();
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        if (adminEmail.isEmpty()) {
            return;
        }
        Optional<User> user = userRepository.findByEmailIgnoreCase(adminEmail);
        if (user.isEmpty()) {
            logger.warn("APP_ADMIN_EMAIL: no existe un usuario con el email {}", adminEmail);
            return;
        }
        Optional<Role> adminRole = roleRepository.findAll().stream()
                .filter(Role::isAdminRole)
                .findFirst();
        if (adminRole.isEmpty()) {
            logger.warn("APP_ADMIN_EMAIL: la tabla de roles no tiene {}", RoleName.ROLE_ADMIN);
            return;
        }
        User admin = user.get();
        if (admin.getRoles().stream().anyMatch(Role::isAdminRole)) {
            logger.info("APP_ADMIN_EMAIL: {} ya es administrador", adminEmail);
            return;
        }
        admin.addRole(adminRole.get());
        userRepository.save(admin);
        logger.info("APP_ADMIN_EMAIL: se asignó el rol ADMIN a {}", adminEmail);
    }
}
