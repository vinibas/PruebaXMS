namespace XMS.Prueba.WebAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DataAnnotationParaFluentAPI : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Usuario", "Nombre", c => c.String(maxLength: 100, unicode: false));
            AlterColumn("dbo.Usuario", "Pais", c => c.String(maxLength: 2, unicode: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Usuario", "Pais", c => c.String(maxLength: 8000, unicode: false));
            AlterColumn("dbo.Usuario", "Nombre", c => c.String(maxLength: 8000, unicode: false));
        }
    }
}
