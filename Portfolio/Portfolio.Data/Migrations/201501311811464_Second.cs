namespace Portfolio.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Second : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Posts", "PostCount", c => c.Int(nullable: false));
            AddColumn("dbo.Posts", "PostViews", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Posts", "PostViews");
            DropColumn("dbo.Posts", "PostCount");
        }
    }
}
