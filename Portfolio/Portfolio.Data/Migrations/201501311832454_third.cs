namespace Portfolio.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class third : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Posts", "PostCount");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Posts", "PostCount", c => c.Int(nullable: false));
        }
    }
}
