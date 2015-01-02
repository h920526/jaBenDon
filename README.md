jaBenDon
========================================

Lunch box ordering online website

Download: https://github.com/h920526/jaBenDon/releases

Requirements
========================================

1. JRE 7+
2. Apache tomcat 7+

Usage
========================================

1. Unzip jaBenDon.war as jaBenDon
2. Copy config.properties.sample at jaBenDon/WEB-INF as config.properties
3. Modify db.jdbcUrl at jaBenDon/WEB-INF/config.properties
4. Copy this jaBenDon folder into your tomcat webapps folder
5. Startup tomcat7

Feature
========================================

Random shop:

    1. Random a shop automatically and create an order on it
       when clicking the "Today bendon" botton and order doesn't exist
    2. Shop content are editable with a large image

Today bendon:

    1. Go to the shop of this order and show it's self when order exist
    2. Random shop and create an order on it when order doesn't exist and carousel sliding
    3. Create an order on it when order doesn't exist and carousel pausing

Order dialog: (show today order only)

    1. Show order if exists on page load
    2. Hide order dialog if user has hide it before
    3. Create recently records on it after creating a new order
