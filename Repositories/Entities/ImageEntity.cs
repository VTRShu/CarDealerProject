using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.Repositories.Entities
{
    public class ImageEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Column(TypeName = "varchar(max)")]
        public string ImagePath { get; set; }
        [DataType(DataType.Date)]
        public DateTime InsertedOn { get; set; }
        public List<CarEntity> Cars { get; set; }
        public List<ModelEntity> Models { get; set; }
    }
}
