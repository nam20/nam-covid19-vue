package com.example.namlol.Config;

import com.example.namlol.Service.JwtProvider;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


public class AuthInterceptor implements HandlerInterceptor {
    private JwtProvider jwtProvider;

    public AuthInterceptor(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response, Object handler) throws Exception {
        String token = request.getHeader("Authorization");

        if(jwtProvider.validateToken(token)){

            return true;

        }else{
            response.setContentType("application/json");

            response.setCharacterEncoding("UTF-8");

            response.getWriter().write("{\"Auth\":\"FAIL\"}");

            return false;
        }



    }
}
