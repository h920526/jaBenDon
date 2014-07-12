package factory.impl;

import java.util.Date;
import java.util.TimeZone;

import org.springframework.stereotype.Service;

import factory.DateFactory;

@Service
public class DateFactoryImpl implements DateFactory {

	private TimeZone systemTimeZone = TimeZone.getDefault();

	public DateFactoryImpl() {
		super();
	}

	@Override
	public Date nowUTCDate() {
		return new Date(System.currentTimeMillis()
				- systemTimeZone.getRawOffset());
	}

}
