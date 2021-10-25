﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.DTO
{
    public class DealerEntityDTO
    {  
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longtitude { get; set; }
        public string DealerEmail { get; set; }
        public string DealerPhone { get; set; }
        public string DealerWebsite { get; set; }
        public string Description { get; set; }
        public int ServiceId1 { get; set; }
        public int ServiceId2 { get; set; }
        public int ServiceId3 { get; set; }

    }
}
