package com.portfolio.EduSilva.security;

import com.portfolio.EduSilva.exception.InvalidTokenRequestException;
import com.portfolio.EduSilva.service.authService.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    private final String tokenRequestHeader;
    private final String tokenRequestHeaderPrefix;
    private final JwtTokenProvider jwtTokenProvider;
    private final JwtTokenValidator jwtTokenValidator;
    private final CustomUserDetailsService customUserDetailsService;
    private final HandlerExceptionResolver exceptionResolver;

    public JwtAuthenticationFilter(@Value("${app.jwt.header}") String tokenRequestHeader,
                                   @Value("${app.jwt.header.prefix}") String tokenRequestHeaderPrefix,
                                   JwtTokenProvider jwtTokenProvider,
                                   JwtTokenValidator jwtTokenValidator,
                                   CustomUserDetailsService customUserDetailsService,
                                   @Qualifier("handlerExceptionResolver") HandlerExceptionResolver exceptionResolver) {
        this.tokenRequestHeader = tokenRequestHeader;
        this.tokenRequestHeaderPrefix = tokenRequestHeaderPrefix;
        this.jwtTokenProvider = jwtTokenProvider;
        this.jwtTokenValidator = jwtTokenValidator;
        this.customUserDetailsService = customUserDetailsService;
        this.exceptionResolver = exceptionResolver;
    }

    /**
     * Filter the incoming request for a valid token in the request header
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = getJwtFromRequest(request);
            if (StringUtils.hasText(jwt) && jwtTokenValidator.validateToken(jwt)) {
                Long userId = jwtTokenProvider.getUserIdFromJWT(jwt);
                UserDetails userDetails = customUserDetailsService.loadUserById(userId);
                List<GrantedAuthority> authorities = jwtTokenProvider.getAuthoritiesFromJWT(jwt);
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, jwt, authorities);
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (InvalidTokenRequestException | UsernameNotFoundException ex) {
            log.warn("Failed to set user authentication in security context: {}", ex.getMessage());
            SecurityContextHolder.clearContext();
            // Delegamos en el @RestControllerAdvice para devolver el mismo formato de error que el resto de la API
            exceptionResolver.resolveException(request, response, null, ex);
            return;
        }
        filterChain.doFilter(request, response);
    }

    /**
     * Extract the token from the Authorization request header
     */
    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader(tokenRequestHeader);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(tokenRequestHeaderPrefix)) {
            return bearerToken.substring(tokenRequestHeaderPrefix.length()).trim();
        }
        return null;
    }
}
