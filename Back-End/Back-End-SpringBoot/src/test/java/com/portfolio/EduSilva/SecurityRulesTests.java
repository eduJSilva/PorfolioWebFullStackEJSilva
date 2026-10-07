package com.portfolio.EduSilva;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class SecurityRulesTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void lecturaDelPortfolioEsPublica() throws Exception {
        mockMvc.perform(get("/ver/personas")).andExpect(status().isOk());
        mockMvc.perform(get("/list/fotos")).andExpect(status().isOk());
    }

    @Test
    void escrituraSinTokenEsRechazada() throws Exception {
        mockMvc.perform(post("/new/skill").contentType(MediaType.APPLICATION_JSON).content("{}"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(roles = "USER")
    void escrituraConRolUserEsProhibida() throws Exception {
        mockMvc.perform(post("/new/skill").contentType(MediaType.APPLICATION_JSON).content("{}"))
                .andExpect(status().isForbidden());
    }

    @Test
    void listadoDeTokensDeReseteoYaNoExiste() throws Exception {
        mockMvc.perform(get("/api/user/password/list/token")).andExpect(status().isUnauthorized());
    }
}
