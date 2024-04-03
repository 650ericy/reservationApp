CREATE TABLE Restaurants (
    RestaurantID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Location VARCHAR(255),
    StarRating INT,
    Cuisine VARCHAR(100)
);

CREATE TABLE Reservations (
    ReservationID SERIAL PRIMARY KEY,
    RestaurantID INT,
    Name VARCHAR(255) NOT NULL,
    Date DATE,
    Time TIME,
    Price DECIMAL(10, 2),
    NumberOfPeople INT,
    ContactInfo VARCHAR(255),
    isPurchased BOOLEAN DEFAULT FALSE,
    ImagePath VARCHAR(255),
    FOREIGN KEY (RestaurantID) REFERENCES Restaurants(RestaurantID)
);

CREATE TABLE Transactions (
    TransactionID SERIAL PRIMARY KEY,
    ReservationID INT,
    PurchaseDate DATE,
    PurchasePrice DECIMAL(10, 2),
    BuyerContactInfo VARCHAR(255),
    FOREIGN KEY (ReservationID) REFERENCES Reservations(ReservationID)
);