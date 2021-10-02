using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarDealerProject.Repositories.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
namespace CarDealerProject.Repositories.EFContext
{
    public class CarDealerDBContext : DbContext
    {
        public CarDealerDBContext(DbContextOptions options) : base(options) { }
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
        }
    }

}
