package com.portfolio.EduSilva.security;

import com.portfolio.EduSilva.model.authapp.CustomUserDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtTokenProvider {

    private static final String AUTHORITIES_CLAIM = "authorities";
    private final SecretKey signingKey;
    private final long jwtExpirationInMs;

    public JwtTokenProvider(@Value("${app.jwt.secret}") String jwtSecret, @Value("${app.jwt.expiration}") long jwtExpirationInMs) {
        this.signingKey = buildSigningKey(jwtSecret);
        this.jwtExpirationInMs = jwtExpirationInMs;
    }

    /**
     * HS512 exige una clave de al menos 512 bits. Se deriva con SHA-512 a partir del secreto
     * configurado, de modo que cualquier valor de APP_JWT_SECRET produzca una clave válida.
     */
    static SecretKey buildSigningKey(String secret) {
        try {
            byte[] digest = MessageDigest.getInstance("SHA-512").digest(secret.getBytes(StandardCharsets.UTF_8));
            return Keys.hmacShaKeyFor(digest);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-512 no disponible", e);
        }
    }

    /**
     * Generates a token from a principal object. Embed the refresh token in the jwt
     * so that a new jwt can be created
     */
    public String generateToken(CustomUserDetails customUserDetails) {
        Instant expiryDate = Instant.now().plusMillis(jwtExpirationInMs);
        String authorities = getUserAuthorities(customUserDetails);
        return Jwts.builder()
                .subject(Long.toString(customUserDetails.getId()))
                .issuedAt(Date.from(Instant.now()))
                .expiration(Date.from(expiryDate))
                .claim(AUTHORITIES_CLAIM, authorities)
                .signWith(signingKey, Jwts.SIG.HS512)
                .compact();
    }

    /**
     * Generates a token from a principal object. Embed the refresh token in the jwt
     * so that a new jwt can be created
     */
    public String generateTokenFromUserId(Long userId) {
        Instant expiryDate = Instant.now().plusMillis(jwtExpirationInMs);
        return Jwts.builder()
                .subject(Long.toString(userId))
                .issuedAt(Date.from(Instant.now()))
                .expiration(Date.from(expiryDate))
                .signWith(signingKey, Jwts.SIG.HS512)
                .compact();
    }

    Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(signingKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     * Returns the user id encapsulated within the token
     */
    public Long getUserIdFromJWT(String token) {
        return Long.parseLong(parseClaims(token).getSubject());
    }

    /**
     * Returns the token expiration date encapsulated within the token
     */
    public Date getTokenExpiryFromJWT(String token) {
        return parseClaims(token).getExpiration();
    }

    /**
     * Return the jwt expiration for the client so that they can execute
     * the refresh token logic appropriately
     */
    public long getExpiryDuration() {
        return jwtExpirationInMs;
    }

    /**
     * Return the jwt authorities claim encapsulated within the token
     */
    public List<GrantedAuthority> getAuthoritiesFromJWT(String token) {
        Object authorities = parseClaims(token).get(AUTHORITIES_CLAIM);
        if (authorities == null) {
            return List.of();
        }
        return Arrays.stream(authorities.toString().split(","))
                .filter(a -> !a.isBlank())
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    /**
     * Gets the user authorities from the user details
     */
    private String getUserAuthorities(CustomUserDetails customUserDetails) {
        return customUserDetails
                .getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
    }
}
