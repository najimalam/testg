-- Check if the database 'PortfolioDb' exists, create if not (optional, depends on user setup)
-- IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'PortfolioDb')
-- BEGIN
--     CREATE DATABASE PortfolioDb;
-- END
-- GO

-- Use the PortfolioDb database (ensure this database exists or is created)
-- USE PortfolioDb;
-- GO

-- Create Projects table
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'Projects')
BEGIN
    CREATE TABLE dbo.Projects (
        Id INT PRIMARY KEY IDENTITY(1,1),
        Title NVARCHAR(100) NOT NULL,
        Description NVARCHAR(MAX) NULL,
        ImageUrl NVARCHAR(255) NULL,
        ProjectUrl NVARCHAR(255) NULL
    );
    PRINT 'Table Projects created.';
END
ELSE
BEGIN
    PRINT 'Table Projects already exists.';
END
GO

-- Create Skills table
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'Skills')
BEGIN
    CREATE TABLE dbo.Skills (
        Id INT PRIMARY KEY IDENTITY(1,1),
        Name NVARCHAR(50) NOT NULL,
        ProficiencyLevel NVARCHAR(50) NULL -- e.g., 'Beginner', 'Intermediate', 'Advanced'
    );
    PRINT 'Table Skills created.';
END
ELSE
BEGIN
    PRINT 'Table Skills already exists.';
END
GO
