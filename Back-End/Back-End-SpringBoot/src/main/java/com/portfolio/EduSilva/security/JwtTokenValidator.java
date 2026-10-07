package com.portfolio.EduSilva.security;

import com.portfolio.EduSilva.cache.LoggedOutJwtTokenCache;
import com.portfolio.EduSilva.event.OnUserLogoutSuccessEvent;
import com.portfolio.EduSilva.exception.InvalidTokenRequestException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SecurityException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenValidator {

    private static final Logger logger = LoggerFactory.getLogger(JwtTokenValidator.class);
    private final JwtTokenProvider tokenProvider;
    private final LoggedOutJwtTokenCache loggedOutTokenCache;

    public JwtTokenValidator(JwtTokenProvider tokenProvider, LoggedOutJwtTokenCache loggedOutTokenCache) {
        this.tokenProvider = tokenProvider;
        this.loggedOutTokenCache = loggedOutTokenCache;
    }

    /**
     * Validates if a token satisfies the following properties
     * - Signature is not malformed
     * - Token hasn't expired
     * - Token is supported
     * - Token has not recently been logged out.
     */
    public boolean validateToken(String authToken) {
        try {
            tokenProvider.parseClaims(authToken);

        } catch (SecurityException ex) {
            logger.error("Invalid JWT signature");
            throw new InvalidTokenRequestException("JWT", authToken, "Incorrect signature");

        } catch (MalformedJwtException ex) {
            logger.error("Invalid JWT token");
            throw new InvalidTokenRequestException("JWT", authToken, "Malformed jwt token");

        } catch (ExpiredJwtException ex) {
            logger.error("Expired JWT token");
            throw new InvalidTokenRequestException("JWT", authToken, "Token expired. Refresh required");

        } catch (UnsupportedJwtException ex) {
            logger.error("Unsupported JWT token");
            throw new InvalidTokenRequestException("JWT", authToken, "Unsupported JWT token");

        } catch (IllegalArgumentException ex) {
            logger.error("JWT claims string is empty.");
            throw new InvalidTokenRequestException("JWT", authToken, "Illegal argument token");
        }
        validateTokenIsNotForALoggedOutDevice(authToken);
        return true;
    }

    private void validateTokenIsNotForALoggedOutDevice(String authToken) {
        OnUserLogoutSuccessEvent previouslyLoggedOutEvent = loggedOutTokenCache.getLogoutEventForToken(authToken);
        if (previouslyLoggedOutEvent != null) {
            String userEmail = previouslyLoggedOutEvent.getUserEmail();
            Date logoutEventDate = previouslyLoggedOutEvent.getEventTime();
            String errorMessage = String.format("Token corresponds to an already logged out user [%s] at [%s]. Please login again", userEmail, logoutEventDate);
            throw new InvalidTokenRequestException("JWT", authToken, errorMessage);
        }
    }
}
