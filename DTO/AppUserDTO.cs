using CarDealerProject.Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.DTO
{
    public class AppUserDTO
    {
        public string Code { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Dob { get; set; }
        public string DealerName { get; set; }
        public string Gender { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public Role Type { get; set; }
        public bool IsDisabled { get; set; }
        public string Password { get; set; }
        public string ImageName { get; set; }
    }
}
