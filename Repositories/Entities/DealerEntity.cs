using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.Repositories.Entities
{
    public class DealerEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        [Column(TypeName = "decimal(20,17)")]
        public decimal Latitude { get; set; }
        [Column(TypeName = "decimal(20,17)")]
        public decimal Longtitude { get; set; }
        public string Description { get; set; }
        public string DealerEmail { get; set; }
        public string DealerPhone { get; set; }
        public string DealerWebsite { get; set; }
        public List<ServiceEntity> Services { get; set; }
    }
}
