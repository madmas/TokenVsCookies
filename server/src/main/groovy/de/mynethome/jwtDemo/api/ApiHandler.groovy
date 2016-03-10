package de.mynethome.jwtDemo.api

import ratpack.groovy.handling.GroovyContext
import ratpack.groovy.handling.GroovyHandler

class ApiHandler extends GroovyHandler{
    @Override
    protected void handle(GroovyContext context) {
        context.render("Internal message for JavaLand 2016 :-)")
    }
}
