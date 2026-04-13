IF OBJECT_ID('dbo.newOpReg', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.newOpReg (
        OPRefNo INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        UHId INT NOT NULL,
        PatientName VARCHAR(250) NOT NULL,
        PatMobileNo VARCHAR(20) NULL,
        RegDate DATE NULL,
        ToBeSeen VARCHAR(1) NULL
    );
END;
GO

IF COL_LENGTH('dbo.newOpReg', 'RegDate') IS NULL
BEGIN
    ALTER TABLE dbo.newOpReg ADD RegDate DATE NULL;
END;
GO

IF COL_LENGTH('dbo.newOpReg', 'ToBeSeen') IS NULL
BEGIN
    ALTER TABLE dbo.newOpReg ADD ToBeSeen VARCHAR(1) NULL;
END;
GO

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE name = 'IX_newOpReg_UHId'
      AND object_id = OBJECT_ID('dbo.newOpReg')
)
BEGIN
    CREATE INDEX IX_newOpReg_UHId ON dbo.newOpReg (UHId);
END;
GO
