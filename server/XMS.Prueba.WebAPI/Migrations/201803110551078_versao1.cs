namespace XMS.Prueba.WebAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class versao1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Usuario",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Nombre = c.String(maxLength: 8000, unicode: false),
                        Email = c.String(nullable: false, maxLength: 8000, unicode: false),
                        ContrasenaHash = c.String(maxLength: 8000, unicode: false),
                        ContrasenaSalt = c.String(maxLength: 8000, unicode: false),
                        Pais = c.String(maxLength: 8000, unicode: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Usuario");
        }
    }
}
