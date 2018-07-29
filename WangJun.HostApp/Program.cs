using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.DB;
using WangJun.Entity;
using WangJun.Yun;

namespace WangJun.HostApp
{
    class Program
    { 
        static void Main(string[] args)
        {
            MySqlConnection mycon = new MySqlConnection("Data Source=106.12.24.68;Database=WangJun;User ID=dba;Password=111qqq!!!");
            mycon.Open();
            var cmd = mycon.CreateCommand();
            cmd.CommandText = "INSERT INTO T1(V1) values ('1')";
            cmd.ExecuteNonQuery();
            mycon.Close();

            var inst = EntityDbContext<YunTask>.CreateInstance("Data Source=106.12.24.68;Database=WangJun;User ID=dba;Password=111qqq!!!", DBType.MySQL);
            inst.Save(new YunTask { Title = "Test" });

        }
 
    }
}
