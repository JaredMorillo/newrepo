-- Step 1: Insert a new record into the account table
INSERT INTO TABLE account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- Step 2: Modify Tony Stark's account_type to "Admin"
UPDATE account
SET account_type = 'Admin'
WHERE account_email = 'tony@starkent.com';

-- Step 3: Delete the Tony Stark record from the database
DELETE FROM account
WHERE account_email = 'tony@starkent.com';

-- Step 4: Update the "GM Hummer" description using REPLACE
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- Step 5: Inner join to select make, model, and classification name for the "Sport" category
SELECT inv_make, inv_model, classification_name
FROM inventory i
INNER JOIN classification c ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';

-- Step 6: Update all inventory records to add "/vehicles" to the image paths
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
