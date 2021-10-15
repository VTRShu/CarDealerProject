using CarDealerProject.Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.DTO
{
    public class CarEntityDTO
    {  
        public int Id { get; set; }
        public string Name { get; set; }
        public string Price { get; set; }
        public int TypeId { get; set; }
        public int ModelId { get; set; }
        public string Color { get; set; }
        public string FuelType { get; set; }
        public string Power { get; set; }
        public string MaximumSpeed { get; set; }
        public string Length { get; set; }
        public string Width { get; set; }
        public string Torque { get; set; }
        public string Upholstery { get; set; }
        public string Transmission { get; set; }
        public string Acceleration { get; set; }
        public string Weight { get; set; }
        public string Height { get; set; }
        public string Displacement { get; set; }
        public string Date { get; set; }
        public string FuelConsumption { get; set; }
        public bool IsAvailble { get; set; }
        public string Dealer { get; set; }
        public string ImageName1 { get; set; }
        public string ImageName2 { get; set; }
        public string ImageName3 { get; set; }
        public string ImageName4 { get; set; }
        public string ImageName5 { get; set; }
        public string ImageName6 { get; set; }
    }
}
