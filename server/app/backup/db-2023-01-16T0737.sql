/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: audit_trails
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `audit_trails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Summary` varchar(255) NOT NULL,
  `Action` varchar(255) NOT NULL,
  `AuditDate` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `audit_trails_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 58 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: categories
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `CategoryName` (`CategoryName`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: discounts
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `discounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `DiscountName` varchar(255) NOT NULL,
  `DiscountAmount` float NOT NULL,
  `DiscountType` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `DiscountName` (`DiscountName`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: handlers
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `handlers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Category` varchar(255) NOT NULL,
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `Sex` varchar(255) NOT NULL,
  `City` varchar(255) DEFAULT NULL,
  `ZIP` varchar(255) DEFAULT NULL,
  `Address` varchar(255) NOT NULL,
  `Mobile` varchar(255) NOT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `CreditLimit` int NOT NULL,
  `Balance` int DEFAULT '0',
  `OnHold` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: invoice_details
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `invoice_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `UnitPrice` float NOT NULL,
  `Quantity` int NOT NULL,
  `Total` float NOT NULL,
  `Status` varchar(255) NOT NULL DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `medicineId` int DEFAULT NULL,
  `invoiceId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `medicineId` (`medicineId`),
  KEY `invoiceId` (`invoiceId`),
  CONSTRAINT `invoice_details_ibfk_1` FOREIGN KEY (`medicineId`) REFERENCES `medicines` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `invoice_details_ibfk_2` FOREIGN KEY (`invoiceId`) REFERENCES `invoices` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: invoices
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `invoices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `InvoiceNo` varchar(255) NOT NULL,
  `ORNumber` int NOT NULL,
  `InvoiceDate` datetime NOT NULL,
  `DueDate` datetime NOT NULL,
  `PaidDate` datetime DEFAULT NULL,
  `VAT` float DEFAULT NULL,
  `GrossAmount` float NOT NULL,
  `Total` float NOT NULL,
  `PaidAmount` float DEFAULT NULL,
  `Balance` float DEFAULT '0',
  `Status` varchar(255) NOT NULL DEFAULT 'pending',
  `Remarks` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `patientId` int DEFAULT NULL,
  `handlerId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `InvoiceNo` (`InvoiceNo`),
  KEY `patientId` (`patientId`),
  KEY `handlerId` (`handlerId`),
  KEY `userId` (`userId`),
  CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`patientId`) REFERENCES `patients` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `invoices_ibfk_2` FOREIGN KEY (`handlerId`) REFERENCES `handlers` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `invoices_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: manufacturers
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `manufacturers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ManufacturerName` varchar(255) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Mobile` varchar(255) NOT NULL,
  `Phone` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: medicines
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `medicines` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ProductCode` varchar(255) NOT NULL,
  `ProductName` varchar(255) NOT NULL,
  `ProductDetails` varchar(255) DEFAULT NULL,
  `GenericName` varchar(255) NOT NULL,
  `SupplierPrice` float NOT NULL,
  `SellingPrice` float NOT NULL,
  `Quantity` int NOT NULL,
  `ReorderPoint` int NOT NULL,
  `SafetyStock` int NOT NULL,
  `Status` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `supplierId` int DEFAULT NULL,
  `unitId` int DEFAULT NULL,
  `subCategoryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ProductCode` (`ProductCode`),
  UNIQUE KEY `ProductName` (`ProductName`),
  KEY `supplierId` (`supplierId`),
  KEY `unitId` (`unitId`),
  KEY `subCategoryId` (`subCategoryId`),
  CONSTRAINT `medicines_ibfk_1` FOREIGN KEY (`supplierId`) REFERENCES `suppliers` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `medicines_ibfk_2` FOREIGN KEY (`unitId`) REFERENCES `units` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `medicines_ibfk_3` FOREIGN KEY (`subCategoryId`) REFERENCES `sub_categories` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: ors
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `ors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `StartOR` int NOT NULL,
  `MaxOR` int NOT NULL,
  `CurrentOR` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: patients
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `patients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `Sex` varchar(255) NOT NULL,
  `DateOfBirth` datetime NOT NULL,
  `City` varchar(255) DEFAULT NULL,
  `ZIP` varchar(255) DEFAULT NULL,
  `Address` varchar(255) NOT NULL,
  `FirstVisit` datetime NOT NULL,
  `Mobile` varchar(255) NOT NULL,
  `EmergencyContact` varchar(255) NOT NULL,
  `isSenior` tinyint(1) NOT NULL DEFAULT '0',
  `SeniorId` varchar(255) DEFAULT NULL,
  `Note` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `handlerId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `handlerId` (`handlerId`),
  CONSTRAINT `patients_ibfk_1` FOREIGN KEY (`handlerId`) REFERENCES `handlers` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: purchase_details
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `purchase_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Quantity` int NOT NULL,
  `ReceivedQty` int DEFAULT '0',
  `Total` float NOT NULL,
  `RecieveDate` datetime DEFAULT NULL,
  `Status` varchar(255) NOT NULL DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `purchaseId` int DEFAULT NULL,
  `medicineId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `purchaseId` (`purchaseId`),
  KEY `medicineId` (`medicineId`),
  CONSTRAINT `purchase_details_ibfk_1` FOREIGN KEY (`purchaseId`) REFERENCES `purchases` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `purchase_details_ibfk_2` FOREIGN KEY (`medicineId`) REFERENCES `medicines` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: purchases
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `purchases` (
  `id` int NOT NULL AUTO_INCREMENT,
  `POCode` varchar(255) NOT NULL,
  `ItemQty` int NOT NULL,
  `Total` float NOT NULL,
  `OrderDate` datetime NOT NULL,
  `Status` varchar(255) NOT NULL DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `supplierId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `POCode` (`POCode`),
  KEY `supplierId` (`supplierId`),
  CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`supplierId`) REFERENCES `suppliers` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: returns
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `returns` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ReferenceNo` varchar(255) NOT NULL,
  `Quantity` int NOT NULL,
  `DateCreated` datetime NOT NULL,
  `Total` float NOT NULL,
  `Reason` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `medicineId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `medicineId` (`medicineId`),
  KEY `userId` (`userId`),
  CONSTRAINT `returns_ibfk_1` FOREIGN KEY (`medicineId`) REFERENCES `medicines` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `returns_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: role_groups
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `role_groups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `RoleName` varchar(255) NOT NULL,
  `Role` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `RoleName` (`RoleName`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sales
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `sales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `OrderNo` varchar(255) NOT NULL,
  `ORNumber` int NOT NULL,
  `OrderDate` datetime NOT NULL,
  `CustomerName` varchar(255) NOT NULL,
  `Discount` float DEFAULT NULL,
  `VAT` float DEFAULT NULL,
  `GrossAmount` float NOT NULL,
  `Total` float NOT NULL,
  `CashTendered` float NOT NULL,
  `ChangeAmount` float NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `OrderNo` (`OrderNo`),
  KEY `userId` (`userId`),
  CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sales_details
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `sales_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `UnitPrice` float NOT NULL,
  `Quantity` int NOT NULL,
  `Total` float NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `medicineId` int DEFAULT NULL,
  `saleId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `medicineId` (`medicineId`),
  KEY `saleId` (`saleId`),
  CONSTRAINT `sales_details_ibfk_1` FOREIGN KEY (`medicineId`) REFERENCES `medicines` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `sales_details_ibfk_2` FOREIGN KEY (`saleId`) REFERENCES `sales` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: stock_adjustments
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `stock_adjustments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Mode` varchar(255) NOT NULL,
  `DateCreated` datetime NOT NULL,
  `Quantity` int NOT NULL,
  `Reason` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `medicineId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `medicineId` (`medicineId`),
  KEY `userId` (`userId`),
  CONSTRAINT `stock_adjustments_ibfk_1` FOREIGN KEY (`medicineId`) REFERENCES `medicines` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `stock_adjustments_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sub_categories
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `sub_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `SubCategoryName` varchar(255) NOT NULL,
  `MarkUp` float NOT NULL,
  `MarkUpUnit` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `categoryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `SubCategoryName` (`SubCategoryName`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `sub_categories_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: suppliers
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `suppliers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `SupplierName` varchar(255) NOT NULL,
  `ContactPerson` varchar(255) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Mobile` varchar(255) NOT NULL,
  `Phone` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `SupplierName` (`SupplierName`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: types
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `TypeName` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: units
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `units` (
  `id` int NOT NULL AUTO_INCREMENT,
  `UnitName` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UnitName` (`UnitName`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: users
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `UserName` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Role` varchar(255) DEFAULT NULL,
  `isLock` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleGroupId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `FirstName` (`FirstName`),
  UNIQUE KEY `LastName` (`LastName`),
  UNIQUE KEY `UserName` (`UserName`),
  KEY `roleGroupId` (`roleGroupId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleGroupId`) REFERENCES `role_groups` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: vats
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `vats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `VatName` varchar(255) NOT NULL,
  `VatAmount` float NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: audit_trails
# ------------------------------------------------------------

INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    1,
    'Backup and Restore is clicked in navigation',
    'Click',
    '2023-01-16 04:27:26',
    '2023-01-16 04:27:26',
    '2023-01-16 04:27:26',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    2,
    'Product List is clicked in navigation',
    'Click',
    '2023-01-16 04:34:09',
    '2023-01-16 04:34:09',
    '2023-01-16 04:34:09',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    3,
    'Add Product is clicked in navigation',
    'Click',
    '2023-01-16 04:34:10',
    '2023-01-16 04:34:10',
    '2023-01-16 04:34:10',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    4,
    'Clicked Save in category.',
    'Click',
    '2023-01-16 04:34:33',
    '2023-01-16 04:34:33',
    '2023-01-16 04:34:33',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    5,
    'Clicked Save in category.',
    'Click',
    '2023-01-16 04:34:34',
    '2023-01-16 04:34:34',
    '2023-01-16 04:34:34',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    6,
    'Added Coffee in category.',
    'Create',
    '2023-01-16 04:34:35',
    '2023-01-16 04:34:35',
    '2023-01-16 04:34:35',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    7,
    'Clicked add in Coffee sub-category.',
    'Click',
    '2023-01-16 04:34:46',
    '2023-01-16 04:34:46',
    '2023-01-16 04:34:46',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    8,
    'Clicked add in Coffee sub-category.',
    'Click',
    '2023-01-16 04:34:46',
    '2023-01-16 04:34:46',
    '2023-01-16 04:34:46',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    9,
    'Added in Coffee sub-category.',
    'Create',
    '2023-01-16 04:34:47',
    '2023-01-16 04:34:47',
    '2023-01-16 04:34:47',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    10,
    'Clicked add in Coffee sub-category.',
    'Click',
    '2023-01-16 04:54:36',
    '2023-01-16 04:54:36',
    '2023-01-16 04:54:36',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    11,
    'Clicked add in Coffee sub-category.',
    'Click',
    '2023-01-16 04:54:37',
    '2023-01-16 04:54:37',
    '2023-01-16 04:54:37',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    12,
    'Added in Coffee sub-category.',
    'Create',
    '2023-01-16 04:54:38',
    '2023-01-16 04:54:38',
    '2023-01-16 04:54:38',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    13,
    'Clicked add in Add Supplier.',
    'Click',
    '2023-01-16 04:57:02',
    '2023-01-16 04:57:02',
    '2023-01-16 04:57:02',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    14,
    'Clicked add in Add Supplier.',
    'Click',
    '2023-01-16 04:57:02',
    '2023-01-16 04:57:02',
    '2023-01-16 04:57:02',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    15,
    'Added Supplier 1 in Supplier',
    'Create',
    '2023-01-16 04:57:04',
    '2023-01-16 04:57:04',
    '2023-01-16 04:57:04',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    16,
    'Added Enervon in Product',
    'Create',
    '2023-01-16 04:57:18',
    '2023-01-16 04:57:18',
    '2023-01-16 04:57:18',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    17,
    'Product List is clicked in navigation',
    'Click',
    '2023-01-16 04:57:29',
    '2023-01-16 04:57:29',
    '2023-01-16 04:57:29',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    18,
    'Purchase Order List is clicked in navigation',
    'Click',
    '2023-01-16 04:58:04',
    '2023-01-16 04:58:04',
    '2023-01-16 04:58:04',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    19,
    'Clicked Order All in PO List for Supplier 1',
    'Click',
    '2023-01-16 04:58:15',
    '2023-01-16 04:58:15',
    '2023-01-16 04:58:15',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    20,
    'Clicked Order All in PO List for Supplier 1',
    'Click',
    '2023-01-16 04:59:15',
    '2023-01-16 04:59:15',
    '2023-01-16 04:59:15',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    21,
    'Processed 2023016125915 in Purchase Order.',
    'Create',
    '2023-01-16 05:15:58',
    '2023-01-16 05:15:58',
    '2023-01-16 05:15:58',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    22,
    'Updated 2023016125915 in Purchase Order.',
    'Update',
    '2023-01-16 05:20:46',
    '2023-01-16 05:20:46',
    '2023-01-16 05:20:46',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    23,
    'Updated 2023016125915 status in Purchase Order.',
    'Update',
    '2023-01-16 05:20:52',
    '2023-01-16 05:20:52',
    '2023-01-16 05:20:52',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    24,
    'Updated 2023016125915 in Delivery.',
    'Update',
    '2023-01-16 05:21:31',
    '2023-01-16 05:21:31',
    '2023-01-16 05:21:31',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    25,
    'Master List is clicked in navigation',
    'Click',
    '2023-01-16 05:21:36',
    '2023-01-16 05:21:36',
    '2023-01-16 05:21:36',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    26,
    'Delivery List is clicked in navigation',
    'Click',
    '2023-01-16 05:21:44',
    '2023-01-16 05:21:44',
    '2023-01-16 05:21:44',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    27,
    'Updated 2023016125915 in Delivery.',
    'Update',
    '2023-01-16 05:21:50',
    '2023-01-16 05:21:50',
    '2023-01-16 05:21:50',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    28,
    'Master List is clicked in navigation',
    'Click',
    '2023-01-16 05:22:06',
    '2023-01-16 05:22:06',
    '2023-01-16 05:22:06',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    29,
    'Purchase Order List is clicked in navigation',
    'Click',
    '2023-01-16 05:23:47',
    '2023-01-16 05:23:47',
    '2023-01-16 05:23:47',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    30,
    'Clicked Order All in PO List for Supplier 1',
    'Click',
    '2023-01-16 05:23:48',
    '2023-01-16 05:23:48',
    '2023-01-16 05:23:48',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    31,
    'Processed 2023016132348 in Purchase Order.',
    'Create',
    '2023-01-16 05:23:52',
    '2023-01-16 05:23:52',
    '2023-01-16 05:23:52',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    32,
    'Updated 2023016132348 status in Purchase Order.',
    'Update',
    '2023-01-16 05:24:10',
    '2023-01-16 05:24:10',
    '2023-01-16 05:24:10',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    33,
    'Updated 2023016132348 in Delivery.',
    'Update',
    '2023-01-16 05:29:16',
    '2023-01-16 05:29:16',
    '2023-01-16 05:29:16',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    34,
    'Updated 2023016132348 in Delivery.',
    'Update',
    '2023-01-16 05:34:01',
    '2023-01-16 05:34:01',
    '2023-01-16 05:34:01',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    35,
    'Master List is clicked in navigation',
    'Click',
    '2023-01-16 05:34:14',
    '2023-01-16 05:34:14',
    '2023-01-16 05:34:14',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    36,
    'Purchase Order List is clicked in navigation',
    'Click',
    '2023-01-16 05:34:35',
    '2023-01-16 05:34:35',
    '2023-01-16 05:34:35',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    37,
    'Clicked Order All in PO List for Supplier 1',
    'Click',
    '2023-01-16 05:34:37',
    '2023-01-16 05:34:37',
    '2023-01-16 05:34:37',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    38,
    'Processed 2023016133437 in Purchase Order.',
    'Create',
    '2023-01-16 05:34:47',
    '2023-01-16 05:34:47',
    '2023-01-16 05:34:47',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    39,
    'Updated 2023016133437 status in Purchase Order.',
    'Update',
    '2023-01-16 05:34:51',
    '2023-01-16 05:34:51',
    '2023-01-16 05:34:51',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    40,
    'Updated 2023016133437 in Delivery.',
    'Update',
    '2023-01-16 05:35:07',
    '2023-01-16 05:35:07',
    '2023-01-16 05:35:07',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    41,
    'Updated 2023016133437 in Delivery.',
    'Update',
    '2023-01-16 05:35:36',
    '2023-01-16 05:35:36',
    '2023-01-16 05:35:36',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    42,
    'Master List is clicked in navigation',
    'Click',
    '2023-01-16 05:36:10',
    '2023-01-16 05:36:10',
    '2023-01-16 05:36:10',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    43,
    'Purchase Order List is clicked in navigation',
    'Click',
    '2023-01-16 05:37:40',
    '2023-01-16 05:37:40',
    '2023-01-16 05:37:40',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    44,
    'Clicked Order All in PO List for Supplier 1',
    'Click',
    '2023-01-16 05:37:42',
    '2023-01-16 05:37:42',
    '2023-01-16 05:37:42',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    45,
    'Processed 2023016133742 in Purchase Order.',
    'Create',
    '2023-01-16 05:37:50',
    '2023-01-16 05:37:50',
    '2023-01-16 05:37:50',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    46,
    'Updated 2023016133742 status in Purchase Order.',
    'Update',
    '2023-01-16 05:37:56',
    '2023-01-16 05:37:56',
    '2023-01-16 05:37:56',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    47,
    'Updated 2023016133742 in Delivery.',
    'Update',
    '2023-01-16 05:38:00',
    '2023-01-16 05:38:00',
    '2023-01-16 05:38:00',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    48,
    'Master List is clicked in navigation',
    'Click',
    '2023-01-16 05:38:09',
    '2023-01-16 05:38:09',
    '2023-01-16 05:38:09',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    49,
    'Purchase Order List is clicked in navigation',
    'Click',
    '2023-01-16 05:38:11',
    '2023-01-16 05:38:11',
    '2023-01-16 05:38:11',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    50,
    'Delivery List is clicked in navigation',
    'Click',
    '2023-01-16 05:38:14',
    '2023-01-16 05:38:14',
    '2023-01-16 05:38:14',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    51,
    'Updated 2023016133742 in Delivery.',
    'Update',
    '2023-01-16 05:38:19',
    '2023-01-16 05:38:19',
    '2023-01-16 05:38:19',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    52,
    'Master List is clicked in navigation',
    'Click',
    '2023-01-16 05:38:26',
    '2023-01-16 05:38:26',
    '2023-01-16 05:38:26',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    53,
    'Delivery List is clicked in navigation',
    'Click',
    '2023-01-16 05:38:29',
    '2023-01-16 05:38:29',
    '2023-01-16 05:38:29',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    54,
    'Updated 2023016133437 in Delivery.',
    'Update',
    '2023-01-16 05:38:34',
    '2023-01-16 05:38:34',
    '2023-01-16 05:38:34',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    55,
    'Master List is clicked in navigation',
    'Click',
    '2023-01-16 05:38:37',
    '2023-01-16 05:38:37',
    '2023-01-16 05:38:37',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    56,
    'Backup and Restore is clicked in navigation',
    'Click',
    '2023-01-16 07:37:56',
    '2023-01-16 07:37:56',
    '2023-01-16 07:37:56',
    1
  );
INSERT INTO
  `audit_trails` (
    `id`,
    `Summary`,
    `Action`,
    `AuditDate`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    57,
    'Backup the database.',
    'Backup',
    '2023-01-16 07:37:57',
    '2023-01-16 07:37:57',
    '2023-01-16 07:37:57',
    1
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: categories
# ------------------------------------------------------------

INSERT INTO
  `categories` (`id`, `CategoryName`, `createdAt`, `updatedAt`)
VALUES
  (
    1,
    'Coffee',
    '2023-01-16 04:34:35',
    '2023-01-16 04:34:35'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: discounts
# ------------------------------------------------------------

INSERT INTO
  `discounts` (
    `id`,
    `DiscountName`,
    `DiscountAmount`,
    `DiscountType`,
    `createdAt`,
    `updatedAt`
  )
VALUES
  (
    1,
    'Senior/PWD',
    20,
    '%',
    '2023-01-16 04:26:12',
    '2023-01-16 04:26:12'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: handlers
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: invoice_details
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: invoices
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: manufacturers
# ------------------------------------------------------------

INSERT INTO
  `manufacturers` (
    `id`,
    `ManufacturerName`,
    `Address`,
    `Mobile`,
    `Phone`,
    `Email`,
    `createdAt`,
    `updatedAt`
  )
VALUES
  (
    1,
    'Manufacturer 1 Sample',
    'Guevara, La Paz, Tarlac',
    '09098717874',
    '',
    'sampe@gmail.com',
    '2022-10-28 00:24:51',
    '2022-10-28 00:24:51'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: medicines
# ------------------------------------------------------------

INSERT INTO
  `medicines` (
    `id`,
    `ProductCode`,
    `ProductName`,
    `ProductDetails`,
    `GenericName`,
    `SupplierPrice`,
    `SellingPrice`,
    `Quantity`,
    `ReorderPoint`,
    `SafetyStock`,
    `Status`,
    `createdAt`,
    `updatedAt`,
    `supplierId`,
    `unitId`,
    `subCategoryId`
  )
VALUES
  (
    1,
    '02000094936',
    'Enervon',
    '500mL',
    'Generic',
    10,
    20,
    15,
    30,
    10,
    1,
    '2023-01-16 04:57:18',
    '2023-01-16 04:57:18',
    1,
    1,
    2
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: ors
# ------------------------------------------------------------

INSERT INTO
  `ors` (
    `id`,
    `StartOR`,
    `MaxOR`,
    `CurrentOR`,
    `createdAt`,
    `updatedAt`
  )
VALUES
  (
    1,
    0,
    0,
    0,
    '2023-01-16 04:26:12',
    '2023-01-16 04:26:12'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: patients
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: purchase_details
# ------------------------------------------------------------

INSERT INTO
  `purchase_details` (
    `id`,
    `Quantity`,
    `ReceivedQty`,
    `Total`,
    `RecieveDate`,
    `Status`,
    `createdAt`,
    `updatedAt`,
    `purchaseId`,
    `medicineId`
  )
VALUES
  (
    1,
    10,
    10,
    100,
    '2023-01-16 05:21:50',
    'received',
    '2023-01-16 05:15:58',
    '2023-01-16 05:21:50',
    1,
    1
  );
INSERT INTO
  `purchase_details` (
    `id`,
    `Quantity`,
    `ReceivedQty`,
    `Total`,
    `RecieveDate`,
    `Status`,
    `createdAt`,
    `updatedAt`,
    `purchaseId`,
    `medicineId`
  )
VALUES
  (
    2,
    10,
    10,
    100,
    '2023-01-16 05:34:01',
    'received',
    '2023-01-16 05:23:52',
    '2023-01-16 05:34:01',
    2,
    1
  );
INSERT INTO
  `purchase_details` (
    `id`,
    `Quantity`,
    `ReceivedQty`,
    `Total`,
    `RecieveDate`,
    `Status`,
    `createdAt`,
    `updatedAt`,
    `purchaseId`,
    `medicineId`
  )
VALUES
  (
    3,
    20,
    20,
    200,
    '2023-01-16 05:38:34',
    'received',
    '2023-01-16 05:34:47',
    '2023-01-16 05:38:34',
    3,
    1
  );
INSERT INTO
  `purchase_details` (
    `id`,
    `Quantity`,
    `ReceivedQty`,
    `Total`,
    `RecieveDate`,
    `Status`,
    `createdAt`,
    `updatedAt`,
    `purchaseId`,
    `medicineId`
  )
VALUES
  (
    4,
    10,
    10,
    100,
    '2023-01-16 05:38:19',
    'received',
    '2023-01-16 05:37:50',
    '2023-01-16 05:38:19',
    4,
    1
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: purchases
# ------------------------------------------------------------

INSERT INTO
  `purchases` (
    `id`,
    `POCode`,
    `ItemQty`,
    `Total`,
    `OrderDate`,
    `Status`,
    `createdAt`,
    `updatedAt`,
    `supplierId`
  )
VALUES
  (
    1,
    '2023016125915',
    1,
    100,
    '2023-01-16 04:59:15',
    'settled',
    '2023-01-16 05:15:58',
    '2023-01-16 05:21:50',
    1
  );
INSERT INTO
  `purchases` (
    `id`,
    `POCode`,
    `ItemQty`,
    `Total`,
    `OrderDate`,
    `Status`,
    `createdAt`,
    `updatedAt`,
    `supplierId`
  )
VALUES
  (
    2,
    '2023016132348',
    1,
    100,
    '2023-01-16 05:23:48',
    'settled',
    '2023-01-16 05:23:52',
    '2023-01-16 05:34:01',
    1
  );
INSERT INTO
  `purchases` (
    `id`,
    `POCode`,
    `ItemQty`,
    `Total`,
    `OrderDate`,
    `Status`,
    `createdAt`,
    `updatedAt`,
    `supplierId`
  )
VALUES
  (
    3,
    '2023016133437',
    1,
    200,
    '2023-01-16 05:34:37',
    'settled',
    '2023-01-16 05:34:47',
    '2023-01-16 05:38:34',
    1
  );
INSERT INTO
  `purchases` (
    `id`,
    `POCode`,
    `ItemQty`,
    `Total`,
    `OrderDate`,
    `Status`,
    `createdAt`,
    `updatedAt`,
    `supplierId`
  )
VALUES
  (
    4,
    '2023016133742',
    1,
    100,
    '2023-01-16 05:37:42',
    'settled',
    '2023-01-16 05:37:50',
    '2023-01-16 05:38:19',
    1
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: returns
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: role_groups
# ------------------------------------------------------------

INSERT INTO
  `role_groups` (`id`, `RoleName`, `Role`, `createdAt`, `updatedAt`)
VALUES
  (
    1,
    'admin',
    'maintenance;inventory;sales;reports;utilities',
    '2023-01-16 04:26:12',
    '2023-01-16 04:26:12'
  );
INSERT INTO
  `role_groups` (`id`, `RoleName`, `Role`, `createdAt`, `updatedAt`)
VALUES
  (
    2,
    'user',
    'user',
    '2023-01-16 04:26:12',
    '2023-01-16 04:26:12'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sales
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sales_details
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: stock_adjustments
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sub_categories
# ------------------------------------------------------------

INSERT INTO
  `sub_categories` (
    `id`,
    `SubCategoryName`,
    `MarkUp`,
    `MarkUpUnit`,
    `createdAt`,
    `updatedAt`,
    `categoryId`
  )
VALUES
  (
    1,
    'Sample',
    10,
    '%',
    '2023-01-16 04:34:47',
    '2023-01-16 04:34:47',
    1
  );
INSERT INTO
  `sub_categories` (
    `id`,
    `SubCategoryName`,
    `MarkUp`,
    `MarkUpUnit`,
    `createdAt`,
    `updatedAt`,
    `categoryId`
  )
VALUES
  (
    2,
    'SampleCoffee',
    10,
    'amount',
    '2023-01-16 04:54:38',
    '2023-01-16 04:54:38',
    1
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: suppliers
# ------------------------------------------------------------

INSERT INTO
  `suppliers` (
    `id`,
    `SupplierName`,
    `ContactPerson`,
    `Address`,
    `Mobile`,
    `Phone`,
    `Email`,
    `createdAt`,
    `updatedAt`
  )
VALUES
  (
    1,
    'Supplier 1',
    'Mark Darius',
    'Anao, Tarlac, Tarlac',
    '09098717874',
    NULL,
    '',
    '2023-01-16 04:57:04',
    '2023-01-16 04:57:04'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: types
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: units
# ------------------------------------------------------------

INSERT INTO
  `units` (`id`, `UnitName`, `createdAt`, `updatedAt`)
VALUES
  (
    1,
    'tabs',
    '2023-01-16 04:57:14',
    '2023-01-16 04:57:14'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: users
# ------------------------------------------------------------

INSERT INTO
  `users` (
    `id`,
    `FirstName`,
    `LastName`,
    `UserName`,
    `Password`,
    `Role`,
    `isLock`,
    `createdAt`,
    `updatedAt`,
    `roleGroupId`
  )
VALUES
  (
    1,
    'Mark Darius',
    'Pagaduan',
    'admin',
    '$2a$08$JPO/FNTaEXaZ6xa8X5hWYe17lCJv77b412uMv7xSXw4FSENjYk8XW',
    'maintenance;inventory;sales;reports;utilities',
    0,
    '2023-01-16 04:26:12',
    '2023-01-16 04:26:12',
    1
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: vats
# ------------------------------------------------------------

INSERT INTO
  `vats` (
    `id`,
    `VatName`,
    `VatAmount`,
    `createdAt`,
    `updatedAt`
  )
VALUES
  (
    1,
    'Tax',
    12,
    '2023-01-16 04:26:12',
    '2023-01-16 04:26:12'
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
