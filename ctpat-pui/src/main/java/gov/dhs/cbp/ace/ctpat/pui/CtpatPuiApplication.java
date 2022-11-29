package gov.dhs.cbp.ace.ctpat.pui;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = { "gov.dhs.cbp.ace.ctpat.pui" })
@SpringBootApplication
public class CtpatPuiApplication {
	public static void main(String[] args) {
		SpringApplication.run(CtpatPuiApplication.class, args);
	}
}
