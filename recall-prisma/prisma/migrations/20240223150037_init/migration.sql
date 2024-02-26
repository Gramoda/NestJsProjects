-- CreateTable
CREATE TABLE "Description" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Description_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Description_productId_key" ON "Description"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_id_key" ON "Reviews"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToTag_AB_unique" ON "_ProductToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToTag_B_index" ON "_ProductToTag"("B");

-- AddForeignKey
ALTER TABLE "Description" ADD CONSTRAINT "Description_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToTag" ADD CONSTRAINT "_ProductToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToTag" ADD CONSTRAINT "_ProductToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
