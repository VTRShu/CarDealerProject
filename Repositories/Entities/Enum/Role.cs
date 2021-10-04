using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarDealerProject.Repositories.Entities
{
    public enum Role
    { 
      Master,
      Admin,
      Staff
    }
}