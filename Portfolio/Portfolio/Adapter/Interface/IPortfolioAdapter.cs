using Portfolio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portfolio.Adapter.Interface
{
    public interface IPortfolioAdapter
    {
        //used for home index and admin index
        HomeIndexViewModels IndexProjectToShow();
        HomeIndexViewModels ProjectToShow();
        HomeIndexViewModels SingleProject(int id);

        // admin section
        HomeIndexViewModels AdminIndexProjectToShow();
        string CreateProject(HomeViewModels model, string userId);
        string EditProject(HomeViewModels model);
        HomeViewModels EditProject(int id);
        string DeleteProject(HomeViewModels model);

        //forum Section
        ForumIndexViewModels AllPostIndex();
        NewSubPostViewModels ForumSinglePost(int id);
        NewSubPostViewModels ForumSinglePost(NewSubPostViewModels model, string userId);
        string DeleteSubPost(int id);
        string DeletePost(int id);
        string CreatePost(PostViewModels model, string userId);
        PostViewModels EditPost(int id, string userId, bool role);
        string EditPost(PostViewModels model);
        string Subscribe(NewSubPostViewModels sub, string userId);
        string UnSubscribe(NewSubPostViewModels sub);
        SubPostViewModels EditSubPost(int id);
        string EditSubPost(SubPostViewModels model);
    }
}
