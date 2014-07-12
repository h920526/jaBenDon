package test.base;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

import test.service.order.OrderTest;

@RunWith(Suite.class)
@SuiteClasses({ OrderTest.class })
public class BaseTestSuite {
}