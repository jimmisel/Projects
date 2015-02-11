namespace Portfolio.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class four : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.FrontPages",
                c => new
                    {
                        FrontPageId = c.Int(nullable: false, identity: true),
                        FrontPageBody = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.FrontPageId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.FrontPages");
        }
    }
}
