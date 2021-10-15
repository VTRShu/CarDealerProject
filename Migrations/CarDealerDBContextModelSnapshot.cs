﻿// <auto-generated />
using System;
using CarDealerProject.Repositories.EFContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CarDealerProject.Migrations
{
    [DbContext(typeof(CarDealerDBContext))]
    partial class CarDealerDBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.10")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("BookingEntityCustomerEntity", b =>
                {
                    b.Property<int>("bookingsId")
                        .HasColumnType("int");

                    b.Property<int>("customersId")
                        .HasColumnType("int");

                    b.HasKey("bookingsId", "customersId");

                    b.HasIndex("customersId");

                    b.ToTable("BookingEntityCustomerEntity");
                });

            modelBuilder.Entity("CarDealerProject.Repositories.Entities.AppRole", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ConcurrencyStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NormalizedName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("AppRole");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            ConcurrencyStamp = "31BF5413-8303-4E21-8D3A-10099FCA95FE",
                            Description = "Head master",
                            Name = "Master",
                            NormalizedName = "MASTER"
                        },
                        new
                        {
                            Id = 2,
                            ConcurrencyStamp = "94BD65EE-DE64-4476-91AA-6258155DE018",
                            Description = "Administrator",
                            Name = "Admin",
                            NormalizedName = "ADMIN"
                        },
                        new
                        {
                            Id = 3,
                            ConcurrencyStamp = "33BS77SS-DE64-4476-91AA-6258155DE018",
                            Description = "Just Staff",
                            Name = "Staff",
                            NormalizedName = "STAFF"
                        });
                });

            modelBuilder.Entity("CarDealerProject.Repositories.Entities.AppUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("Code")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("nvarchar(max)")
                        .HasComputedColumnSql("'MB'+CAST((RIGHT('0000'+CONVERT(varchar(20),[Id]),4)) as varchar(200))");

                    b.Property<string>("ConcurrencyStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CountDuplicate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("DealerId")
                        .HasColumnType("int");

                    b.Property<string>("DealerName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Dob")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Gender")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ImageId")
                        .HasColumnType("int");

                    b.Property<bool>("IsDisabled")
                        .HasColumnType("bit");

                    b.Property<bool>("IsFirstLogin")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValue(true);

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastNameFirstChar")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("nvarchar(max)")
                        .HasComputedColumnSql("UPPER([Email])");

                    b.Property<string>("NormalizedUserName")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("nvarchar(max)")
                        .HasComputedColumnSql("UPPER([FirstName])+UPPER([LastNameFirstChar])+CAST( [CountDuplicate] as varchar(200) )");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("Profile")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.Property<string>("UserName")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("nvarchar(max)")
                        .HasComputedColumnSql("REPLACE( ( ( LOWER ([FirstName]) ) +( LOWER ( [LastNameFirstChar] )  ) ) ,' ','') +CAST( [CountDuplicate] as varchar(200) )");

                    b.HasKey("Id");

                    b.HasIndex("DealerId");

                    b.HasIndex("ImageId");

                    b.ToTable("AppUser");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            AccessFailedCount = 0,
                            Code = "MB001",
                            ConcurrencyStamp = "f99461ee-4644-4148-8874-b4ab37562be3",
                            CountDuplicate = "",
                            DealerName = "Mercedes-Benz Haxaco Lang Ha - PKD",
                            Dob = new DateTime(2000, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "aaaa@gmail.com",
                            EmailConfirmed = false,
                            FirstName = "Nghia",
                            Gender = "Male",
                            IsDisabled = true,
                            IsFirstLogin = false,
                            LastName = "Le Trung",
                            LastNameFirstChar = "LT",
                            LockoutEnabled = false,
                            NormalizedEmail = "AAAA@GMAIL.COM",
                            NormalizedUserName = "NGHIALT",
                            PasswordHash = "AQAAAAEAACcQAAAAEBq/+hPonu3IIEDQw94Cins2vgQcOYU4S+EOGT9HiCg1BF/HV1EBcfbb34AIP0xS5Q==",
                            PhoneNumberConfirmed = false,
                            Profile = "https://localhost:5001/Images/Capture.PNG",
                            SecurityStamp = "VR77OGQ2ABQ5VRWTTDEMHBLJEKS57OYD",
                            TwoFactorEnabled = false,
                            Type = 0,
                            UserName = "nghialt"
                        },
                        new
                        {
                            Id = 2,
                            AccessFailedCount = 0,
                            Code = "MB002",
                            ConcurrencyStamp = "f99461ee-4644-4148-8874-b4ab37562be3",
                            CountDuplicate = "",
                            DealerName = "Mercedes-Benz Haxaco Lang Ha - PKD",
                            Dob = new DateTime(2000, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "bbbb@gmail.com",
                            EmailConfirmed = false,
                            FirstName = "Dai",
                            Gender = "Male",
                            IsDisabled = true,
                            IsFirstLogin = false,
                            LastName = "Pham Ngoc",
                            LastNameFirstChar = "pn",
                            LockoutEnabled = false,
                            NormalizedEmail = "BBBB@GMAIL.COM",
                            NormalizedUserName = "DAIPN",
                            PasswordHash = "AQAAAAEAACcQAAAAEBq/+hPonu3IIEDQw94Cins2vgQcOYU4S+EOGT9HiCg1BF/HV1EBcfbb34AIP0xS5Q==",
                            PhoneNumberConfirmed = false,
                            Profile = "https://localhost:5001/Images/35418253_636770120013959_511352286501404672_n.jpg",
                            SecurityStamp = "VR77OGQ2ABQ5VRWTTDEMHBLJEKS57OYD",
                            TwoFactorEnabled = false,
                            Type = 1,
                            UserName = "daipn"
                        });
                });

            modelBuilder.Entity("CarDealerProject.Repositories.Entities.BookingEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Appointment")
                        .HasColumnType("datetime2");

                    b.Property<int?>("DealerId")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsAccepted")
                        .HasColumnType("bit");

                    b.Property<int?>("ModelId")
                        .HasColumnType("int");

                    b.Property<string>("Note")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ServiceId")
                        .HasColumnType("int");

                    b.Property<string>("TimePeriod")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("DealerId");

                    b.HasIndex("ModelId");

                    b.HasIndex("ServiceId");

                    b.ToTable("BookingEntity");
                });

            modelBuilder.Entity("CarDealerProject.Repositories.Entities.CarEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Acceleration")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Color")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Date")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("DealerId")
                        .HasColumnType("int");

                    b.Property<string>("Displacement")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FuelConsumption")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FuelType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Height")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsAvailable")
                        .HasColumnType("bit");

                    b.Property<string>("Length")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MaximumSpeed")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ModelId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Power")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Price")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Torque")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Transmission")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("TypeId")
                        .HasColumnType("int");

                    b.Property<string>("Upholstery")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Weight")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Width")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("DealerId");

                    b.HasIndex("ModelId");

                    b.HasIndex("TypeId");

                    b.ToTable("CarEntity");
                });

            modelBuilder.Entity("CarDealerProject.Repositories.Entities.CarEquipmentEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("CarEquipmentEntity");
                });

            modelBuilder.Entity("CarDealerProject.Repositories.Entities.CustomerEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("CustomerEntity");
                });

            modelBuilder.Entity("CarDealerProject.Repositories.Entities.DealerEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("DealerEmail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DealerPhone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DealerWebsite")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("Latitude")
                        .HasColumnType("decimal(20,17)");

                    b.Property<decimal>("Longtitude")
                        .HasColumnType("decimal(20,17)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("DealerEntity");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            DealerEmail = "aa@gmail.com",
                            DealerPhone = "0933162211",
                            DealerWebsite = "https://www.langha.haxaco.mercedes-benz.com.vn/",
                            Description = "46 Lang Ha, Thanh Cong, Ba Dinh, Ha Noi 280000, Viet Nam",
                            Latitude = 21.01420642227430200m,
                            Longtitude = 105.81289849755275000m,
                            Name = "Mercedes-Benz Haxaco Lang Ha - PKD"
                        });
                });

            modelBuilder.Entity("CarDealerProject.Repositories.Entities.ImageEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ImageName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageSrc")
                        .HasColumnType("varchar(max)");

                    b.Property<DateTime>("InsertedOn")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("ImageEntity");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            ImageName = "Capture.PNG",
                            ImageSrc = "https://localhost:5001/Images/Capture.PNG",
                            InsertedOn = new DateTime(2021, 10, 5, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            Id = 2,
                            ImageName = "35418253_636770120013959_511352286501404672_n.jpg",
                            ImageSrc = "https://localhost:5001/Images/35418253_636770120013959_511352286501404672_n.jpg",
                            InsertedOn = new DateTime(2021, 10, 5, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        });
                });

            modelBuilder.Entity("CarDealerProject.Repositories.Entities.ModelEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("StartPrice")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("TypeId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TypeId");

                    b.ToTable("ModelEntity");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Description = "x",
                            Name = "S-Class",
                            StartPrice = "4299000000"
                        });
                });

            modelBuilder.Entity("CarDealerProject.Repositories.Entities.ServiceEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("ServiceEntity");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Description = "x",
                            Name = "Test Drive"
                        });
                });

            modelBuilder.Entity("CarDealerProject.Repositories.Entities.TypeEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("TypeEntity");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Description = "A sedan or saloon is a passenger car in a three-box configuration with separate compartments for engine, passenger, and cargo",
                            Name = "Sedan"
                        },
                        new
                        {
                            Id = 2,
                            Description = "A sport utility vehicle or SUV is a car classification that combines elements of road-going passenger cars with features from off-road vehicles, such as raised ground clearance and four-wheel drive.",
                            Name = "SUV"
                        },
                        new
                        {
                            Id = 3,
                            Description = "A coupe or coupé is a passenger car with a sloping or truncated rear roofline and two doors",
                            Name = "Coupe"
                        },
                        new
                        {
                            Id = 4,
                            Description = "MPV stands for Multi-Purpose Vehicle. They have tall, box-like bodies designed to create as much interior space as possible and often have more seats than a comparable hatchback or saloon.",
                            Name = "Van/MPV"
                        });
                });

            modelBuilder.Entity("CarEntityCarEquipmentEntity", b =>
                {
                    b.Property<int>("CarsId")
                        .HasColumnType("int");

                    b.Property<int>("EquipmentsId")
                        .HasColumnType("int");

                    b.HasKey("CarsId", "EquipmentsId");

                    b.HasIndex("EquipmentsId");

                    b.ToTable("CarEntityCarEquipmentEntity");
                });

            modelBuilder.Entity("CarEntityImageEntity", b =>
                {
                    b.Property<int>("CarsId")
                        .HasColumnType("int");

                    b.Property<int>("ImagesId")
                        .HasColumnType("int");

                    b.HasKey("CarsId", "ImagesId");

                    b.HasIndex("ImagesId");

                    b.ToTable("CarEntityImageEntity");
                });

            modelBuilder.Entity("DealerEntityServiceEntity", b =>
                {
                    b.Property<int>("DealersId")
                        .HasColumnType("int");

                    b.Property<int>("ServicesId")
                        .HasColumnType("int");

                    b.HasKey("DealersId", "ServicesId");

                    b.HasIndex("ServicesId");

                    b.ToTable("DealerEntityServiceEntity");
                });

            modelBuilder.Entity("ImageEntityModelEntity", b =>
                {
                    b.Property<int>("ImagesId")
                        .HasColumnType("int");

                    b.Property<int>("ModelsId")
                        .HasColumnType("int");

                    b.HasKey("ImagesId", "ModelsId");

                    b.HasIndex("ModelsId");

                    b.ToTable("ImageEntityModelEntity");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("AppRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("AppUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("AppUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<int>", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.HasKey("UserId", "RoleId");

                    b.ToTable("AppUserRoles");

                    b.HasData(
                        new
                        {
                            UserId = 1,
                            RoleId = 1
                        },
                        new
                        {
                            UserId = 2,
                            RoleId = 2
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("AppUserTokens");
                });

            modelBuilder.Entity("BookingEntityCustomerEntity", b =>
                {
                    b.HasOne("CarDealerProject.Repositories.Entities.BookingEntity", null)
                        .WithMany()
                        .HasForeignKey("bookingsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CarDealerProject.Repositories.Entities.CustomerEntity", null)
                        .WithMany()
                        .HasForeignKey("customersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("CarDealerProject.Repositories.Entities.AppUser", b =>
                {
                    b.HasOne("CarDealerProject.Repositories.Entities.DealerEntity", "Dealer")
                        .WithMany()
                        .HasForeignKey("DealerId");

                    b.HasOne("CarDealerProject.Repositories.Entities.ImageEntity", "Image")
                        .WithMany()
                        .HasForeignKey("ImageId");

                    b.Navigation("Dealer");

                    b.Navigation("Image");
                });

            modelBuilder.Entity("CarDealerProject.Repositories.Entities.BookingEntity", b =>
                {
                    b.HasOne("CarDealerProject.Repositories.Entities.DealerEntity", "Dealer")
                        .WithMany()
                        .HasForeignKey("DealerId");

                    b.HasOne("CarDealerProject.Repositories.Entities.ModelEntity", "Model")
                        .WithMany()
                        .HasForeignKey("ModelId");

                    b.HasOne("CarDealerProject.Repositories.Entities.ServiceEntity", "Service")
                        .WithMany()
                        .HasForeignKey("ServiceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Dealer");

                    b.Navigation("Model");

                    b.Navigation("Service");
                });

            modelBuilder.Entity("CarDealerProject.Repositories.Entities.CarEntity", b =>
                {
                    b.HasOne("CarDealerProject.Repositories.Entities.DealerEntity", "Dealer")
                        .WithMany()
                        .HasForeignKey("DealerId");

                    b.HasOne("CarDealerProject.Repositories.Entities.ModelEntity", "Model")
                        .WithMany()
                        .HasForeignKey("ModelId");

                    b.HasOne("CarDealerProject.Repositories.Entities.TypeEntity", "Type")
                        .WithMany()
                        .HasForeignKey("TypeId");

                    b.Navigation("Dealer");

                    b.Navigation("Model");

                    b.Navigation("Type");
                });

            modelBuilder.Entity("CarDealerProject.Repositories.Entities.ModelEntity", b =>
                {
                    b.HasOne("CarDealerProject.Repositories.Entities.TypeEntity", "Type")
                        .WithMany()
                        .HasForeignKey("TypeId");

                    b.Navigation("Type");
                });

            modelBuilder.Entity("CarEntityCarEquipmentEntity", b =>
                {
                    b.HasOne("CarDealerProject.Repositories.Entities.CarEntity", null)
                        .WithMany()
                        .HasForeignKey("CarsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CarDealerProject.Repositories.Entities.CarEquipmentEntity", null)
                        .WithMany()
                        .HasForeignKey("EquipmentsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("CarEntityImageEntity", b =>
                {
                    b.HasOne("CarDealerProject.Repositories.Entities.CarEntity", null)
                        .WithMany()
                        .HasForeignKey("CarsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CarDealerProject.Repositories.Entities.ImageEntity", null)
                        .WithMany()
                        .HasForeignKey("ImagesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("DealerEntityServiceEntity", b =>
                {
                    b.HasOne("CarDealerProject.Repositories.Entities.DealerEntity", null)
                        .WithMany()
                        .HasForeignKey("DealersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CarDealerProject.Repositories.Entities.ServiceEntity", null)
                        .WithMany()
                        .HasForeignKey("ServicesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ImageEntityModelEntity", b =>
                {
                    b.HasOne("CarDealerProject.Repositories.Entities.ImageEntity", null)
                        .WithMany()
                        .HasForeignKey("ImagesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CarDealerProject.Repositories.Entities.ModelEntity", null)
                        .WithMany()
                        .HasForeignKey("ModelsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
