IF OBJECT_ID('dbo.PatientDetails', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.PatientDetails (
        PatientId INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        MRIId VARCHAR(50) NULL,
        TokenNo VARCHAR(50) NULL,
        UHId INT NULL,
        RegDate DATE NULL,
        PatientName VARCHAR(200) NULL,
        CareOf VARCHAR(200) NULL,
        Relationship VARCHAR(50) NULL,
        Religion VARCHAR(100) NULL,
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
        DepartmentId INT NULL,
        DesignationId INT NULL,
        ConsultationCodeId INT NULL,
        PhotoPath NVARCHAR(MAX) NULL
    );
END;
GO

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE name = 'IX_PatientDetails_UHId'
      AND object_id = OBJECT_ID('dbo.PatientDetails')
)
BEGIN
    CREATE INDEX IX_PatientDetails_UHId ON dbo.PatientDetails (UHId);
END;
GO
