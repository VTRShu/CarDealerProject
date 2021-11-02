using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.DTO
{
    public class BookWorkshopEntityDTO
    {
        public string Dealer { get; set; }
        public string LicensePlate { get; set; }
        public string Mileage { get; set; }
        public string CarIdentification { get; set; }
        public DateTime Appointment { get; set; }
        public string TimePeriod { get; set; }
        public string Title { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string UserCode { get; set; }
        public string CustomerFeedBack { get; set; }
        public string PhoneNumber { get; set; }
        public int ServiceId { get; set; }
        public string SpecificRequest { get; set; }
    }
}
