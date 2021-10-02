using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.DTO.Request
{
    public class PagingResult<T> : PagingRequest
    {
        public List<T> Items { get; set; }
    }
}
