using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.DTO
{
    public class BookingEntityDTO
    {   
        public int CarId { get; set; }
        public string Model { get; set; }
        public string Dealer { get; set; }
        public DateTime Appointment { get; set; }
        public string TimePeriod { get; set; }
        public string Title { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string UserCode { get; set; }
        public string FileRecordName { get; set; }
        public string SpecificRequest { get; set; }
        public string StaffAnswer { get; set; }
        public string PhoneNumber { get; set; }
        public string Note { get; set; }
        public int ServiceId { get; set; }
    }
}
