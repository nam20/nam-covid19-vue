package com.example.namlol.Service;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.xml.bind.DatatypeConverter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtProvider {

    private final String secretKey;


    public JwtProvider(@Value("${security.jwt.token.secret-key}") String secretKey) {
        this.secretKey = secretKey;
    }

    public String createToken(String userId){

        Map<String,Object> headers = new HashMap<>();
        headers.put("typ","JWT");
        headers.put("alg","HS256");

        Claims claims = Jwts.claims().setSubject(userId);

        Date now = new Date();
        Date validity  = new Date(now.getTime() + 1000 * 60 * 60 * 3);

        return Jwts.builder()
                .setHeader(headers)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public boolean validateToken(String token){

        if(token == null || token.equals("") || token.substring(7).equals(""))
            return false;

        try{
            Jwts.parser().setSigningKey(DatatypeConverter.parseBase64Binary(secretKey)).parseClaimsJws(token.substring(7)).getBody();
        }catch (ExpiredJwtException e){
            return false;
        }catch (JwtException e){
            return false;
        }

        return true;
    }

    public String getUserId(String token) throws RuntimeException{
        try{
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token.substring(7));
            return claims.getBody().getSubject();
        }catch (Exception e){
            return null;
        }
    }


}
