using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.Services.EmailService
{
    public interface IEmailService
    {
        Task SendEmailAsync( string toEmail, string subject, string content);
    }
}
