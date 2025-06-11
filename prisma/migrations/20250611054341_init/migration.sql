-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "emile" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_emile_key" ON "user"("emile");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_number_key" ON "user"("phone_number");
