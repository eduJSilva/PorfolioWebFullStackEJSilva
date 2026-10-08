package com.portfolio.EduSilva;

import com.portfolio.EduSilva.config.AdminBootstrap;
import com.portfolio.EduSilva.model.authapp.Role;
import com.portfolio.EduSilva.model.authapp.RoleName;
import com.portfolio.EduSilva.model.authapp.User;
import com.portfolio.EduSilva.repository.RoleRepository;
import com.portfolio.EduSilva.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(properties = "app.admin.email=Dueno@Portfolio.test")
@Transactional
class AdminBootstrapTests {

    @Autowired
    private AdminBootstrap adminBootstrap;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    private Role role(RoleName name) {
        return roleRepository.save(new Role(name));
    }

    @Test
    void asignaRolAdminAlUsuarioConfigurado() {
        Role user = role(RoleName.ROLE_USER);
        role(RoleName.ROLE_ADMIN);

        User dueno = new User();
        dueno.setEmail("dueno@portfolio.test");
        dueno.setPassword("x");
        dueno.setActive(true);
        dueno.setEmailVerified(true);
        dueno.addRole(user);
        userRepository.save(dueno);

        adminBootstrap.run(null);
        adminBootstrap.run(null); // idempotente

        User actualizado = userRepository.findByEmail("dueno@portfolio.test").orElseThrow();
        assertThat(actualizado.getRoles()).extracting(Role::getRole)
                .containsExactlyInAnyOrder(RoleName.ROLE_USER, RoleName.ROLE_ADMIN);
    }
}
