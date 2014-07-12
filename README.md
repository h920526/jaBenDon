jaBenDon
========================================

Lunch box ordering online website

Requirements
========================================

1. JRE 6+
2. Apache tomcat 7+

Usage
========================================

1. Unzip jaBenDon.war as jaBenDon
2. Copy config.properties.sample at jaBenDon/WEB-INF as config.properties
3. Modify it's db.jdbcUrl at jaBenDon/WEB-INF/config.properties
4. Copy this jaBenDon folder into your tomcat webapps folder
5. Startup tomcat7

Feature
========================================

Random shop:

    1. Clicking the "Today bendon" botton when carousel sliding and lunch box today aren't existing, random a shop automatically and create an order on it
    2. Shop content are editable with large image

Today bendon:

    1. if today order existed, go to the shop of this order and show it's self
    2. if today order doesn't existed and carousel sliding, random shop and create an order on it
    3. if today order doesn't existed and carousel pausing, create an order on it

Order dialog: (show today order only)

    1. show today order if existed on page load
    2. hide order dialog if user has hide it before
    3. if order detail nothing, create recently records on it
