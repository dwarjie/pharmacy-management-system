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
) ENGINE = InnoDB AUTO_INCREMENT = 156 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
    'Product List is clicked in navigation',
    'Click',
    '2023-01-14 10:06:50',
    '2023-01-14 10:06:50',
    '2023-01-14 10:06:50',
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
    'OR is clicked in navigation',
    'Click',
    '2023-01-14 10:06:53',
    '2023-01-14 10:06:53',
    '2023-01-14 10:06:53',
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
    'Category is clicked in navigation',
    'Click',
    '2023-01-14 10:07:37',
    '2023-01-14 10:07:37',
    '2023-01-14 10:07:37',
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
    'Add Product is clicked in navigation',
    'Click',
    '2023-01-14 10:07:39',
    '2023-01-14 10:07:39',
    '2023-01-14 10:07:39',
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
    '2023-01-14 10:08:04',
    '2023-01-14 10:08:04',
    '2023-01-14 10:08:04',
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
    'Clicked Save in category.',
    'Click',
    '2023-01-14 10:08:05',
    '2023-01-14 10:08:05',
    '2023-01-14 10:08:05',
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
    'Added Tablet in category.',
    'Create',
    '2023-01-14 10:08:06',
    '2023-01-14 10:08:06',
    '2023-01-14 10:08:06',
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
    'Clicked add in Tablet sub-category.',
    'Click',
    '2023-01-14 10:09:46',
    '2023-01-14 10:09:46',
    '2023-01-14 10:09:46',
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
    'Clicked add in Tablet sub-category.',
    'Click',
    '2023-01-14 10:09:48',
    '2023-01-14 10:09:48',
    '2023-01-14 10:09:48',
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
    'Added in Tablet sub-category.',
    'Create',
    '2023-01-14 10:09:48',
    '2023-01-14 10:09:48',
    '2023-01-14 10:09:48',
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
    'Add Product is clicked in navigation',
    'Click',
    '2023-01-14 10:13:50',
    '2023-01-14 10:13:50',
    '2023-01-14 10:13:50',
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
    'Clicked add in Add Supplier.',
    'Click',
    '2023-01-14 10:14:22',
    '2023-01-14 10:14:22',
    '2023-01-14 10:14:22',
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
    '2023-01-14 10:14:23',
    '2023-01-14 10:14:23',
    '2023-01-14 10:14:23',
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
    'Added Tablet Supplier in Supplier',
    'Create',
    '2023-01-14 10:14:25',
    '2023-01-14 10:14:25',
    '2023-01-14 10:14:25',
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
    'Product List is clicked in navigation',
    'Click',
    '2023-01-14 10:14:34',
    '2023-01-14 10:14:34',
    '2023-01-14 10:14:34',
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
    'Add Product is clicked in navigation',
    'Click',
    '2023-01-14 10:14:39',
    '2023-01-14 10:14:39',
    '2023-01-14 10:14:39',
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
    'Added Paracetamol in Product',
    'Create',
    '2023-01-14 10:16:18',
    '2023-01-14 10:16:18',
    '2023-01-14 10:16:18',
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
    'Product List is clicked in navigation',
    'Click',
    '2023-01-14 10:16:32',
    '2023-01-14 10:16:32',
    '2023-01-14 10:16:32',
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
    'Add Product is clicked in navigation',
    'Click',
    '2023-01-14 10:16:37',
    '2023-01-14 10:16:37',
    '2023-01-14 10:16:37',
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
    'Product List is clicked in navigation',
    'Click',
    '2023-01-14 10:16:50',
    '2023-01-14 10:16:50',
    '2023-01-14 10:16:50',
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
    'Updated Paracetamol in Product',
    'Update',
    '2023-01-14 10:17:00',
    '2023-01-14 10:17:00',
    '2023-01-14 10:17:00',
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
    'Add Product is clicked in navigation',
    'Click',
    '2023-01-14 10:17:06',
    '2023-01-14 10:17:06',
    '2023-01-14 10:17:06',
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
    'Added Neozep in Product',
    'Create',
    '2023-01-14 10:17:53',
    '2023-01-14 10:17:53',
    '2023-01-14 10:17:53',
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
    'Product List is clicked in navigation',
    'Click',
    '2023-01-14 10:17:57',
    '2023-01-14 10:17:57',
    '2023-01-14 10:17:57',
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
    'Unit of Measure is clicked in navigation',
    'Click',
    '2023-01-14 10:18:10',
    '2023-01-14 10:18:10',
    '2023-01-14 10:18:10',
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
    'Product List is clicked in navigation',
    'Click',
    '2023-01-14 10:18:26',
    '2023-01-14 10:18:26',
    '2023-01-14 10:18:26',
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
    'Updated Paracetamol in Product',
    'Update',
    '2023-01-14 10:18:41',
    '2023-01-14 10:18:41',
    '2023-01-14 10:18:41',
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
    'Updated Neozep in Product',
    'Update',
    '2023-01-14 10:18:53',
    '2023-01-14 10:18:53',
    '2023-01-14 10:18:53',
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
    'Product List is clicked in navigation',
    'Click',
    '2023-01-14 10:18:59',
    '2023-01-14 10:18:59',
    '2023-01-14 10:18:59',
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
    'Add Product is clicked in navigation',
    'Click',
    '2023-01-14 10:19:07',
    '2023-01-14 10:19:07',
    '2023-01-14 10:19:07',
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
    'Purchase Order List is clicked in navigation',
    'Click',
    '2023-01-14 10:19:11',
    '2023-01-14 10:19:11',
    '2023-01-14 10:19:11',
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
    'Add Product is clicked in navigation',
    'Click',
    '2023-01-14 10:19:24',
    '2023-01-14 10:19:24',
    '2023-01-14 10:19:24',
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
    'Clicked Save in category.',
    'Click',
    '2023-01-14 10:20:17',
    '2023-01-14 10:20:17',
    '2023-01-14 10:20:17',
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
    'Clicked Save in category.',
    'Click',
    '2023-01-14 10:20:18',
    '2023-01-14 10:20:18',
    '2023-01-14 10:20:18',
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
    'Added Syrup in category.',
    'Create',
    '2023-01-14 10:20:20',
    '2023-01-14 10:20:20',
    '2023-01-14 10:20:20',
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
    'Clicked add in Syrup sub-category.',
    'Click',
    '2023-01-14 10:20:49',
    '2023-01-14 10:20:49',
    '2023-01-14 10:20:49',
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
    'Clicked add in Syrup sub-category.',
    'Click',
    '2023-01-14 10:20:50',
    '2023-01-14 10:20:50',
    '2023-01-14 10:20:50',
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
    'Added in Syrup sub-category.',
    'Create',
    '2023-01-14 10:20:51',
    '2023-01-14 10:20:51',
    '2023-01-14 10:20:51',
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
    'Clicked add in Add Supplier.',
    'Click',
    '2023-01-14 10:23:55',
    '2023-01-14 10:23:55',
    '2023-01-14 10:23:55',
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
    'Clicked add in Add Supplier.',
    'Click',
    '2023-01-14 10:23:55',
    '2023-01-14 10:23:55',
    '2023-01-14 10:23:55',
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
    'Added Syrup Supplier in Supplier',
    'Create',
    '2023-01-14 10:23:57',
    '2023-01-14 10:23:57',
    '2023-01-14 10:23:57',
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
    'Added Lagundi Syrup in Product',
    'Create',
    '2023-01-14 10:24:15',
    '2023-01-14 10:24:15',
    '2023-01-14 10:24:15',
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
    'Product List is clicked in navigation',
    'Click',
    '2023-01-14 10:24:19',
    '2023-01-14 10:24:19',
    '2023-01-14 10:24:19',
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
    'Purchase Order List is clicked in navigation',
    'Click',
    '2023-01-14 10:24:33',
    '2023-01-14 10:24:33',
    '2023-01-14 10:24:33',
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
    'Clicked Order All in PO List for Tablet Supplier',
    'Click',
    '2023-01-14 10:24:37',
    '2023-01-14 10:24:37',
    '2023-01-14 10:24:37',
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
    'Processed 2023014182437 in Purchase Order.',
    'Create',
    '2023-01-14 10:25:01',
    '2023-01-14 10:25:01',
    '2023-01-14 10:25:01',
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
    'Updated 2023014182437 in Purchase Order.',
    'Update',
    '2023-01-14 10:25:13',
    '2023-01-14 10:25:13',
    '2023-01-14 10:25:13',
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
    'Updated 2023014182437 in Purchase Order.',
    'Update',
    '2023-01-14 10:25:13',
    '2023-01-14 10:25:13',
    '2023-01-14 10:25:13',
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
    'Updated 2023014182437 in Purchase Order.',
    'Update',
    '2023-01-14 10:25:15',
    '2023-01-14 10:25:15',
    '2023-01-14 10:25:15',
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
    'Updated 2023014182437 in Purchase Order.',
    'Update',
    '2023-01-14 10:25:20',
    '2023-01-14 10:25:20',
    '2023-01-14 10:25:20',
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
    'Updated 2023014182437 status in Purchase Order.',
    'Update',
    '2023-01-14 10:25:23',
    '2023-01-14 10:25:23',
    '2023-01-14 10:25:23',
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
    'Updated 2023014182437 in Delivery.',
    'Update',
    '2023-01-14 10:25:35',
    '2023-01-14 10:25:35',
    '2023-01-14 10:25:35',
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
    'Updated 2023014182437 in Delivery.',
    'Update',
    '2023-01-14 10:25:35',
    '2023-01-14 10:25:35',
    '2023-01-14 10:25:35',
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
    'Master List is clicked in navigation',
    'Click',
    '2023-01-14 10:25:49',
    '2023-01-14 10:25:49',
    '2023-01-14 10:25:49',
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
    'Purchase Order List is clicked in navigation',
    'Click',
    '2023-01-14 10:26:04',
    '2023-01-14 10:26:04',
    '2023-01-14 10:26:04',
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
    'Clicked Order All in PO List for Syrup Supplier',
    'Click',
    '2023-01-14 10:26:06',
    '2023-01-14 10:26:06',
    '2023-01-14 10:26:06',
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
    'Processed 202301418266 in Purchase Order.',
    'Create',
    '2023-01-14 10:26:17',
    '2023-01-14 10:26:17',
    '2023-01-14 10:26:17',
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
    58,
    'Updated 202301418266 in Purchase Order.',
    'Update',
    '2023-01-14 10:26:35',
    '2023-01-14 10:26:35',
    '2023-01-14 10:26:35',
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
    59,
    'Updated 202301418266 in Purchase Order.',
    'Update',
    '2023-01-14 10:26:35',
    '2023-01-14 10:26:35',
    '2023-01-14 10:26:35',
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
    60,
    'Updated 202301418266 status in Purchase Order.',
    'Update',
    '2023-01-14 10:26:37',
    '2023-01-14 10:26:37',
    '2023-01-14 10:26:37',
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
    61,
    'Updated 202301418266 in Delivery.',
    'Update',
    '2023-01-14 10:26:46',
    '2023-01-14 10:26:46',
    '2023-01-14 10:26:46',
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
    62,
    'Master List is clicked in navigation',
    'Click',
    '2023-01-14 10:26:58',
    '2023-01-14 10:26:58',
    '2023-01-14 10:26:58',
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
    63,
    'Add Product is clicked in navigation',
    'Click',
    '2023-01-14 11:07:28',
    '2023-01-14 11:07:28',
    '2023-01-14 11:07:28',
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
    64,
    'Logged out successfully.',
    'Logged Out',
    '2023-01-14 11:08:01',
    '2023-01-14 11:08:01',
    '2023-01-14 11:08:01',
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
    65,
    'User logged in successfully.',
    'Logged in',
    '2023-01-14 11:12:26',
    '2023-01-14 11:12:26',
    '2023-01-14 11:12:26',
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
    66,
    'Category is clicked in navigation',
    'Click',
    '2023-01-14 11:12:41',
    '2023-01-14 11:12:41',
    '2023-01-14 11:12:41',
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
    67,
    'Clicked Add in category.',
    'Click',
    '2023-01-14 11:12:55',
    '2023-01-14 11:12:55',
    '2023-01-14 11:12:55',
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
    68,
    'Clicked Add in category.',
    'Click',
    '2023-01-14 11:12:55',
    '2023-01-14 11:12:55',
    '2023-01-14 11:12:55',
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
    69,
    'Added Liquid in category.',
    'Create',
    '2023-01-14 11:12:57',
    '2023-01-14 11:12:57',
    '2023-01-14 11:12:57',
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
    70,
    'Clicked add sub-category in category.',
    'Click',
    '2023-01-14 11:13:02',
    '2023-01-14 11:13:02',
    '2023-01-14 11:13:02',
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
    71,
    'Clicked add in Liquid sub-category.',
    'Click',
    '2023-01-14 11:13:40',
    '2023-01-14 11:13:40',
    '2023-01-14 11:13:40',
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
    72,
    'Clicked add in Liquid sub-category.',
    'Click',
    '2023-01-14 11:13:40',
    '2023-01-14 11:13:40',
    '2023-01-14 11:13:40',
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
    73,
    'Added in Liquid sub-category.',
    'Create',
    '2023-01-14 11:13:42',
    '2023-01-14 11:13:42',
    '2023-01-14 11:13:42',
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
    74,
    'Supplier is clicked in navigation',
    'Click',
    '2023-01-14 11:13:47',
    '2023-01-14 11:13:47',
    '2023-01-14 11:13:47',
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
    75,
    'Clicked Add in Supplier',
    'Click',
    '2023-01-14 11:14:01',
    '2023-01-14 11:14:01',
    '2023-01-14 11:14:01',
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
    76,
    'Clicked Add in Supplier',
    'Click',
    '2023-01-14 11:14:20',
    '2023-01-14 11:14:20',
    '2023-01-14 11:14:20',
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
    77,
    'Added Alcohol Supplier in Supplier',
    'Create',
    '2023-01-14 11:14:21',
    '2023-01-14 11:14:21',
    '2023-01-14 11:14:21',
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
    78,
    'VAT is clicked in navigation',
    'Click',
    '2023-01-14 11:14:52',
    '2023-01-14 11:14:52',
    '2023-01-14 11:14:52',
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
    79,
    'OR is clicked in navigation',
    'Click',
    '2023-01-14 11:14:57',
    '2023-01-14 11:14:57',
    '2023-01-14 11:14:57',
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
    80,
    'Discount is clicked in navigation',
    'Click',
    '2023-01-14 11:15:48',
    '2023-01-14 11:15:48',
    '2023-01-14 11:15:48',
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
    81,
    'Unit of Measure is clicked in navigation',
    'Click',
    '2023-01-14 11:16:13',
    '2023-01-14 11:16:13',
    '2023-01-14 11:16:13',
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
    82,
    'Added mg in Unit',
    'Create',
    '2023-01-14 11:16:24',
    '2023-01-14 11:16:24',
    '2023-01-14 11:16:24',
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
    83,
    'Add Product is clicked in navigation',
    'Click',
    '2023-01-14 11:16:48',
    '2023-01-14 11:16:48',
    '2023-01-14 11:16:48',
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
    84,
    'Clicked Save in category.',
    'Click',
    '2023-01-14 11:17:45',
    '2023-01-14 11:17:45',
    '2023-01-14 11:17:45',
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
    85,
    'Clicked Save in category.',
    'Click',
    '2023-01-14 11:17:46',
    '2023-01-14 11:17:46',
    '2023-01-14 11:17:46',
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
    86,
    'Added Capsule in category.',
    'Create',
    '2023-01-14 11:17:47',
    '2023-01-14 11:17:47',
    '2023-01-14 11:17:47',
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
    87,
    'Clicked add in Capsule sub-category.',
    'Click',
    '2023-01-14 11:19:01',
    '2023-01-14 11:19:01',
    '2023-01-14 11:19:01',
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
    88,
    'Clicked add in Capsule sub-category.',
    'Click',
    '2023-01-14 11:19:01',
    '2023-01-14 11:19:01',
    '2023-01-14 11:19:01',
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
    89,
    'Added in Capsule sub-category.',
    'Create',
    '2023-01-14 11:19:02',
    '2023-01-14 11:19:02',
    '2023-01-14 11:19:02',
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
    90,
    'Added Memo Plus Gold in Product',
    'Create',
    '2023-01-14 11:22:58',
    '2023-01-14 11:22:58',
    '2023-01-14 11:22:58',
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
    91,
    'Product List is clicked in navigation',
    'Click',
    '2023-01-14 11:23:05',
    '2023-01-14 11:23:05',
    '2023-01-14 11:23:05',
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
    92,
    'Supplier is clicked in navigation',
    'Click',
    '2023-01-14 11:23:17',
    '2023-01-14 11:23:17',
    '2023-01-14 11:23:17',
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
    93,
    'Category is clicked in navigation',
    'Click',
    '2023-01-14 11:23:18',
    '2023-01-14 11:23:18',
    '2023-01-14 11:23:18',
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
    94,
    'Product List is clicked in navigation',
    'Click',
    '2023-01-14 11:23:44',
    '2023-01-14 11:23:44',
    '2023-01-14 11:23:44',
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
    95,
    'Purchase Order List is clicked in navigation',
    'Click',
    '2023-01-14 11:25:41',
    '2023-01-14 11:25:41',
    '2023-01-14 11:25:41',
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
    96,
    'Clicked Order All in PO List for STI',
    'Click',
    '2023-01-14 11:26:49',
    '2023-01-14 11:26:49',
    '2023-01-14 11:26:49',
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
    97,
    'Processed 2023014192649 in Purchase Order.',
    'Create',
    '2023-01-14 11:27:52',
    '2023-01-14 11:27:52',
    '2023-01-14 11:27:52',
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
    98,
    'Purchase Order is clicked in navigation',
    'Click',
    '2023-01-14 11:28:47',
    '2023-01-14 11:28:47',
    '2023-01-14 11:28:47',
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
    99,
    'Purchase Order List is clicked in navigation',
    'Click',
    '2023-01-14 11:28:49',
    '2023-01-14 11:28:49',
    '2023-01-14 11:28:49',
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
    100,
    'Purchase Order List is clicked in navigation',
    'Click',
    '2023-01-14 11:28:53',
    '2023-01-14 11:28:53',
    '2023-01-14 11:28:53',
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
    101,
    'Purchase Order is clicked in navigation',
    'Click',
    '2023-01-14 11:28:56',
    '2023-01-14 11:28:56',
    '2023-01-14 11:28:56',
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
    102,
    'Stock Adjustment is clicked in navigation',
    'Click',
    '2023-01-14 11:29:08',
    '2023-01-14 11:29:08',
    '2023-01-14 11:29:08',
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
    103,
    'Purchase Order List is clicked in navigation',
    'Click',
    '2023-01-14 11:29:11',
    '2023-01-14 11:29:11',
    '2023-01-14 11:29:11',
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
    104,
    'Clicked Order All in PO List for STI',
    'Click',
    '2023-01-14 11:29:13',
    '2023-01-14 11:29:13',
    '2023-01-14 11:29:13',
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
    105,
    'POS is clicked in navigation',
    'Click',
    '2023-01-14 11:29:17',
    '2023-01-14 11:29:17',
    '2023-01-14 11:29:17',
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
    106,
    'Charge to Account is clicked in navigation',
    'Click',
    '2023-01-14 11:29:19',
    '2023-01-14 11:29:19',
    '2023-01-14 11:29:19',
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
    107,
    'Manage PO is clicked in navigation',
    'Click',
    '2023-01-14 11:29:28',
    '2023-01-14 11:29:28',
    '2023-01-14 11:29:28',
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
    108,
    'Updated 2023014192649 status in Purchase Order.',
    'Update',
    '2023-01-14 11:30:26',
    '2023-01-14 11:30:26',
    '2023-01-14 11:30:26',
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
    109,
    'Updated 2023014192649 in Delivery.',
    'Update',
    '2023-01-14 11:30:44',
    '2023-01-14 11:30:44',
    '2023-01-14 11:30:44',
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
    110,
    'Updated 2023014192649 in Delivery.',
    'Update',
    '2023-01-14 11:31:43',
    '2023-01-14 11:31:43',
    '2023-01-14 11:31:43',
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
    111,
    'Updated 2023014192649 in Delivery.',
    'Update',
    '2023-01-14 11:31:55',
    '2023-01-14 11:31:55',
    '2023-01-14 11:31:55',
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
    112,
    'POS is clicked in navigation',
    'Click',
    '2023-01-14 11:32:20',
    '2023-01-14 11:32:20',
    '2023-01-14 11:32:20',
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
    113,
    'Processed transaction 2023014193220 in POS.',
    'Create',
    '2023-01-14 11:36:33',
    '2023-01-14 11:36:33',
    '2023-01-14 11:36:33',
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
    114,
    'POS is clicked in navigation',
    'Click',
    '2023-01-14 11:38:06',
    '2023-01-14 11:38:06',
    '2023-01-14 11:38:06',
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
    115,
    'Product List is clicked in navigation',
    'Click',
    '2023-01-14 11:38:28',
    '2023-01-14 11:38:28',
    '2023-01-14 11:38:28',
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
    116,
    'Master List is clicked in navigation',
    'Click',
    '2023-01-14 11:38:42',
    '2023-01-14 11:38:42',
    '2023-01-14 11:38:42',
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
    117,
    'Sales List is clicked in navigation',
    'Click',
    '2023-01-14 11:39:04',
    '2023-01-14 11:39:04',
    '2023-01-14 11:39:04',
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
    118,
    'Purchase Order is clicked in navigation',
    'Click',
    '2023-01-14 11:39:10',
    '2023-01-14 11:39:10',
    '2023-01-14 11:39:10',
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
    119,
    'Audit Trail History is clicked in navigation',
    'Click',
    '2023-01-14 11:39:19',
    '2023-01-14 11:39:19',
    '2023-01-14 11:39:19',
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
    120,
    'Delivery List is clicked in navigation',
    'Click',
    '2023-01-14 11:39:58',
    '2023-01-14 11:39:58',
    '2023-01-14 11:39:58',
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
    121,
    'Master List is clicked in navigation',
    'Click',
    '2023-01-14 11:41:03',
    '2023-01-14 11:41:03',
    '2023-01-14 11:41:03',
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
    122,
    'Purchase Order is clicked in navigation',
    'Click',
    '2023-01-14 11:42:52',
    '2023-01-14 11:42:52',
    '2023-01-14 11:42:52',
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
    123,
    'Processed 2023014194252 in Purchase Order.',
    'Create',
    '2023-01-14 11:43:17',
    '2023-01-14 11:43:17',
    '2023-01-14 11:43:17',
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
    124,
    'Updated 2023014194252 status in Purchase Order.',
    'Update',
    '2023-01-14 11:43:50',
    '2023-01-14 11:43:50',
    '2023-01-14 11:43:50',
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
    125,
    'Updated 2023014194252 in Delivery.',
    'Update',
    '2023-01-14 11:44:53',
    '2023-01-14 11:44:53',
    '2023-01-14 11:44:53',
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
    126,
    'Updated 2023014194252 in Delivery.',
    'Update',
    '2023-01-14 11:45:07',
    '2023-01-14 11:45:07',
    '2023-01-14 11:45:07',
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
    127,
    'Master List is clicked in navigation',
    'Click',
    '2023-01-14 11:45:17',
    '2023-01-14 11:45:17',
    '2023-01-14 11:45:17',
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
    128,
    'POS is clicked in navigation',
    'Click',
    '2023-01-14 11:46:23',
    '2023-01-14 11:46:23',
    '2023-01-14 11:46:23',
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
    129,
    'Processed transaction 2023014194623 in POS.',
    'Create',
    '2023-01-14 11:46:49',
    '2023-01-14 11:46:49',
    '2023-01-14 11:46:49',
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
    130,
    'Master List is clicked in navigation',
    'Click',
    '2023-01-14 11:46:54',
    '2023-01-14 11:46:54',
    '2023-01-14 11:46:54',
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
    131,
    'Stock Adjustment is clicked in navigation',
    'Click',
    '2023-01-14 11:47:38',
    '2023-01-14 11:47:38',
    '2023-01-14 11:47:38',
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
    132,
    'Created a product adjustment for Memo Plus Gold.',
    'Create',
    '2023-01-14 11:52:25',
    '2023-01-14 11:52:25',
    '2023-01-14 11:52:25',
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
    133,
    'Return History is clicked in navigation',
    'Click',
    '2023-01-14 11:52:32',
    '2023-01-14 11:52:32',
    '2023-01-14 11:52:32',
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
    134,
    'Stock Adjustment History is clicked in navigation',
    'Click',
    '2023-01-14 11:52:36',
    '2023-01-14 11:52:36',
    '2023-01-14 11:52:36',
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
    135,
    'Charge to Account is clicked in navigation',
    'Click',
    '2023-01-14 11:53:17',
    '2023-01-14 11:53:17',
    '2023-01-14 11:53:17',
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
    136,
    'NCM/Doctors List is clicked in navigation',
    'Click',
    '2023-01-14 11:54:52',
    '2023-01-14 11:54:52',
    '2023-01-14 11:54:52',
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
    137,
    'Charge to Account is clicked in navigation',
    'Click',
    '2023-01-14 11:55:01',
    '2023-01-14 11:55:01',
    '2023-01-14 11:55:01',
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
    138,
    'Processed 2023014195850 in Charge to Account',
    'Create',
    '2023-01-14 11:59:50',
    '2023-01-14 11:59:50',
    '2023-01-14 11:59:50',
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
    139,
    'Charge to Account is clicked in navigation',
    'Click',
    '2023-01-14 12:00:01',
    '2023-01-14 12:00:01',
    '2023-01-14 12:00:01',
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
    140,
    'Charge to Accounts List is clicked in navigation',
    'Click',
    '2023-01-14 12:03:57',
    '2023-01-14 12:03:57',
    '2023-01-14 12:03:57',
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
    141,
    'Return List is clicked in navigation',
    'Click',
    '2023-01-14 12:05:23',
    '2023-01-14 12:05:23',
    '2023-01-14 12:05:23',
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
    142,
    'Charge to Accounts List is clicked in navigation',
    'Click',
    '2023-01-14 12:06:15',
    '2023-01-14 12:06:15',
    '2023-01-14 12:06:15',
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
    143,
    'Charge to Accounts List is clicked in navigation',
    'Click',
    '2023-01-14 12:08:16',
    '2023-01-14 12:08:16',
    '2023-01-14 12:08:16',
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
    144,
    'NCM/Doctors List is clicked in navigation',
    'Click',
    '2023-01-14 12:14:03',
    '2023-01-14 12:14:03',
    '2023-01-14 12:14:03',
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
    145,
    'Charge to Accounts List is clicked in navigation',
    'Click',
    '2023-01-14 12:14:21',
    '2023-01-14 12:14:21',
    '2023-01-14 12:14:21',
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
    146,
    'NCM/Doctors List is clicked in navigation',
    'Click',
    '2023-01-14 12:14:37',
    '2023-01-14 12:14:37',
    '2023-01-14 12:14:37',
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
    147,
    'Charge to Account is clicked in navigation',
    'Click',
    '2023-01-14 12:15:06',
    '2023-01-14 12:15:06',
    '2023-01-14 12:15:06',
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
    148,
    'POS is clicked in navigation',
    'Click',
    '2023-01-14 12:15:54',
    '2023-01-14 12:15:54',
    '2023-01-14 12:15:54',
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
    149,
    'Processed transaction 2023014201554 in POS.',
    'Create',
    '2023-01-14 12:20:03',
    '2023-01-14 12:20:03',
    '2023-01-14 12:20:03',
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
    150,
    'Add User is clicked in navigation',
    'Click',
    '2023-01-14 12:21:53',
    '2023-01-14 12:21:53',
    '2023-01-14 12:21:53',
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
    151,
    'Logged out successfully.',
    'Logged Out',
    '2023-01-14 12:24:39',
    '2023-01-14 12:24:39',
    '2023-01-14 12:24:39',
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
    152,
    'User logged in successfully.',
    'Logged in',
    '2023-01-14 12:28:20',
    '2023-01-14 12:28:20',
    '2023-01-14 12:28:20',
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
    153,
    'User List is clicked in navigation',
    'Click',
    '2023-01-14 12:28:25',
    '2023-01-14 12:28:25',
    '2023-01-14 12:28:25',
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
    154,
    'Backup and Restore is clicked in navigation',
    'Click',
    '2023-01-14 12:29:05',
    '2023-01-14 12:29:05',
    '2023-01-14 12:29:05',
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
    155,
    'Backup the database.',
    'Backup',
    '2023-01-14 12:29:35',
    '2023-01-14 12:29:35',
    '2023-01-14 12:29:35',
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
    'Tablet',
    '2023-01-14 10:08:06',
    '2023-01-14 10:08:06'
  );
INSERT INTO
  `categories` (`id`, `CategoryName`, `createdAt`, `updatedAt`)
VALUES
  (
    2,
    'Syrup',
    '2023-01-14 10:20:20',
    '2023-01-14 10:20:20'
  );
INSERT INTO
  `categories` (`id`, `CategoryName`, `createdAt`, `updatedAt`)
VALUES
  (
    3,
    'Liquid',
    '2023-01-14 11:12:57',
    '2023-01-14 11:12:57'
  );
INSERT INTO
  `categories` (`id`, `CategoryName`, `createdAt`, `updatedAt`)
VALUES
  (
    4,
    'Capsule',
    '2023-01-14 11:17:47',
    '2023-01-14 11:17:47'
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
    '2023-01-14 10:06:32',
    '2023-01-14 10:06:32'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: handlers
# ------------------------------------------------------------

INSERT INTO
  `handlers` (
    `id`,
    `Category`,
    `FirstName`,
    `LastName`,
    `Sex`,
    `City`,
    `ZIP`,
    `Address`,
    `Mobile`,
    `Email`,
    `CreditLimit`,
    `Balance`,
    `OnHold`,
    `createdAt`,
    `updatedAt`
  )
VALUES
  (
    1,
    'Doctor',
    'Talon',
    'GH',
    'Male',
    '',
    '',
    'Tarlac',
    '09098717874',
    '',
    1000,
    901,
    0,
    '2023-01-14 11:54:32',
    '2023-01-14 11:58:11'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: invoice_details
# ------------------------------------------------------------

INSERT INTO
  `invoice_details` (
    `id`,
    `UnitPrice`,
    `Quantity`,
    `Total`,
    `Status`,
    `createdAt`,
    `updatedAt`,
    `medicineId`,
    `invoiceId`
  )
VALUES
  (
    1,
    100.1,
    9,
    900.9,
    'pending',
    '2023-01-14 11:59:50',
    '2023-01-14 11:59:50',
    4,
    1
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: invoices
# ------------------------------------------------------------

INSERT INTO
  `invoices` (
    `id`,
    `InvoiceNo`,
    `ORNumber`,
    `InvoiceDate`,
    `DueDate`,
    `PaidDate`,
    `VAT`,
    `GrossAmount`,
    `Total`,
    `PaidAmount`,
    `Balance`,
    `Status`,
    `Remarks`,
    `createdAt`,
    `updatedAt`,
    `patientId`,
    `handlerId`,
    `userId`
  )
VALUES
  (
    1,
    '2023014195850',
    1003,
    '2023-01-14 11:58:50',
    '2023-01-21 00:00:00',
    '2023-01-14 12:14:32',
    96.52,
    804.38,
    900.9,
    900.9,
    0,
    'paid',
    'Charge Upon Use',
    '2023-01-14 11:59:50',
    '2023-01-14 12:14:32',
    1,
    1,
    1
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
    '001',
    'Paracetamol',
    '500mg',
    '',
    15,
    25,
    100,
    30,
    10,
    1,
    '2023-01-14 10:16:18',
    '2023-01-14 10:18:41',
    1,
    1,
    1
  );
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
    2,
    '002',
    'Neozep',
    '500mg',
    '',
    15,
    25,
    100,
    30,
    10,
    1,
    '2023-01-14 10:17:53',
    '2023-01-14 10:18:53',
    1,
    1,
    1
  );
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
    3,
    '003',
    'Lagundi Syrup',
    '100mL',
    '',
    150,
    160,
    100,
    30,
    10,
    1,
    '2023-01-14 10:24:15',
    '2023-01-14 10:24:15',
    2,
    2,
    2
  );
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
    4,
    '555',
    'Memo Plus Gold',
    'Memo Plus Gold 500mg',
    'Memo Plus',
    100,
    100.1,
    20,
    30,
    10,
    1,
    '2023-01-14 11:22:58',
    '2023-01-14 11:22:58',
    3,
    1,
    4
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
    1000,
    1999,
    1005,
    '2023-01-14 10:06:32',
    '2023-01-14 10:07:08'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: patients
# ------------------------------------------------------------

INSERT INTO
  `patients` (
    `id`,
    `FirstName`,
    `LastName`,
    `Sex`,
    `DateOfBirth`,
    `City`,
    `ZIP`,
    `Address`,
    `FirstVisit`,
    `Mobile`,
    `EmergencyContact`,
    `isSenior`,
    `SeniorId`,
    `Note`,
    `createdAt`,
    `updatedAt`,
    `handlerId`
  )
VALUES
  (
    1,
    'Andrei',
    'Florentino',
    'Male',
    '2023-01-14 00:00:00',
    '',
    '',
    'Tarlac',
    '2023-01-14 00:00:00',
    '09098717874',
    '',
    0,
    '',
    '',
    '2023-01-14 11:56:28',
    '2023-01-14 11:56:28',
    1
  );
INSERT INTO
  `patients` (
    `id`,
    `FirstName`,
    `LastName`,
    `Sex`,
    `DateOfBirth`,
    `City`,
    `ZIP`,
    `Address`,
    `FirstVisit`,
    `Mobile`,
    `EmergencyContact`,
    `isSenior`,
    `SeniorId`,
    `Note`,
    `createdAt`,
    `updatedAt`,
    `handlerId`
  )
VALUES
  (
    2,
    'Mark Darius',
    'Pagaduan',
    'Male',
    '2023-01-01 00:00:00',
    '',
    '',
    'Tarlac',
    '2023-01-14 00:00:00',
    '09123456789',
    '',
    0,
    '',
    '',
    '2023-01-14 12:00:30',
    '2023-01-14 12:00:30',
    1
  );

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
    100,
    100,
    1500,
    '2023-01-14 10:25:35',
    'received',
    '2023-01-14 10:25:01',
    '2023-01-14 10:25:35',
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
    100,
    100,
    1500,
    '2023-01-14 10:25:35',
    'received',
    '2023-01-14 10:25:01',
    '2023-01-14 10:25:35',
    1,
    2
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
    100,
    100,
    15000,
    '2023-01-14 10:26:46',
    'received',
    '2023-01-14 10:26:17',
    '2023-01-14 10:26:46',
    2,
    3
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
    20,
    20,
    2002,
    '2023-01-14 11:31:55',
    'received',
    '2023-01-14 11:27:52',
    '2023-01-14 11:31:55',
    3,
    4
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
    5,
    40,
    40,
    4000,
    '2023-01-14 11:45:07',
    'received',
    '2023-01-14 11:43:17',
    '2023-01-14 11:45:07',
    4,
    4
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
    '2023014182437',
    2,
    3000,
    '2023-01-14 10:24:37',
    'settled',
    '2023-01-14 10:25:01',
    '2023-01-14 10:25:35',
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
    '202301418266',
    1,
    15000,
    '2023-01-14 10:26:06',
    'settled',
    '2023-01-14 10:26:17',
    '2023-01-14 10:26:46',
    2
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
    '2023014192649',
    1,
    2000,
    '2023-01-14 11:26:49',
    'settled',
    '2023-01-14 11:27:52',
    '2023-01-14 11:31:56',
    3
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
    '2023014194252',
    1,
    4000,
    '2023-01-14 11:42:52',
    'settled',
    '2023-01-14 11:43:17',
    '2023-01-14 11:45:07',
    3
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
    '2023-01-14 10:06:32',
    '2023-01-14 10:06:32'
  );
INSERT INTO
  `role_groups` (`id`, `RoleName`, `Role`, `createdAt`, `updatedAt`)
VALUES
  (
    2,
    'user',
    'user',
    '2023-01-14 10:06:32',
    '2023-01-14 10:06:32'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sales
# ------------------------------------------------------------

INSERT INTO
  `sales` (
    `id`,
    `OrderNo`,
    `ORNumber`,
    `OrderDate`,
    `CustomerName`,
    `Discount`,
    `VAT`,
    `GrossAmount`,
    `Total`,
    `CashTendered`,
    `ChangeAmount`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    1,
    '2023014193220',
    1001,
    '2023-01-14 11:32:20',
    'Walk in',
    0,
    257.4,
    2145,
    2402.4,
    3000,
    597.6,
    '2023-01-14 11:36:33',
    '2023-01-14 11:36:33',
    1
  );
INSERT INTO
  `sales` (
    `id`,
    `OrderNo`,
    `ORNumber`,
    `OrderDate`,
    `CustomerName`,
    `Discount`,
    `VAT`,
    `GrossAmount`,
    `Total`,
    `CashTendered`,
    `ChangeAmount`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    2,
    '2023014194623',
    1002,
    '2023-01-14 11:46:23',
    'Walk in',
    0,
    64.35,
    536.25,
    600.6,
    605,
    4.4,
    '2023-01-14 11:46:49',
    '2023-01-14 11:46:49',
    1
  );
INSERT INTO
  `sales` (
    `id`,
    `OrderNo`,
    `ORNumber`,
    `OrderDate`,
    `CustomerName`,
    `Discount`,
    `VAT`,
    `GrossAmount`,
    `Total`,
    `CashTendered`,
    `ChangeAmount`,
    `createdAt`,
    `updatedAt`,
    `userId`
  )
VALUES
  (
    3,
    '2023014201554',
    1004,
    '2023-01-14 12:15:54',
    'Walk in',
    17.88,
    10.72,
    89.38,
    71.5,
    100,
    28.5,
    '2023-01-14 12:20:03',
    '2023-01-14 12:20:03',
    1
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sales_details
# ------------------------------------------------------------

INSERT INTO
  `sales_details` (
    `id`,
    `UnitPrice`,
    `Quantity`,
    `Total`,
    `createdAt`,
    `updatedAt`,
    `medicineId`,
    `saleId`
  )
VALUES
  (
    1,
    100.1,
    24,
    2402.4,
    '2023-01-14 11:36:33',
    '2023-01-14 11:36:33',
    4,
    1
  );
INSERT INTO
  `sales_details` (
    `id`,
    `UnitPrice`,
    `Quantity`,
    `Total`,
    `createdAt`,
    `updatedAt`,
    `medicineId`,
    `saleId`
  )
VALUES
  (
    2,
    100.1,
    6,
    600.6,
    '2023-01-14 11:46:49',
    '2023-01-14 11:46:49',
    4,
    2
  );
INSERT INTO
  `sales_details` (
    `id`,
    `UnitPrice`,
    `Quantity`,
    `Total`,
    `createdAt`,
    `updatedAt`,
    `medicineId`,
    `saleId`
  )
VALUES
  (
    3,
    100.1,
    1,
    100.1,
    '2023-01-14 12:20:03',
    '2023-01-14 12:20:03',
    4,
    3
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: stock_adjustments
# ------------------------------------------------------------

INSERT INTO
  `stock_adjustments` (
    `id`,
    `Mode`,
    `DateCreated`,
    `Quantity`,
    `Reason`,
    `createdAt`,
    `updatedAt`,
    `medicineId`,
    `userId`
  )
VALUES
  (
    1,
    'subtract',
    '2023-01-14 11:47:38',
    50,
    'System bug',
    '2023-01-14 11:52:25',
    '2023-01-14 11:52:25',
    4,
    1
  );

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
    'Compressed Tablet',
    10,
    'amount',
    '2023-01-14 10:09:48',
    '2023-01-14 10:09:48',
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
    'Flavored Syrup',
    10,
    'amount',
    '2023-01-14 10:20:51',
    '2023-01-14 10:20:51',
    2
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
    3,
    'Alcohol',
    10,
    '%',
    '2023-01-14 11:13:42',
    '2023-01-14 11:13:42',
    3
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
    4,
    'Supplement',
    10,
    '%',
    '2023-01-14 11:19:02',
    '2023-01-14 11:19:02',
    4
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
    'Tablet Supplier',
    'John Andrei Florentino',
    'Tarlac',
    '09123564789',
    NULL,
    '',
    '2023-01-14 10:14:25',
    '2023-01-14 10:14:25'
  );
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
    2,
    'Syrup Supplier',
    'Mohammad umpat',
    'Tarlac',
    '09493762924',
    NULL,
    '',
    '2023-01-14 10:23:57',
    '2023-01-14 10:23:57'
  );
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
    3,
    'STI',
    'John Andrei Florentino',
    'Tarlac',
    '09098717874',
    NULL,
    '',
    '2023-01-14 11:14:21',
    '2023-01-14 11:14:45'
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
    'mg',
    '2023-01-14 10:10:50',
    '2023-01-14 10:18:19'
  );
INSERT INTO
  `units` (`id`, `UnitName`, `createdAt`, `updatedAt`)
VALUES
  (
    2,
    'mL',
    '2023-01-14 10:23:10',
    '2023-01-14 10:23:10'
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
    '$2a$08$zm7b9iI7rCVre536/4ebJu4S3KXXXsuLVEvDthTl0MgNtKoUP0Nla',
    'maintenance;inventory;sales;reports;utilities',
    0,
    '2023-01-14 10:06:32',
    '2023-01-14 10:06:32',
    1
  );
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
    2,
    'STI',
    'Tarlac',
    'sti',
    '$2a$08$gYVpX2vX.5DX8ygiMb9vtuCdfWC/FuZvip6eKAQjrGFFm4OuzcUl2',
    '',
    0,
    '2023-01-14 12:24:34',
    '2023-01-14 12:28:30',
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
    '2023-01-14 10:06:32',
    '2023-01-14 10:06:32'
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
