/*
  Warnings:

  - Added the required column `amount` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
