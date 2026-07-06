package com.aquatrack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class AquatrackApplication {

	public static void main(String[] args) {
		SpringApplication.run(AquatrackApplication.class, args);
	}

}
