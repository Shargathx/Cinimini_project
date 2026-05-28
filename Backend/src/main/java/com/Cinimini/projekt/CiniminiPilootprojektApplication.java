package com.Cinimini.projekt;

import com.Cinimini.projekt.entity.MediaElement;
import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CiniminiPilootprojektApplication {

    public static void main(String[] args) {
        SpringApplication.run(CiniminiPilootprojektApplication.class, args);
    }

    @PostConstruct
    public void debug() {
        System.out.println("MEDIA CLASS LOADED: " + MediaElement.class.getProtectionDomain().getCodeSource());
    }

}
