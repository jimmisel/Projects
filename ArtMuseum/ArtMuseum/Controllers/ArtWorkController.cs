using ArtMuseum.Adapters;
using ArtMuseum.Data;
using ArtMuseum.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.Identity;

namespace ArtMuseum.Controllers
{
    
    public class ArtWorkController : ApiController
    {
        private IArtWork _adapter;

        public ArtWorkController()
        {
            _adapter = new ArtWorkDataAdapter();
        }

        public IHttpActionResult Get()
        {
            //get all artist when the page loads to display to the screen. artist is just a role that a user is set to so need to filter them on the get.
            List<ArtistViewModel> model = _adapter.GetArtist();
               
          
            return Ok(model);
        }
        public IHttpActionResult Get(int id)
        {
            //get the artwork from the artist 
            // need the int id for the artwork from the artist
            ArtViewModel model = new ArtViewModel();
            model = _adapter.GetOneArtWork(id);

            return Ok(model);
        }
        public IHttpActionResult Get(string id)
        {
          //get list of art made by that artist 

            IndexViewModel model = new IndexViewModel();
            model.ArtWork = _adapter.GetArtWorks(id);


            return Ok(model);
        }

        public IHttpActionResult Post(ArtViewModel model)
        {
            //post new artwork
            _adapter.AddArt(model);

            return Ok();
        }


        public IHttpActionResult Put()
        {
            //update the artwork by admin or that one artist that made it
            return Ok();
        }


    }
}
