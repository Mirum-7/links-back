-- CreateTable
CREATE TABLE "Links" (
    "id" BIGSERIAL NOT NULL,
    "uriHash" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "expiredAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Links_uriHash_key" ON "Links"("uriHash");

-- CreateIndex
CREATE INDEX "Links_uriHash_idx" ON "Links"("uriHash");
