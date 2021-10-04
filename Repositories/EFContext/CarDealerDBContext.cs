﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarDealerProject.Repositories.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
namespace CarDealerProject.Repositories.EFContext
{
    public class CarDealerDBContext : IdentityDbContext<AppUser, AppRole, int>
    {
        public CarDealerDBContext(DbContextOptions options) : base(options) { }
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<AppRole> AppRoles { get; set; }
        public DbSet<CarEntity> CarEntity { get; set; }
        public DbSet<BookingEntity> BookingEntity { get; set; }
        public DbSet<DealerEntity> DealerEntity { get; set; }
        public DbSet<ImageEntity> ImageEntity { get; set; }
        public DbSet<ModelEntity> ModelEntity { get; set; }
        public DbSet<ServiceEntity> ServiceEntity { get; set; }
        public DbSet<TypeEntity> TypeEntity { get; set; }
        public DbSet<CarEquipmentEntity> CarEquipmentEntity { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<IdentityUserClaim<int>>().ToTable("AppUserClaims");
            modelBuilder.Entity<IdentityUserRole<int>>().ToTable("AppUserRoles").HasKey(x => new { x.UserId, x.RoleId });
            modelBuilder.Entity<IdentityUserLogin<int>>().ToTable("AppUserLogins").HasKey(x => x.UserId);
            modelBuilder.Entity<IdentityRoleClaim<int>>().ToTable("AppRoleClaims");
            modelBuilder.Entity<IdentityUserToken<int>>().ToTable("AppUserTokens").HasKey(x => x.UserId);

            modelBuilder.Entity<AppUser>().Property(c => c.IsFirstLogin).HasDefaultValue(true);
            modelBuilder.Entity<AppUser>().Property(c => c.UserName).HasComputedColumnSql("REPLACE( ( ( LOWER ([FirstName]) ) +( LOWER ( [LastNameFirstChar] )  ) ) ,' ','') +CAST( [CountDuplicate] as varchar(200) )");
            modelBuilder.Entity<AppUser>().Property(c => c.NormalizedUserName).HasComputedColumnSql("UPPER([FirstName])+UPPER([LastNameFirstChar])+CAST( [CountDuplicate] as varchar(200) )");
            modelBuilder.Entity<AppUser>().Property(c => c.NormalizedEmail).HasComputedColumnSql("UPPER([Email])");
            modelBuilder.Entity<AppUser>().Property(c => c.Code).HasComputedColumnSql("'MB'+CAST((RIGHT('0000'+CONVERT(varchar(20),[Id]),4)) as varchar(200))");
            modelBuilder.Entity<AppUser>().HasOne(c => c.Dealer);
            modelBuilder.Entity<AppUser>().HasOne(c => c.Image);

            modelBuilder.Entity<CarEntity>().HasMany(c => c.Images);
            modelBuilder.Entity<CarEntity>().HasOne(c => c.Dealer);
            modelBuilder.Entity<CarEntity>().HasOne(c => c.Type);
            modelBuilder.Entity<CarEntity>().HasMany(c => c.Equipments);

            modelBuilder.Entity<BookingEntity>().HasOne(c => c.Model);
            modelBuilder.Entity<BookingEntity>().HasOne(c => c.Dealer);

            modelBuilder.Entity<DealerEntity>().HasMany(c => c.Services);

            modelBuilder.Entity<ServiceEntity>().HasMany(c => c.Dealers);

            modelBuilder.Entity<ImageEntity>().HasMany(c => c.Cars);
            modelBuilder.Entity<ImageEntity>().HasMany(c => c.Models);


            modelBuilder.Entity<ModelEntity>().HasMany(c => c.Images);
            modelBuilder.Entity<CarEquipmentEntity>().HasMany(c => c.Cars);

            modelBuilder.Entity<AppRole>().HasData(
            new AppRole
            {
                Id = 1,
                Name = "Master",
                NormalizedName = "MASTER",
                ConcurrencyStamp = "31BF5413-8303-4E21-8D3A-10099FCA95FE",
                Description = "Head master",
            }, new AppRole
            {
                Id = 2,
                Name = "Admin",
                NormalizedName = "ADMIN",
                ConcurrencyStamp = "94BD65EE-DE64-4476-91AA-6258155DE018",
                Description = "Administrator",
            }, new AppRole
            {
                Id = 3,
                Name = "Staff",
                NormalizedName = "STAFF",
                ConcurrencyStamp = "33BS77SS-DE64-4476-91AA-6258155DE018",
                Description = "Just Staff",
            });
            modelBuilder.Entity<ImageEntity>().HasData(new ImageEntity
            {
                Id = 1,
                ImageName = "Capture.PNG",
                ImageSrc = "https://localhost:5001/Images/Capture.PNG",
                InsertedOn = new DateTime(2021, 10, 05),
            });
            modelBuilder.Entity<DealerEntity>().HasData(new DealerEntity
            {
                Id = 1,
                Name = "Mercedes-Benz Haxaco Lang Ha - PKD",
                Latitude = 21.01420642227430200M,
                Longtitude = 105.81289849755275000M,
                Description = "46 Lang Ha, Thanh Cong, Ba Dinh, Ha Noi 280000, Viet Nam",
                DealerEmail = "aa@gmail.com",
                DealerPhone = "0933162211",
                DealerWebsite = "https://www.langha.haxaco.mercedes-benz.com.vn/",
            });
            modelBuilder.Entity<AppUser>().HasData(new AppUser
            {
                Id = 1,
                Code = "MB001",
                Dealer = null,
                FirstName = "Nghia",
                LastName = "Le Trung",
                Dob = new DateTime(2000, 02, 02),
                Gender = "Male",
                Type = (Role)0,
                LastNameFirstChar = "LT",
                CountDuplicate = "",
                UserName = "nghialt",
                NormalizedUserName = "NGHIALT",
                Email = "aaaa@gmail.com",
                NormalizedEmail = "AAAA@GMAIL.COM",
                IsDisabled = true,
                PasswordHash = "AQAAAAEAACcQAAAAEBq/+hPonu3IIEDQw94Cins2vgQcOYU4S+EOGT9HiCg1BF/HV1EBcfbb34AIP0xS5Q==",
                SecurityStamp = "VR77OGQ2ABQ5VRWTTDEMHBLJEKS57OYD",
                ConcurrencyStamp = "f99461ee-4644-4148-8874-b4ab37562be3",
                Image = null,
            },
            new AppUser
            {
                Id = 2,
                Code = "MB002",
                Dealer = null,
                FirstName = "Dai",
                LastName = "Pham Ngoc",
                Dob = new DateTime(2000, 02, 02),
                Gender = "Male",
                Type = (Role)1,
                LastNameFirstChar = "pn",
                CountDuplicate = "",
                UserName = "daipn",
                Email = "bbbb@gmail.com",
                NormalizedUserName = "DAIPN",
                NormalizedEmail = "BBBB@GMAIL.COM",
                IsDisabled = true,
                PasswordHash = "AQAAAAEAACcQAAAAEBq/+hPonu3IIEDQw94Cins2vgQcOYU4S+EOGT9HiCg1BF/HV1EBcfbb34AIP0xS5Q==",
                SecurityStamp = "VR77OGQ2ABQ5VRWTTDEMHBLJEKS57OYD",
                ConcurrencyStamp = "f99461ee-4644-4148-8874-b4ab37562be3",
                Image = null,
            });
            modelBuilder.Entity<IdentityUserRole<int>>().HasData(
                new IdentityUserRole<int>
                {
                    UserId = 1,
                    RoleId = 1,
                },
                new IdentityUserRole<int> 
                { 
                    UserId = 2,
                    RoleId = 2,
                });
        }
    } 

}
