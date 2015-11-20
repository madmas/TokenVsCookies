import de.mynethome.jwtDemo.api.ApiHandler
import de.mynethome.jwtDemo.auth.AuthenticationService
import de.mynethome.jwtDemo.auth.JwtTokenHandler
import de.mynethome.jwtDemo.auth.JwtTokenService
import de.mynethome.jwtDemo.auth.LoginHandler
import ratpack.groovy.template.MarkupTemplateModule
import ratpack.handling.Chain

import static ratpack.groovy.Groovy.groovyMarkupTemplate
import static ratpack.groovy.Groovy.ratpack

ratpack {
    bindings {
        module MarkupTemplateModule
        bind AuthenticationService
        bind JwtTokenService
        bind JwtTokenHandler
        bind LoginHandler

        bind ApiHandler
    }

    handlers {
        post('sessions/create', LoginHandler)
        prefix('api'){ Chain apiChain ->
            apiChain.all(JwtTokenHandler)
            apiChain.get(ApiHandler)
        }
        get {
            render groovyMarkupTemplate("index.gtpl", title: "My Ratpack App")
        }

        files { dir "public" }
    }
}
