using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CarDealerProject.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppRole",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppRole", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppRoleClaims", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUserClaims", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppUserLogins",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LoginProvider = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProviderKey = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUserLogins", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "AppUserRoles",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    RoleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUserRoles", x => new { x.UserId, x.RoleId });
                });

            migrationBuilder.CreateTable(
                name: "AppUserTokens",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LoginProvider = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUserTokens", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "CarEquipmentEntity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarEquipmentEntity", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DealerEntity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Latitude = table.Column<decimal>(type: "decimal(20,17)", nullable: false),
                    Longtitude = table.Column<decimal>(type: "decimal(20,17)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DealerEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DealerPhone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DealerWebsite = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DealerEntity", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ImageEntity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImageName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImageSrc = table.Column<string>(type: "varchar(max)", nullable: true),
                    InsertedOn = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImageEntity", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ServiceEntity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceEntity", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TypeEntity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeEntity", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppUser",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true, computedColumnSql: "'MB'+CAST((RIGHT('0000'+CONVERT(varchar(20),[Id]),4)) as varchar(200))"),
                    DealerName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DealerId = table.Column<int>(type: "int", nullable: true),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Dob = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<int>(type: "int", nullable: false),
                    IsDisabled = table.Column<bool>(type: "bit", nullable: false),
                    CountDuplicate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastNameFirstChar = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsFirstLogin = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    ImageId = table.Column<int>(type: "int", nullable: true),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true, computedColumnSql: "REPLACE( ( ( LOWER ([FirstName]) ) +( LOWER ( [LastNameFirstChar] )  ) ) ,' ','') +CAST( [CountDuplicate] as varchar(200) )"),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(max)", nullable: true, computedColumnSql: "UPPER([FirstName])+UPPER([LastNameFirstChar])+CAST( [CountDuplicate] as varchar(200) )"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(max)", nullable: true, computedColumnSql: "UPPER([Email])"),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUser", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppUser_DealerEntity_DealerId",
                        column: x => x.DealerId,
                        principalTable: "DealerEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppUser_ImageEntity_ImageId",
                        column: x => x.ImageId,
                        principalTable: "ImageEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DealerEntityServiceEntity",
                columns: table => new
                {
                    DealersId = table.Column<int>(type: "int", nullable: false),
                    ServicesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DealerEntityServiceEntity", x => new { x.DealersId, x.ServicesId });
                    table.ForeignKey(
                        name: "FK_DealerEntityServiceEntity_DealerEntity_DealersId",
                        column: x => x.DealersId,
                        principalTable: "DealerEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DealerEntityServiceEntity_ServiceEntity_ServicesId",
                        column: x => x.ServicesId,
                        principalTable: "ServiceEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ModelEntity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StartPrice = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TypeId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ModelEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ModelEntity_TypeEntity_TypeId",
                        column: x => x.TypeId,
                        principalTable: "TypeEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "BookingEntity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ModelId = table.Column<int>(type: "int", nullable: true),
                    DealerId = table.Column<int>(type: "int", nullable: true),
                    Appointment = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TimePeriod = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookingEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BookingEntity_DealerEntity_DealerId",
                        column: x => x.DealerId,
                        principalTable: "DealerEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BookingEntity_ModelEntity_ModelId",
                        column: x => x.ModelId,
                        principalTable: "ModelEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CarEntity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Date = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TypeId = table.Column<int>(type: "int", nullable: true),
                    ModelId = table.Column<int>(type: "int", nullable: true),
                    Color = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FuelType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Power = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MaximumSpeed = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Length = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Width = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Torque = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Upholstery = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Transmission = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Acceleration = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Weight = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Height = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Displacement = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DealerId = table.Column<int>(type: "int", nullable: true),
                    IsAvailble = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CarEntity_DealerEntity_DealerId",
                        column: x => x.DealerId,
                        principalTable: "DealerEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CarEntity_ModelEntity_ModelId",
                        column: x => x.ModelId,
                        principalTable: "ModelEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CarEntity_TypeEntity_TypeId",
                        column: x => x.TypeId,
                        principalTable: "TypeEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ImageEntityModelEntity",
                columns: table => new
                {
                    ImagesId = table.Column<int>(type: "int", nullable: false),
                    ModelsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImageEntityModelEntity", x => new { x.ImagesId, x.ModelsId });
                    table.ForeignKey(
                        name: "FK_ImageEntityModelEntity_ImageEntity_ImagesId",
                        column: x => x.ImagesId,
                        principalTable: "ImageEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ImageEntityModelEntity_ModelEntity_ModelsId",
                        column: x => x.ModelsId,
                        principalTable: "ModelEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CarEntityCarEquipmentEntity",
                columns: table => new
                {
                    CarsId = table.Column<int>(type: "int", nullable: false),
                    EquipmentsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarEntityCarEquipmentEntity", x => new { x.CarsId, x.EquipmentsId });
                    table.ForeignKey(
                        name: "FK_CarEntityCarEquipmentEntity_CarEntity_CarsId",
                        column: x => x.CarsId,
                        principalTable: "CarEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CarEntityCarEquipmentEntity_CarEquipmentEntity_EquipmentsId",
                        column: x => x.EquipmentsId,
                        principalTable: "CarEquipmentEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CarEntityImageEntity",
                columns: table => new
                {
                    CarsId = table.Column<int>(type: "int", nullable: false),
                    ImagesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarEntityImageEntity", x => new { x.CarsId, x.ImagesId });
                    table.ForeignKey(
                        name: "FK_CarEntityImageEntity_CarEntity_CarsId",
                        column: x => x.CarsId,
                        principalTable: "CarEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CarEntityImageEntity_ImageEntity_ImagesId",
                        column: x => x.ImagesId,
                        principalTable: "ImageEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AppRole",
                columns: new[] { "Id", "ConcurrencyStamp", "Description", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { 1, "31BF5413-8303-4E21-8D3A-10099FCA95FE", "Head master", "Master", "MASTER" },
                    { 2, "94BD65EE-DE64-4476-91AA-6258155DE018", "Administrator", "Admin", "ADMIN" },
                    { 3, "33BS77SS-DE64-4476-91AA-6258155DE018", "Just Staff", "Staff", "STAFF" }
                });

            migrationBuilder.InsertData(
                table: "AppUser",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "CountDuplicate", "DealerId", "DealerName", "Dob", "Email", "EmailConfirmed", "FirstName", "Gender", "ImageId", "IsDisabled", "LastName", "LastNameFirstChar", "LockoutEnabled", "LockoutEnd", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "Type" },
                values: new object[,]
                {
                    { 1, 0, "f99461ee-4644-4148-8874-b4ab37562be3", "", null, null, new DateTime(2000, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "aaaa@gmail.com", false, "Nghia", "Male", null, true, "Le Trung", "LT", false, null, "AQAAAAEAACcQAAAAEBq/+hPonu3IIEDQw94Cins2vgQcOYU4S+EOGT9HiCg1BF/HV1EBcfbb34AIP0xS5Q==", null, false, "VR77OGQ2ABQ5VRWTTDEMHBLJEKS57OYD", false, 0 },
                    { 2, 0, "f99461ee-4644-4148-8874-b4ab37562be3", "", null, null, new DateTime(2000, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "bbbb@gmail.com", false, "Dai", "Male", null, true, "Pham Ngoc", "pn", false, null, "AQAAAAEAACcQAAAAEBq/+hPonu3IIEDQw94Cins2vgQcOYU4S+EOGT9HiCg1BF/HV1EBcfbb34AIP0xS5Q==", null, false, "VR77OGQ2ABQ5VRWTTDEMHBLJEKS57OYD", false, 1 }
                });

            migrationBuilder.InsertData(
                table: "AppUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 2, 2 }
                });

            migrationBuilder.InsertData(
                table: "DealerEntity",
                columns: new[] { "Id", "DealerEmail", "DealerPhone", "DealerWebsite", "Description", "Latitude", "Longtitude", "Name" },
                values: new object[] { 1, "aa@gmail.com", "0933162211", "https://www.langha.haxaco.mercedes-benz.com.vn/", "46 Lang Ha, Thanh Cong, Ba Dinh, Ha Noi 280000, Viet Nam", 21.01420642227430200m, 105.81289849755275000m, "Mercedes-Benz Haxaco Lang Ha - PKD" });

            migrationBuilder.InsertData(
                table: "ImageEntity",
                columns: new[] { "Id", "ImageName", "ImageSrc", "InsertedOn" },
                values: new object[] { 1, "Capture.PNG", "https://localhost:5001/Images/Capture.PNG", new DateTime(2021, 10, 5, 0, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.InsertData(
                table: "TypeEntity",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[,]
                {
                    { 1, "A sedan or saloon is a passenger car in a three-box configuration with separate compartments for engine, passenger, and cargo", "Sedan" },
                    { 2, "A sport utility vehicle or SUV is a car classification that combines elements of road-going passenger cars with features from off-road vehicles, such as raised ground clearance and four-wheel drive.", "SUV" },
                    { 3, "A coupe or coupé is a passenger car with a sloping or truncated rear roofline and two doors", "Coupe" },
                    { 4, "MPV stands for Multi-Purpose Vehicle. They have tall, box-like bodies designed to create as much interior space as possible and often have more seats than a comparable hatchback or saloon.", "Van/MPV" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppUser_DealerId",
                table: "AppUser",
                column: "DealerId");

            migrationBuilder.CreateIndex(
                name: "IX_AppUser_ImageId",
                table: "AppUser",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_BookingEntity_DealerId",
                table: "BookingEntity",
                column: "DealerId");

            migrationBuilder.CreateIndex(
                name: "IX_BookingEntity_ModelId",
                table: "BookingEntity",
                column: "ModelId");

            migrationBuilder.CreateIndex(
                name: "IX_CarEntity_DealerId",
                table: "CarEntity",
                column: "DealerId");

            migrationBuilder.CreateIndex(
                name: "IX_CarEntity_ModelId",
                table: "CarEntity",
                column: "ModelId");

            migrationBuilder.CreateIndex(
                name: "IX_CarEntity_TypeId",
                table: "CarEntity",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_CarEntityCarEquipmentEntity_EquipmentsId",
                table: "CarEntityCarEquipmentEntity",
                column: "EquipmentsId");

            migrationBuilder.CreateIndex(
                name: "IX_CarEntityImageEntity_ImagesId",
                table: "CarEntityImageEntity",
                column: "ImagesId");

            migrationBuilder.CreateIndex(
                name: "IX_DealerEntityServiceEntity_ServicesId",
                table: "DealerEntityServiceEntity",
                column: "ServicesId");

            migrationBuilder.CreateIndex(
                name: "IX_ImageEntityModelEntity_ModelsId",
                table: "ImageEntityModelEntity",
                column: "ModelsId");

            migrationBuilder.CreateIndex(
                name: "IX_ModelEntity_TypeId",
                table: "ModelEntity",
                column: "TypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppRole");

            migrationBuilder.DropTable(
                name: "AppRoleClaims");

            migrationBuilder.DropTable(
                name: "AppUser");

            migrationBuilder.DropTable(
                name: "AppUserClaims");

            migrationBuilder.DropTable(
                name: "AppUserLogins");

            migrationBuilder.DropTable(
                name: "AppUserRoles");

            migrationBuilder.DropTable(
                name: "AppUserTokens");

            migrationBuilder.DropTable(
                name: "BookingEntity");

            migrationBuilder.DropTable(
                name: "CarEntityCarEquipmentEntity");

            migrationBuilder.DropTable(
                name: "CarEntityImageEntity");

            migrationBuilder.DropTable(
                name: "DealerEntityServiceEntity");

            migrationBuilder.DropTable(
                name: "ImageEntityModelEntity");

            migrationBuilder.DropTable(
                name: "CarEquipmentEntity");

            migrationBuilder.DropTable(
                name: "CarEntity");

            migrationBuilder.DropTable(
                name: "ServiceEntity");

            migrationBuilder.DropTable(
                name: "ImageEntity");

            migrationBuilder.DropTable(
                name: "DealerEntity");

            migrationBuilder.DropTable(
                name: "ModelEntity");

            migrationBuilder.DropTable(
                name: "TypeEntity");
        }
    }
}
