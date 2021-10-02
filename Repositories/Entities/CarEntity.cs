using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.Repositories.Entities
{
    public class CarEntity
    {   
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Price { get; set; }
        public string Date { get; set; }
        public TypeEntity Type { get; set; }
        public ModelEntity Model { get; set; }
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
        public List<ImageEntity> Images { get; set; }
        public List<CarEquipmentEntity> Equipments { get; set; }
        public DealerEntity Dealer { get; set; }
        public bool IsAvailble { get; set; }
    }
}
