using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.Repositories.Entities
{
    public class BookingEntity
    {   
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [ForeignKey("ModelId")]
        public ModelEntity Model { get; set; }
        [ForeignKey("DealerId")]
        public DealerEntity Dealer { get; set; }
        public DateTime Appointment { get; set; }
        public string TimePeriod { get; set; }
        public string Title { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        [ForeignKey("ServiceId")]
        public int ServiceId { get; set; }
        public ServiceEntity Service { get; set; }
        public bool IsAccepted { get; set; }
        public List<CustomerEntity> customers { get; set; }
        public string Note { get; set; }
        public DateTime SendEmailDate { get; set; }
    }
}
