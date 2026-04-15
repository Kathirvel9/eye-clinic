IF OBJECT_ID('dbo.PatientDetails', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.PatientDetails (
        PatientId INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        MRIId VARCHAR(50) NULL,
        UHId INT NULL,
        RegDate DATE NULL,
        PatientName VARCHAR(200) NULL,
        CareOf VARCHAR(200) NULL,
        Age INT NULL,
        Gender VARCHAR(10) NULL,
        PatientType VARCHAR(20) NULL,
        DOB DATE NULL,
        Address VARCHAR(500) NULL,
        AadharCard VARCHAR(50) NULL,
        PanCard VARCHAR(50) NULL,
        StateId INT NULL,
        CityId INT NULL,
        DiagnosisId INT NULL,
        Company VARCHAR(100) NULL,
        Pincode VARCHAR(20) NULL,
        Phone VARCHAR(20) NULL,
        PhotoPath VARBINARY(MAX) NULL
    );
END;
GO

IF COL_LENGTH('dbo.PatientDetails', 'PhotoPath') IS NOT NULL
BEGIN
    DECLARE @PhotoPathType NVARCHAR(128);

    SELECT @PhotoPathType = DATA_TYPE
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = 'dbo'
      AND TABLE_NAME = 'PatientDetails'
      AND COLUMN_NAME = 'PhotoPath';

    IF @PhotoPathType <> 'varbinary'
    BEGIN
        ALTER TABLE dbo.PatientDetails
        ALTER COLUMN PhotoPath VARBINARY(MAX) NULL;
    END
END;
GO

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE name = 'UX_PatientDetails_UHId'
      AND object_id = OBJECT_ID('dbo.PatientDetails')
)
BEGIN
    CREATE UNIQUE INDEX UX_PatientDetails_UHId
    ON dbo.PatientDetails (UHId)
    WHERE UHId IS NOT NULL;
END;
GO
