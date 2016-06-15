package de.mynethome.jwtDemo.auth

import com.google.inject.Inject
import de.mynethome.jwtDemo.User
import groovy.util.logging.Slf4j
import io.jsonwebtoken.ExpiredJwtException
import io.jsonwebtoken.MalformedJwtException
import io.jsonwebtoken.SignatureException
import io.jsonwebtoken.UnsupportedJwtException
import io.netty.handler.codec.http.HttpResponseStatus
import ratpack.handling.Context
import ratpack.handling.Handler
import ratpack.registry.Registry

/**
 * This is just an example, for production environment you most probably want to use
 * http://ratpack.io/manual/current/pac4j.html#pac4j
 */
@Slf4j
class JwtTokenHandler implements Handler {
    private final JwtTokenService tokenService

    @Inject
    JwtTokenHandler(JwtTokenService tokenService) {
        this.tokenService = tokenService
    }

    @Override
    void handle(Context ctx) throws Exception {
        def token = ctx.request.headers.get(LoginHandler.AUTHORIZATION_TOKEN_HEADER)
        if (token == null) {
            ctx.response.status(HttpResponseStatus.UNAUTHORIZED.code())
            ctx.response.send()
            return
        }
        try {
            Map<String, Object> tokenBody = tokenService.verifyToken(token)
            def userObj = new User() {
                @Override
                String getUserId() {
                    tokenBody.userId
                }

                @Override
                String getUserName() {
                    tokenBody.cn
                }

                @Override
                String getEmail() {
                    tokenBody.email
                }
            }
            ctx.next(Registry.single(User.class, userObj))
        } catch (ExpiredJwtException | UnsupportedJwtException
                    | MalformedJwtException | SignatureException
                    | IllegalArgumentException e) {
            log.warn "Exception on token verification: " + e.getMessage()
            ctx.response.status(HttpResponseStatus.UNAUTHORIZED.code())
            ctx.response.send()
        }
    }

}
