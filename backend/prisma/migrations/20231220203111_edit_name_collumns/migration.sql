/*
  Warnings:

  - The primary key for the `products_in_sales` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `productId` on the `products_in_sales` table. All the data in the column will be lost.
  - You are about to drop the column `saleId` on the `products_in_sales` table. All the data in the column will be lost.
  - You are about to drop the column `assignedAt` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_adresses` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_informations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `sales` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `user_adresses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `user_informations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_id` to the `products_in_sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sale_id` to the `products_in_sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_adresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_informations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products_in_sales" DROP CONSTRAINT "products_in_sales_productId_fkey";

-- DropForeignKey
ALTER TABLE "products_in_sales" DROP CONSTRAINT "products_in_sales_saleId_fkey";

-- DropForeignKey
ALTER TABLE "sales" DROP CONSTRAINT "sales_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_adresses" DROP CONSTRAINT "user_adresses_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_informations" DROP CONSTRAINT "user_informations_userId_fkey";

-- DropIndex
DROP INDEX "sales_userId_key";

-- DropIndex
DROP INDEX "user_adresses_userId_key";

-- DropIndex
DROP INDEX "user_informations_userId_key";

-- AlterTable
ALTER TABLE "products_in_sales" DROP CONSTRAINT "products_in_sales_pkey",
DROP COLUMN "productId",
DROP COLUMN "saleId",
ADD COLUMN     "product_id" TEXT NOT NULL,
ADD COLUMN     "sale_id" TEXT NOT NULL,
ADD CONSTRAINT "products_in_sales_pkey" PRIMARY KEY ("sale_id", "product_id");

-- AlterTable
ALTER TABLE "sales" DROP COLUMN "assignedAt",
DROP COLUMN "userId",
ADD COLUMN     "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_adresses" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_informations" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sales_user_id_key" ON "sales"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_adresses_user_id_key" ON "user_adresses"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_informations_user_id_key" ON "user_informations"("user_id");

-- AddForeignKey
ALTER TABLE "user_informations" ADD CONSTRAINT "user_informations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_adresses" ADD CONSTRAINT "user_adresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_in_sales" ADD CONSTRAINT "products_in_sales_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_in_sales" ADD CONSTRAINT "products_in_sales_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
