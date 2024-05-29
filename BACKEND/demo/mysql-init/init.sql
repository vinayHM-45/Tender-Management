CREATE USER 'tender'@'%' IDENTIFIED BY 'Vinay@2002';
GRANT ALL PRIVILEGES ON tender_managment.* TO 'tender'@'%';
FLUSH PRIVILEGES;