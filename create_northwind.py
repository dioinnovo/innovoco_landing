#!/usr/bin/env python3
"""
Create Northwind database for demo purposes
"""

import sqlite3
import os

def create_northwind_database():
    """Create a Northwind database with sample data for demo purposes"""
    
    # Remove existing database
    if os.path.exists('northwind.db'):
        os.remove('northwind.db')
    
    conn = sqlite3.connect('northwind.db')
    cursor = conn.cursor()
    
    # Create Categories table
    cursor.execute("""
    CREATE TABLE Categories (
        CategoryID INTEGER PRIMARY KEY,
        CategoryName VARCHAR(15) NOT NULL,
        Description TEXT
    )
    """)
    
    # Create Suppliers table
    cursor.execute("""
    CREATE TABLE Suppliers (
        SupplierID INTEGER PRIMARY KEY,
        CompanyName VARCHAR(40) NOT NULL,
        ContactName VARCHAR(30),
        ContactTitle VARCHAR(30),
        Address VARCHAR(60),
        City VARCHAR(15),
        Region VARCHAR(15),
        PostalCode VARCHAR(10),
        Country VARCHAR(15),
        Phone VARCHAR(24),
        Fax VARCHAR(24)
    )
    """)
    
    # Create Products table
    cursor.execute("""
    CREATE TABLE Products (
        ProductID INTEGER PRIMARY KEY,
        ProductName VARCHAR(40) NOT NULL,
        SupplierID INTEGER,
        CategoryID INTEGER,
        QuantityPerUnit VARCHAR(20),
        UnitPrice DECIMAL(10,4),
        UnitsInStock SMALLINT,
        UnitsOnOrder SMALLINT,
        ReorderLevel SMALLINT,
        Discontinued BOOLEAN,
        FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID),
        FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID)
    )
    """)
    
    # Create Customers table
    cursor.execute("""
    CREATE TABLE Customers (
        CustomerID VARCHAR(5) PRIMARY KEY,
        CompanyName VARCHAR(40) NOT NULL,
        ContactName VARCHAR(30),
        ContactTitle VARCHAR(30),
        Address VARCHAR(60),
        City VARCHAR(15),
        Region VARCHAR(15),
        PostalCode VARCHAR(10),
        Country VARCHAR(15),
        Phone VARCHAR(24),
        Fax VARCHAR(24)
    )
    """)
    
    # Create Employees table
    cursor.execute("""
    CREATE TABLE Employees (
        EmployeeID INTEGER PRIMARY KEY,
        LastName VARCHAR(20) NOT NULL,
        FirstName VARCHAR(10) NOT NULL,
        Title VARCHAR(30),
        TitleOfCourtesy VARCHAR(25),
        BirthDate DATE,
        HireDate DATE,
        Address VARCHAR(60),
        City VARCHAR(15),
        Region VARCHAR(15),
        PostalCode VARCHAR(10),
        Country VARCHAR(15),
        HomePhone VARCHAR(24),
        Extension VARCHAR(4),
        Notes TEXT,
        ReportsTo INTEGER,
        FOREIGN KEY (ReportsTo) REFERENCES Employees(EmployeeID)
    )
    """)
    
    # Create Orders table
    cursor.execute("""
    CREATE TABLE Orders (
        OrderID INTEGER PRIMARY KEY,
        CustomerID VARCHAR(5),
        EmployeeID INTEGER,
        OrderDate DATE,
        RequiredDate DATE,
        ShippedDate DATE,
        ShipVia INTEGER,
        Freight DECIMAL(10,4),
        ShipName VARCHAR(40),
        ShipAddress VARCHAR(60),
        ShipCity VARCHAR(15),
        ShipRegion VARCHAR(15),
        ShipPostalCode VARCHAR(10),
        ShipCountry VARCHAR(15),
        FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
        FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
    )
    """)
    
    # Create Order Details table
    cursor.execute("""
    CREATE TABLE [Order Details] (
        OrderID INTEGER,
        ProductID INTEGER,
        UnitPrice DECIMAL(10,4) NOT NULL,
        Quantity SMALLINT NOT NULL,
        Discount REAL NOT NULL,
        PRIMARY KEY (OrderID, ProductID),
        FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
        FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
    )
    """)
    
    # Insert sample data
    categories_data = [
        (1, 'Beverages', 'Soft drinks, coffees, teas, beers, and ales'),
        (2, 'Condiments', 'Sweet and savory sauces, relishes, spreads, and seasonings'),
        (3, 'Dairy Products', 'Cheeses'),
        (4, 'Grains/Cereals', 'Breads, crackers, pasta, and cereal'),
        (5, 'Meat/Poultry', 'Prepared meats'),
        (6, 'Produce', 'Dried fruit and bean curd'),
        (7, 'Seafood', 'Seaweed and fish'),
        (8, 'Confections', 'Desserts, candies, and sweet breads')
    ]
    
    cursor.executemany("""
    INSERT INTO Categories (CategoryID, CategoryName, Description)
    VALUES (?, ?, ?)
    """, categories_data)
    
    suppliers_data = [
        (1, 'Exotic Liquids', 'Charlotte Cooper', 'Purchasing Manager', '49 Gilbert St.', 'London', None, 'EC1 4SD', 'UK', '(171) 555-2222', None),
        (2, 'New Orleans Cajun Delights', 'Shelley Burke', 'Order Administrator', 'P.O. Box 78934', 'New Orleans', 'LA', '70117', 'USA', '(100) 555-4822', None),
        (3, 'Grandma Kelly\'s Homestead', 'Regina Murphy', 'Sales Representative', '707 Oxford Rd.', 'Ann Arbor', 'MI', '48104', 'USA', '(313) 555-5735', '(313) 555-3349'),
        (4, 'Tokyo Traders', 'Yoshi Nagase', 'Marketing Manager', '9-8 Sekimai Musashino-shi', 'Tokyo', None, '100', 'Japan', '(03) 3555-5011', None),
        (5, 'Cooperativa de Quesos', 'Antonio del Valle Saavedra', 'Export Administrator', 'Calle del Rosal 4', 'Oviedo', 'Asturias', '33007', 'Spain', '(98) 598 76 54', None)
    ]
    
    cursor.executemany("""
    INSERT INTO Suppliers (SupplierID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, suppliers_data)
    
    products_data = [
        (1, 'Chai', 1, 1, '10 boxes x 20 bags', 18.00, 39, 0, 10, 0),
        (2, 'Chang', 1, 1, '24 - 12 oz bottles', 19.00, 17, 40, 25, 0),
        (3, 'Aniseed Syrup', 1, 2, '12 - 550 ml bottles', 10.00, 13, 70, 25, 0),
        (4, 'Chef Anton\'s Cajun Seasoning', 2, 2, '48 - 6 oz jars', 22.00, 53, 0, 0, 0),
        (5, 'Chef Anton\'s Gumbo Mix', 2, 2, '36 boxes', 21.35, 0, 0, 0, 1),
        (6, 'Grandma\'s Boysenberry Spread', 3, 2, '12 - 8 oz jars', 25.00, 120, 0, 25, 0),
        (7, 'Uncle Bob\'s Organic Dried Pears', 3, 7, '12 - 1 lb pkgs.', 30.00, 15, 0, 10, 0),
        (8, 'Northwoods Cranberry Sauce', 3, 2, '12 - 12 oz jars', 40.00, 6, 0, 0, 0),
        (9, 'Mishi Kobe Niku', 4, 6, '18 - 500 g pkgs.', 97.00, 29, 0, 0, 1),
        (10, 'Ikura', 4, 8, '12 - 200 ml jars', 31.00, 31, 0, 0, 0)
    ]
    
    cursor.executemany("""
    INSERT INTO Products (ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, products_data)
    
    customers_data = [
        ('ALFKI', 'Alfreds Futterkiste', 'Maria Anders', 'Sales Representative', 'Obere Str. 57', 'Berlin', None, '12209', 'Germany', '030-0074321', '030-0076545'),
        ('ANATR', 'Ana Trujillo Emparedados y helados', 'Ana Trujillo', 'Owner', 'Avda. de la Constitución 2222', 'México D.F.', None, '05021', 'Mexico', '(5) 555-4729', '(5) 555-3745'),
        ('ANTON', 'Antonio Moreno Taquería', 'Antonio Moreno', 'Owner', 'Mataderos 2312', 'México D.F.', None, '05023', 'Mexico', '(5) 555-3932', None),
        ('AROUT', 'Around the Horn', 'Thomas Hardy', 'Sales Representative', '120 Hanover Sq.', 'London', None, 'WA1 1DP', 'UK', '(171) 555-7788', '(171) 555-6750'),
        ('BERGS', 'Berglunds snabbköp', 'Christina Berglund', 'Order Administrator', 'Berguvsvägen 8', 'Luleå', None, 'S-958 22', 'Sweden', '0921-12 34 65', '0921-12 34 67')
    ]
    
    cursor.executemany("""
    INSERT INTO Customers (CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, customers_data)
    
    employees_data = [
        (1, 'Davolio', 'Nancy', 'Sales Representative', 'Ms.', '1948-12-08', '1992-05-01', '507 - 20th Ave. E.', 'Seattle', 'WA', '98122', 'USA', '(206) 555-9857', '5467', 'Education includes a BA in psychology from Colorado State University in 1970.', 2),
        (2, 'Fuller', 'Andrew', 'Vice President, Sales', 'Dr.', '1952-02-19', '1992-08-14', '908 W. Capital Way', 'Tacoma', 'WA', '98401', 'USA', '(206) 555-9482', '3457', 'Andrew received his BTS commercial in 1974 and a Ph.D. in international marketing from the University of Dallas in 1981.', None),
        (3, 'Leverling', 'Janet', 'Sales Representative', 'Ms.', '1963-08-30', '1992-04-01', '722 Moss Bay Blvd.', 'Kirkland', 'WA', '98033', 'USA', '(206) 555-3412', '3355', 'Janet has a BS degree in chemistry from Boston College (1984).', 2),
        (4, 'Peacock', 'Margaret', 'Sales Representative', 'Mrs.', '1937-09-19', '1993-05-03', '4110 Old Redmond Rd.', 'Redmond', 'WA', '98052', 'USA', '(206) 555-8122', '5176', 'Margaret holds a BA in English literature from Concordia College (1958) and an MA from the American Institute of Culinary Arts (1966).', 2),
        (5, 'Buchanan', 'Steven', 'Sales Manager', 'Mr.', '1955-03-04', '1993-10-17', '14 Garrett Hill', 'London', None, 'SW1 8JR', 'UK', '(71) 555-4848', '3453', 'Steven Buchanan graduated from St. Andrews University, Scotland, with a BSC degree in 1976.', 2)
    ]
    
    cursor.executemany("""
    INSERT INTO Employees (EmployeeID, LastName, FirstName, Title, TitleOfCourtesy, BirthDate, HireDate, Address, City, Region, PostalCode, Country, HomePhone, Extension, Notes, ReportsTo)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, employees_data)
    
    # Insert some sample orders
    orders_data = [
        (10248, 'ALFKI', 1, '1996-07-04', '1996-08-01', '1996-07-16', 3, 32.38, 'Alfreds Futterkiste', 'Obere Str. 57', 'Berlin', None, '12209', 'Germany'),
        (10249, 'ANATR', 2, '1996-07-05', '1996-08-16', '1996-07-10', 1, 11.61, 'Ana Trujillo Emparedados y helados', 'Avda. de la Constitución 2222', 'México D.F.', None, '05021', 'Mexico'),
        (10250, 'ANTON', 3, '1996-07-08', '1996-08-05', '1996-07-12', 2, 65.83, 'Antonio Moreno Taquería', 'Mataderos 2312', 'México D.F.', None, '05023', 'Mexico'),
        (10251, 'AROUT', 1, '1996-07-08', '1996-08-05', '1996-07-15', 1, 41.34, 'Around the Horn', '120 Hanover Sq.', 'London', None, 'WA1 1DP', 'UK'),
        (10252, 'BERGS', 2, '1996-07-09', '1996-08-06', '1996-07-11', 2, 51.30, 'Berglunds snabbköp', 'Berguvsvägen 8', 'Luleå', None, 'S-958 22', 'Sweden')
    ]
    
    cursor.executemany("""
    INSERT INTO Orders (OrderID, CustomerID, EmployeeID, OrderDate, RequiredDate, ShippedDate, ShipVia, Freight, ShipName, ShipAddress, ShipCity, ShipRegion, ShipPostalCode, ShipCountry)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, orders_data)
    
    # Insert order details
    order_details_data = [
        (10248, 1, 18.00, 12, 0.0),
        (10248, 2, 19.00, 10, 0.0),
        (10248, 3, 10.00, 5, 0.0),
        (10249, 4, 22.00, 9, 0.0),
        (10249, 5, 21.35, 40, 0.0),
        (10250, 6, 25.00, 10, 0.15),
        (10250, 7, 30.00, 35, 0.15),
        (10250, 8, 40.00, 15, 0.15),
        (10251, 1, 18.00, 6, 0.05),
        (10251, 2, 19.00, 15, 0.05),
        (10252, 3, 10.00, 20, 0.05),
        (10252, 4, 22.00, 40, 0.0)
    ]
    
    cursor.executemany("""
    INSERT INTO [Order Details] (OrderID, ProductID, UnitPrice, Quantity, Discount)
    VALUES (?, ?, ?, ?, ?)
    """, order_details_data)
    
    conn.commit()
    conn.close()
    
    print("✅ Northwind database created successfully with sample data!")
    print("📊 Tables created:")
    
    # Verify creation
    conn = sqlite3.connect('northwind.db')
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
    tables = cursor.fetchall()
    
    for table in tables:
        cursor.execute(f"SELECT COUNT(*) FROM [{table[0]}]")
        count = cursor.fetchone()[0]
        print(f"  - {table[0]}: {count} records")
    
    conn.close()

if __name__ == "__main__":
    create_northwind_database()