package de.mynethome.jwtDemo.auth

import de.mynethome.jwtDemo.User

/**
 * Simple service to authenticate a hard coded user.
 */
class AuthenticationService {

    private final String VALID_USER = "markus"
    private final String VALID_PASSWORD = "baselone2018"

    User authenticate(String userName, String password) {

        //  Found user - test password
        if (userName.equals(VALID_USER) && password.equals(VALID_PASSWORD)) {
            return new User() {
                @Override
                String getUserId() {
                    userName
                }

                @Override
                String getUserName() {
                    "Markus Schlichting"
                }

                @Override
                String getEmail() {
                    "markus.schlichting@karakun.com"
                }
            }
        } else {
            throw new Exception("user '" + userName + "' authentication failed");
        }
    }
}
