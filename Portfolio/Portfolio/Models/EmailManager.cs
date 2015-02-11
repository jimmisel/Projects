using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;

namespace Portfolio.Models
{
    public static class EmailManager
    {
        private static readonly string From = "jimsccportfolio@gmail.com";
        public static string To { get; set; }
        public static string Subject { get; set; }
        public static string Body { get; set; }
        private static SmtpClient _client;
        private static readonly string UserName = "jimsccportfolio@gmail.com";
        private static readonly string Password = "iDontKnow";
        private static readonly int Port = 587;
        private static readonly string Host = "smtp.gmail.com";


        static EmailManager()
        {
            _client = new SmtpClient(Host, Port);
            _client.UseDefaultCredentials = false;
            _client.Credentials = new System.Net.NetworkCredential(UserName, Password);
            _client.EnableSsl = true;
        }

        public static bool SendEmail()
        {
            MailMessage mail = new MailMessage(From, To, Subject, Body);

            try
            {

                _client.Send(mail);
                return true;
            }
            catch (Exception ex)
            {

                return false;
            }

        }

        public static bool SendEmailNewAnswer(string email, string userName, string poster)
        {
            Subject = "You have a new answer to your question!";
            Body = "Dear, " + userName;
            Body += ". A new answer was submited to Your question by " + poster;
            Body += ". Please Take a look and see if this helps with any issue you may have.";



            if (email == null)
            {
                email = From;
            }
            MailMessage mail = new MailMessage(From, email, Subject, Body);

            try
            {
                _client.Send(mail);
                return true;
            }
            catch (Exception ex)
            {

                return false;
            }


        }


        public static bool SendEmailNewSubPost(string email, string userName, string poster)
        {
            Subject = "New post on a thread your subscribed to";
            Body = "Dear, " + userName;
            Body += ". A new answer was submited to A post your subscribed to by " + poster;
            Body += ". Please Take a look and see if this helps with any issue you may have.";



            if (email == null)
            {
                email = From;
            }
            MailMessage mail = new MailMessage(From, email, Subject, Body);

            try
            {
                _client.Send(mail);
                return true;
            }
            catch (Exception ex)
            {

                return false;
            }


        }



    }
}