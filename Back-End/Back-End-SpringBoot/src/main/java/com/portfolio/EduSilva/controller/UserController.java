
package com.portfolio.EduSilva.controller;

import com.portfolio.EduSilva.annotation.CurrentUser;
import com.portfolio.EduSilva.event.OnUserAccountChangeEvent;
import com.portfolio.EduSilva.event.OnUserLogoutSuccessEvent;
import com.portfolio.EduSilva.exception.UpdatePasswordException;
import com.portfolio.EduSilva.model.Persona;
import com.portfolio.EduSilva.model.authapp.CustomUserDetails;
import com.portfolio.EduSilva.model.authapp.PasswordResetToken;
import com.portfolio.EduSilva.model.authapp.User;
import com.portfolio.EduSilva.model.authapp.payload.ApiResponse;
import com.portfolio.EduSilva.model.authapp.payload.LogOutRequest;
import com.portfolio.EduSilva.model.authapp.payload.UpdatePasswordRequest;
import com.portfolio.EduSilva.service.authService.AuthService;
import com.portfolio.EduSilva.service.authService.MailService;
import com.portfolio.EduSilva.service.authService.PasswordResetTokenService;
import com.portfolio.EduSilva.service.authService.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import java.io.IOException;
import java.util.List;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.ExceptionHandler;


@RestController
@RequestMapping("/api/user")
@Tag(name = "User Rest API", description = "Defines endpoints for the logged in user. It's secured by default")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final AuthService authService;

    private final UserService userService;

    private final ApplicationEventPublisher applicationEventPublisher;
    
    private final PasswordResetTokenService passTokenService;
    
    private final MailService mailService;

    @Autowired
    public UserController(AuthService authService, UserService userService, ApplicationEventPublisher applicationEventPublisher, PasswordResetTokenService passTokenService, MailService mailService) {
        this.authService = authService;
        this.userService = userService;
        this.applicationEventPublisher = applicationEventPublisher;
        this.passTokenService = passTokenService;
        this.mailService = mailService;
    }

    /**
     * Gets the current user profile of the logged in user
     */
    @GetMapping("/me")
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "Returns the current user profile")
    public ResponseEntity getUserProfile(@CurrentUser CustomUserDetails currentUser) {
        logger.info(currentUser.getEmail() + " has role: " + currentUser.getRoles());
        return ResponseEntity.ok("acercadelUsuario");
    }

    /**
     * Returns all admins in the system. Requires Admin access
     */
    @GetMapping("/admins")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Returns the list of configured admins. Requires ADMIN Access")
    public ResponseEntity getAllAdmins() {
        logger.info("Inside secured resource with admin");
        return ResponseEntity.ok("acercadelAdministrador");
    }

    /**
     * Updates the password of the current logged in user
     */
    @PostMapping("/password/update")
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "Allows the user to change his password once logged in by supplying the correct current " +
            "password")
    public ResponseEntity updateUserPassword(@CurrentUser CustomUserDetails customUserDetails,
                                             @Parameter(description = "The UpdatePasswordRequest payload") @Valid @RequestBody UpdatePasswordRequest updatePasswordRequest) {

        return authService.updatePassword(customUserDetails, updatePasswordRequest)
                .map(updatedUser -> {
                    OnUserAccountChangeEvent onUserPasswordChangeEvent = new OnUserAccountChangeEvent(updatedUser, "Update Password", "Change successful");
                    applicationEventPublisher.publishEvent(onUserPasswordChangeEvent);
                    return ResponseEntity.ok(new ApiResponse(true, "Password changed successfully"));
                })
                .orElseThrow(() -> new UpdatePasswordException("--Empty--", "No such user present."));
    }

    /**
     * Log the user out from the app/device. Release the refresh token associated with the
     * user device.
     */
    @PostMapping("/logout")
    @Operation(summary = "Logs the specified user device and clears the refresh tokens associated with it")
    public ResponseEntity logoutUser(@CurrentUser CustomUserDetails customUserDetails,
                                     @Parameter(description = "The LogOutRequest payload") @Valid @RequestBody LogOutRequest logOutRequest,  HttpServletResponse response) throws IOException {
        userService.logoutUser(customUserDetails, logOutRequest);
        Object credentials = SecurityContextHolder.getContext().getAuthentication().getCredentials();

        OnUserLogoutSuccessEvent logoutSuccessEvent = new OnUserLogoutSuccessEvent(customUserDetails.getEmail(), credentials.toString(), logOutRequest);
        applicationEventPublisher.publishEvent(logoutSuccessEvent);
        return ResponseEntity.ok(new ApiResponse(true, "Log out successful"));
    }
}
