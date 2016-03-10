package de.mynethome.jwtDemo.auth
import de.mynethome.jwtDemo.User
import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jws
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm

/**
 * This is just an example, for production environment you most probably want to use
 * http://ratpack.io/manual/current/pac4j.html#pac4j
 */
class JwtTokenService {

    //DEMO purpose only, do not hard code!
    public static final String SIGNING_KEY = "dfkhxb apoadfv sjhdfsgb lskdhf saldf";

    String createToken(User user) {
        String result = Jwts.builder()
                            .setClaims([userId: user.userId, cn: user.userName, email: user.email])
                            .signWith(SignatureAlgorithm.HS512, SIGNING_KEY)
                            .compact()
        return result
    }

    Map<String, Object> verifyToken(String token) {
            Jws<Claims> result = Jwts.parser().setSigningKey(SIGNING_KEY).parseClaimsJws(token.replace("Bearer ", ""))
            result.body
    }
}
