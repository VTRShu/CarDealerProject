using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.Repositories.Entities
{
    public class BookWorkshopEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; } 
        public DealerEntity Dealer { get; set; }
        [DataType(DataType.Date)]
        public string LicensePlate { get; set; }
        [AllowNull]
        public string Mileage { get; set; }
        [AllowNull]
        public string CarIdentification { get; set; }
        public DateTime Appointment { get; set; }
        public string TimePeriod { get; set; }
        public string Title { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        [AllowNull]
        public AppUser User { get; set; }
        [AllowNull]
        public string CustomerFeedBack { get; set; }
        public ServiceEntity Service { get; set; }
        public bool IsAccepted { get; set; }
        public bool Status { get; set; }
        public List<CustomerEntity> customer { get; set; }
        public string SpecificRequest { get; set; }
    }
}
