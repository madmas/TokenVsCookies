package de.mynethome.jwtDemo.auth

import de.mynethome.jwtDemo.User
import groovy.util.logging.Slf4j
import io.netty.handler.codec.http.HttpResponseStatus
import ratpack.handling.Context
import ratpack.handling.Handler
import ratpack.jackson.Jackson

import javax.inject.Inject

@Slf4j
class LoginHandler implements Handler
{
    public static final String AUTHORIZATION_TOKEN_HEADER = 'authorization'

    private final AuthenticationService authService
    private final JwtTokenService jwtService

    @Inject
    LoginHandler(AuthenticationService authService, JwtTokenService jwtService)
    {
        this.authService = authService;
        this.jwtService = jwtService
    }

    @Override
    void handle(Context ctx) throws Exception
    {
        ctx.parse(Jackson.fromJson(Map)).then { data ->
            try
            {

                User user = authenticate(data)

                final String token = createToken(user)

                ctx.response.headers.set(AUTHORIZATION_TOKEN_HEADER, 'Bearer ' + token)
                ctx.render('{ "token": "' + token + '" }')
            } catch (Exception ex)
            {
                log.warn("Login failed: " + ex.getMessage())
                ctx.response.status(HttpResponseStatus.UNAUTHORIZED.code())
                ctx.response.send()
            }

        }
    }

    private User authenticate(Map<String, String> json)
    {
        final User user = authService.authenticate(json.username, json.password)
        user
    }

    private String createToken(User user)
    {
        jwtService.createToken(user)
    }
}

