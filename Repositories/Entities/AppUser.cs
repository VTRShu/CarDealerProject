using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using CarDealerProject.Repositories.Entities;
using Microsoft.AspNetCore.Identity;

namespace CarDealerProject.Repositories.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public string Code { get; set; }
        public string DealerName { get; set; }
        [AllowNull]
        public DealerEntity Dealer { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [DataType(DataType.Date)]
        public DateTime Dob { get; set; }
        public string Gender { get; set; }
        public Role Type { get; set; }
        public bool IsDisabled { get; set; }
        public string CountDuplicate { get; set; }
        public string LastNameFirstChar { get; set; }
        public bool IsFirstLogin { get; set; }
        public ImageEntity Image { get; set; }
        public string Profile { get; set; }
        public List<BookingEntity> SolvedBooking {get;set;}
        public List<BookWorkshopEntity> SolvedBookWS { get; set; }

  }
}