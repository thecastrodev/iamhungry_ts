-- DropForeignKey
ALTER TABLE "products_in_sales" DROP CONSTRAINT "products_in_sales_product_id_fkey";

-- DropForeignKey
ALTER TABLE "products_in_sales" DROP CONSTRAINT "products_in_sales_sale_id_fkey";

-- AddForeignKey
ALTER TABLE "products_in_sales" ADD CONSTRAINT "products_in_sales_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_in_sales" ADD CONSTRAINT "products_in_sales_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
