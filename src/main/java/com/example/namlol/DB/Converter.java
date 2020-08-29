package com.example.namlol.DB;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class Converter {

    @Bean
    private ModelMapper modelMapper(){
        return new ModelMapper();
    }
}
