IF OBJECT_ID('dbo.PatientVitals', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.PatientVitals (
        VitalId INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        UHId INT NOT NULL,
        PatientId INT NULL,
        BP VARCHAR(50) NULL,
        Sugar VARCHAR(50) NULL,
        Pulse VARCHAR(50) NULL,
        Temp VARCHAR(50) NULL,
        Height VARCHAR(50) NULL,
        SpOp VARCHAR(50) NULL,
        Weight VARCHAR(50) NULL
    );
END;
GO

IF COL_LENGTH('dbo.PatientVitals', 'PatientId') IS NULL
BEGIN
    ALTER TABLE dbo.PatientVitals
    ADD PatientId INT NULL;
END;
GO

IF NOT EXISTS (
    SELECT 1
    FROM sys.foreign_keys
    WHERE name = 'FK_PatientVitals_PatientDetails'
)
BEGIN
    ALTER TABLE dbo.PatientVitals
    ADD CONSTRAINT FK_PatientVitals_PatientDetails
        FOREIGN KEY (PatientId) REFERENCES dbo.PatientDetails (PatientId);
END;
GO

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE name = 'IX_PatientVitals_UHId'
      AND object_id = OBJECT_ID('dbo.PatientVitals')
)
BEGIN
    CREATE INDEX IX_PatientVitals_UHId ON dbo.PatientVitals (UHId);
END;
GO

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE name = 'IX_PatientVitals_PatientId'
      AND object_id = OBJECT_ID('dbo.PatientVitals')
)
BEGIN
    CREATE INDEX IX_PatientVitals_PatientId ON dbo.PatientVitals (PatientId);
END;
GO
