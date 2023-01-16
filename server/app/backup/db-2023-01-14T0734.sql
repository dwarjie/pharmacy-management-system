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
) ENGINE = InnoDB AUTO_INCREMENT = 19 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
    'Category is clicked in navigation',
    'Click',
    '2023-01-14 05:56:40',
    '2023-01-14 05:56:40',
    '2023-01-14 05:56:40',
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
    'Clicked Add in category.',
    'Click',
    '2023-01-14 05:57:15',
    '2023-01-14 05:57:15',
    '2023-01-14 05:57:15',
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
    'Clicked Add in category.',
    'Click',
    '2023-01-14 05:57:21',
    '2023-01-14 05:57:21',
    '2023-01-14 05:57:21',
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
    'Added Syringe in category.',
    'Create',
    '2023-01-14 05:57:22',
    '2023-01-14 05:57:22',
    '2023-01-14 05:57:22',
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
    'Clicked add sub-category in category.',
    'Click',
    '2023-01-14 05:57:28',
    '2023-01-14 05:57:28',
    '2023-01-14 05:57:28',
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
    'Clicked add in Syringe sub-category.',
    'Click',
    '2023-01-14 05:59:42',
    '2023-01-14 05:59:42',
    '2023-01-14 05:59:42',
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
    'Clicked add in Syringe sub-category.',
    'Click',
    '2023-01-14 05:59:44',
    '2023-01-14 05:59:44',
    '2023-01-14 05:59:44',
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
    'Added in Syringe sub-category.',
    'Create',
    '2023-01-14 05:59:46',
    '2023-01-14 05:59:46',
    '2023-01-14 05:59:46',
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
    'Add Product is clicked in navigation',
    'Click',
    '2023-01-14 05:59:55',
    '2023-01-14 05:59:55',
    '2023-01-14 05:59:55',
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
    'Clicked add in Add Supplier.',
    'Click',
    '2023-01-14 06:01:43',
    '2023-01-14 06:01:43',
    '2023-01-14 06:01:43',
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
    'Clicked add in Add Supplier.',
    'Click',
    '2023-01-14 06:01:45',
    '2023-01-14 06:01:45',
    '2023-01-14 06:01:45',
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
    'Added Syringe Supplier in Supplier',
    'Create',
    '2023-01-14 06:01:46',
    '2023-01-14 06:01:46',
    '2023-01-14 06:01:46',
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
    'Added Syringe in Product',
    'Create',
    '2023-01-14 06:01:54',
    '2023-01-14 06:01:54',
    '2023-01-14 06:01:54',
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
    'Role Group is clicked in navigation',
    'Click',
    '2023-01-14 06:18:03',
    '2023-01-14 06:18:03',
    '2023-01-14 06:18:03',
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
    'Backup and Restore is clicked in navigation',
    'Click',
    '2023-01-14 06:22:47',
    '2023-01-14 06:22:47',
    '2023-01-14 06:22:47',
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
    'Backup and Restore is clicked in navigation',
    'Click',
    '2023-01-14 06:23:16',
    '2023-01-14 06:23:16',
    '2023-01-14 06:23:16',
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
    '2023-01-14 06:54:44',
    '2023-01-14 06:54:44',
    '2023-01-14 06:54:44',
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
    'Backup and Restore is clicked in navigation',
    'Click',
    '2023-01-14 06:54:47',
    '2023-01-14 06:54:47',
    '2023-01-14 06:54:47',
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
    'Syringe',
    '2023-01-14 05:57:22',
    '2023-01-14 05:57:22'
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
    '2023-01-14 05:55:47',
    '2023-01-14 05:55:47'
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
    '001',
    'Syringe',
    '1mL',
    '',
    25,
    35,
    0,
    30,
    10,
    1,
    '2023-01-14 06:01:54',
    '2023-01-14 06:01:54',
    1,
    1,
    1
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
    '2023-01-14 05:55:47',
    '2023-01-14 05:55:47'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: patients
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: purchase_details
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: purchases
# ------------------------------------------------------------


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
    '2023-01-14 05:55:47',
    '2023-01-14 05:55:47'
  );
INSERT INTO
  `role_groups` (`id`, `RoleName`, `Role`, `createdAt`, `updatedAt`)
VALUES
  (
    2,
    'user',
    'user',
    '2023-01-14 05:55:47',
    '2023-01-14 05:55:47'
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
    'Regular Syringe',
    10,
    'amount',
    '2023-01-14 05:59:46',
    '2023-01-14 05:59:46',
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
    'Syringe Supplier',
    'Joshua',
    'Tarlac',
    '09493762924',
    NULL,
    '',
    '2023-01-14 06:01:46',
    '2023-01-14 06:01:46'
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
    '1mL',
    '2023-01-14 06:01:01',
    '2023-01-14 06:01:01'
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
    '$2a$08$6FiWixc9Wrsr9uAVJVQ.PuZERiHVxBLlfx5GOsU7B3QM6I4wt5132',
    'maintenance;inventory;sales;reports;utilities',
    0,
    '2023-01-14 05:55:47',
    '2023-01-14 05:55:47',
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
    '2023-01-14 05:55:47',
    '2023-01-14 05:55:47'
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
