using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CarDealerProject.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                    ImagePath = table.Column<string>(type: "varchar(max)", nullable: true),
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
