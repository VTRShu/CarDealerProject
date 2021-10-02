using CarDealerProject.DTO;
using CarDealerProject.Repositories.EFContext;
using CarDealerProject.Repositories.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        public IHostingEnvironment _hostingEnvironment;
        public CarDealerDBContext _carDealerDBContext;
        public ImageController(IHostingEnvironment hostingEnvironment, CarDealerDBContext carDealerDBContext)
        {
            _hostingEnvironment = hostingEnvironment;
            _carDealerDBContext = carDealerDBContext;
        }
        [HttpPost]
        public ActionResult<string> UploadImage()
        {
            try
            {
                var files = HttpContext.Request.Form.Files;
                if (files != null && files.Count > 0)
                {
                    foreach (var file in files)
                    {
                        FileInfo fi = new FileInfo(file.FileName);
                        var path = Path.Combine("", _hostingEnvironment.ContentRootPath + "\\Images\\" + fi.Name);
                        using (var stream = new FileStream(path, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }
                        ImageEntity image = new ImageEntity();
                        image.ImagePath = path;
                        image.InsertedOn = DateTime.Now;
                        _carDealerDBContext.ImageEntity.Add(image);
                        _carDealerDBContext.SaveChanges();
                    }
                    return "Saved image succesfully";
                }
                else
                {
                    return "Select Files";
                }
            }
            catch (Exception)
            {
                return "Can't save file";
            }
        }

    }
}
