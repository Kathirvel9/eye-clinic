IF OBJECT_ID('dbo.ConsultationFee', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.ConsultationFee (
        ConsultationFeeId INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        PatientId INT NOT NULL,
        UHId INT NOT NULL,
        DoctorId INT NULL,
        DoctorName VARCHAR(200) NULL,
        ConsultationId INT NULL,
        ConsultationCode VARCHAR(50) NULL,
        ConsultFee DECIMAL(10,2) NULL,
        Designation VARCHAR(200) NULL,
        Concession DECIMAL(10,2) NOT NULL DEFAULT(0),
        Total DECIMAL(10,2) NULL,
        PatientType VARCHAR(50) NULL,
        BillNo VARCHAR(50) NULL,
        CreatedAt DATETIME NOT NULL DEFAULT(GETDATE()),
        UpdatedAt DATETIME NOT NULL DEFAULT(GETDATE())
    );
END;
GO

IF NOT EXISTS (
    SELECT 1
    FROM sys.foreign_keys
    WHERE name = 'FK_ConsultationFee_PatientDetails'
)
BEGIN
    ALTER TABLE dbo.ConsultationFee
    ADD CONSTRAINT FK_ConsultationFee_PatientDetails
        FOREIGN KEY (PatientId) REFERENCES dbo.PatientDetails (PatientId);
END;
GO

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE name = 'IX_ConsultationFee_PatientId'
      AND object_id = OBJECT_ID('dbo.ConsultationFee')
)
BEGIN
    CREATE INDEX IX_ConsultationFee_PatientId ON dbo.ConsultationFee (PatientId);
END;
GO

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE name = 'IX_ConsultationFee_UHId'
      AND object_id = OBJECT_ID('dbo.ConsultationFee')
)
BEGIN
    CREATE INDEX IX_ConsultationFee_UHId ON dbo.ConsultationFee (UHId);
END;
GO
