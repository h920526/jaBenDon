package test.base;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.web.client.RestTemplate;

@ContextConfiguration("/spring-test.xml")
public abstract class BaseRestService {

	@Autowired
	public RestTemplate restTemplate;

	@Value("${rest.baseurl}")
	public String baseUrl;

}